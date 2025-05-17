
/*

'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/app/component/Header/page';
import Footer from '@/app/component/Footer/page.jsx';

import {
  FaDumbbell,
  FaAppleAlt,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaArrowUp,
} from 'react-icons/fa';

const FitnessPlanPage = () => {
  const { userId } = useParams();
  const [planData, setPlanData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  const [showPreferences, setShowPreferences] = useState(true);
  const [showWorkout, setShowWorkout] = useState(true);
  const [showMeal, setShowMeal] = useState(true);
  const [showTips, setShowTips] = useState(true);

  const preferencesRef = useRef(null);
  const workoutRef = useRef(null);
  const mealRef = useRef(null);
  const tipsRef = useRef(null);
  const [activeSection, setActiveSection] = useState('preferences');

  useEffect(() => {
    if (!userId) return;
    const fetchPlan = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch plan data');

        const json = await res.json();
        if (!json.success || !json.data) throw new Error('No plan data found.');

        let aiResponseParsed = {};
        try {
          aiResponseParsed = JSON.parse(json.data.aiResponse);
        } catch {
          console.warn('Failed to parse aiResponse JSON');
        }

        setPlanData({
          ...json.data,
          workoutPlan: Array.isArray(aiResponseParsed['Workout Plan']) ? aiResponseParsed['Workout Plan'] : [],
          mealPlan: Array.isArray(aiResponseParsed['Meal Plan']) ? aiResponseParsed['Meal Plan'] : [],
          additionalTips: Array.isArray(aiResponseParsed['Additional Tips']) ? aiResponseParsed['Additional Tips'] : [],
        });
      } catch (err) {
        setError(err);
        setPlanData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlan();
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowTopButton(scrollY > 300);

      const sections = [
        { id: 'preferences', ref: preferencesRef },
        { id: 'workout', ref: workoutRef },
        { id: 'meal', ref: mealRef },
        { id: 'tips', ref: tipsRef },
      ];

      const offsets = sections.map(({ id, ref }) => ({
        id,
        offsetTop: ref.current ? ref.current.offsetTop : Number.MAX_SAFE_INTEGER,
      }));

      const currentSection = offsets
        .filter(({ offsetTop }) => offsetTop <= scrollY + window.innerHeight / 3)
        .sort((a, b) => b.offsetTop - a.offsetTop)[0];

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-100 to-slate-100">
      <p className="text-2xl font-bold text-sky-800 animate-pulse">Loading your fitness plan...</p>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <p className="text-xl font-semibold text-red-700 bg-red-100 px-6 py-3 rounded shadow max-w-lg text-center">
        Error: {error.message}
      </p>
    </div>;
  }

  if (!planData) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <p className="text-lg font-medium text-gray-600 text-center">Fitness plan not found.</p>
    </div>;
  }

  const Section = ({ id, refObj, icon, title, children, show, toggle }) => (
    <section
      id={id}
      ref={refObj}
      className="mb-10 p-6 md:p-8 rounded-xl bg-white shadow-md border border-slate-200"
    >
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-left text-2xl md:text-3xl font-bold text-slate-800 mb-4 select-none sticky top-16 bg-white z-30 border-b border-slate-200 px-4 py-2"
        aria-expanded={show}
        aria-controls={`${id}-content`}
      >
        <span className="flex items-center gap-3"><span className="text-sky-600">{icon}</span> {title}</span>
        <span className="text-sky-600">{show ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      <div
        id={`${id}-content`}
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${show ? 'max-h-[4000px]' : 'max-h-0'}`}
        aria-hidden={!show}
      >
        {children}
      </div>
    </section>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      <Header />

      <nav className="hidden lg:flex flex-col fixed left-0 top-24 h-[calc(100vh-6rem)] w-64 space-y-5 bg-white border-r border-sky-200 px-6 py-4 overflow-y-auto shadow-md z-50">
        {['preferences', 'workout', 'meal'].map(id => (
          <a
            key={id}
            href={`#${id}`}
            className={`transition-colors rounded-lg px-3 py-2 ${activeSection === id ? 'bg-sky-200 text-sky-800' : 'hover:bg-sky-100'
              }`}
          >
            {id[0].toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')}
          </a>
        ))}
        {planData.additionalTips.length > 0 && (
          <a
            href="#tips"
            className={`transition-colors rounded-lg px-3 py-2 ${activeSection === 'tips' ? 'bg-sky-200 text-sky-800' : 'hover:bg-sky-100'
              }`}
          >
            Additional Tips
          </a>
        )}
      </nav>

      <main className="flex-grow ml-0 lg:ml-72 px-4 md:px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 border-b border-sky-200 pb-4">
          Your Personalized Fitness Plan
        </h1>

        <Section
          id="preferences"
          refObj={preferencesRef}
          icon={<FaAppleAlt />}
          title="Preferences"
          show={showPreferences}
          toggle={() => setShowPreferences(!showPreferences)}
        >
          <ul className="grid sm:grid-cols-2 gap-6 text-slate-700 text-lg">
            <li><strong>Gender:</strong> {planData.gender}</li>
            <li><strong>Goal:</strong> {planData.fitnessGoal}</li>
            <li><strong>Activity Level:</strong> {planData.activityLevel}</li>
            <li><strong>Dietary Preference:</strong> {planData.dietaryPreference}</li>
            <li><strong>Meal Plan Type:</strong> {planData.mealPlanType}</li>
          </ul>
        </Section>

        <Section
          id="workout"
          refObj={workoutRef}
          icon={<FaDumbbell />}
          title="Workout Plan"
          show={showWorkout}
          toggle={() => setShowWorkout(!showWorkout)}
        >
          {planData.workoutPlan.length === 0 ? <p className="text-slate-600 italic">No workout plan available.</p> : (
            planData.workoutPlan.map((day, i) => (
              <div key={i} className="mb-10 p-5 bg-sky-50 rounded-xl border-l-4 border-sky-500">
                <h3 className="text-2xl font-semibold text-sky-900 mb-3">{day.Day} — {day.Focus}</h3>
                <ul className="space-y-3">
                  {day.Exercises?.map((ex, idx) => (
                    <li key={idx} className="bg-white rounded p-4 shadow text-slate-800">
                      <p className="font-bold">{ex.Name}</p>
                      {ex.Sets && <p>Sets: <strong>{ex.Sets}</strong>, Reps: <strong>{ex.Reps}</strong>{ex.PerLeg ? ' (per leg)' : ''}</p>}
                      {ex.Duration && <p>Duration: <strong>{ex.Duration}</strong></p>}
                      {ex.Description && <p className="text-sm italic text-slate-600 mt-1">{ex.Description}</p>}
                    </li>
                  ))}
                </ul>
                {day.Notes && <p className="mt-4 italic text-slate-600 font-medium">{day.Notes}</p>}
              </div>
            ))
          )}
        </Section>

        <Section
          id="meal"
          refObj={mealRef}
          icon={<FaAppleAlt />}
          title="Meal Plan"
          show={showMeal}
          toggle={() => setShowMeal(!showMeal)}
        >
          {planData.mealPlan.length === 0 ? <p className="text-slate-600 italic">No meal plan available.</p> : (
            planData.mealPlan.map((meal, i) => (
              <div key={i} className="mb-10 p-5 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                <h3 className="text-2xl font-semibold text-emerald-900 mb-2">{meal.Meal}</h3>
                <p className="text-lg text-emerald-800 font-medium">{meal.Description}</p>
                {meal.Recipes?.length > 0 && (
                  <ul className="mt-3 list-disc list-inside text-emerald-700">
                    {meal.Recipes.map((r, idx) => <li key={idx}>{r}</li>)}
                  </ul>
                )}
                {meal.Notes && <p className="mt-3 italic text-emerald-700 font-medium">{meal.Notes}</p>}
              </div>
            ))
          )}
        </Section>

        {planData.additionalTips.length > 0 && (
          <Section
            id="tips"
            refObj={tipsRef}
            icon={<FaLightbulb />}
            title="Additional Tips"
            show={showTips}
            toggle={() => setShowTips(!showTips)}
          >
            <ul className="list-disc list-inside text-yellow-700 space-y-2">
              {planData.additionalTips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </Section>
        )}
      </main>

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg"
          aria-label="Back to Top"
        >
          <FaArrowUp size={24} />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default FitnessPlanPage;




*/


'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/app/component/Header/page';
import Footer from '@/app/component/Footer/page.jsx';

import {
  FaDumbbell,
  FaAppleAlt,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaArrowUp,
} from 'react-icons/fa';

const FitnessPlanPage = () => {
  const { userId } = useParams();
  const [planData, setPlanData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);

  const [showPreferences, setShowPreferences] = useState(true);
  const [showWorkout, setShowWorkout] = useState(true);
  const [showMeal, setShowMeal] = useState(true);
  const [showTips, setShowTips] = useState(true);

  const preferencesRef = useRef(null);
  const workoutRef = useRef(null);
  const mealRef = useRef(null);
  const tipsRef = useRef(null);
  const [activeSection, setActiveSection] = useState('preferences');

  useEffect(() => {
    if (!userId) return;
    const fetchPlan = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch plan data');

        const json = await res.json();
        if (!json.success || !json.data) throw new Error('No plan data found.');

        let aiResponseParsed = {};
        try {
          aiResponseParsed = JSON.parse(json.data.aiResponse);
        } catch {
          console.warn('Failed to parse aiResponse JSON');
        }

        setPlanData({
          ...json.data,
          workoutPlan: Array.isArray(aiResponseParsed['Workout Plan']) ? aiResponseParsed['Workout Plan'] : [],
          mealPlan: Array.isArray(aiResponseParsed['Meal Plan']) ? aiResponseParsed['Meal Plan'] : [],
          additionalTips: Array.isArray(aiResponseParsed['Additional Tips']) ? aiResponseParsed['Additional Tips'] : [],
        });
      } catch (err) {
        setError(err);
        setPlanData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlan();
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowTopButton(scrollY > 300);

      const sections = [
        { id: 'preferences', ref: preferencesRef },
        { id: 'workout', ref: workoutRef },
        { id: 'meal', ref: mealRef },
        { id: 'tips', ref: tipsRef },
      ];

      const offsets = sections.map(({ id, ref }) => ({
        id,
        offsetTop: ref.current ? ref.current.offsetTop : Number.MAX_SAFE_INTEGER,
      }));

      const currentSection = offsets
        .filter(({ offsetTop }) => offsetTop <= scrollY + window.innerHeight / 3)
        .sort((a, b) => b.offsetTop - a.offsetTop)[0];

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-100 to-slate-100">
        <p className="text-2xl font-bold text-sky-800 animate-pulse">Loading your fitness plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
        <p className="text-xl font-semibold text-red-700 bg-red-100 px-6 py-3 rounded shadow max-w-lg text-center">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <p className="text-lg font-medium text-gray-600 text-center">Fitness plan not found.</p>
      </div>
    );
  }

  const Section = ({ id, refObj, icon, title, children, show, toggle }) => (
    <section
      id={id}
      ref={refObj}
      className="mb-10 p-6 md:p-8 rounded-xl bg-white shadow-md border border-slate-200"
    >
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-left text-2xl md:text-3xl font-bold text-slate-800 mb-4 select-none sticky top-16 bg-white z-30 border-b border-slate-200 px-4 py-2"
        aria-expanded={show}
        aria-controls={`${id}-content`}
      >
        <span className="flex items-center gap-3">
          <span className="text-sky-600">{icon}</span> {title}
        </span>
        <span className="text-sky-600">{show ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      <div
        id={`${id}-content`}
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          show ? 'max-h-[4000px]' : 'max-h-0'
        }`}
        aria-hidden={!show}
      >
        {children}
      </div>
    </section>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      <Header />

      <nav
        className="
          hidden lg:flex
          flex-col
          fixed
          left-0
          top-24
          w-64
          max-h-[calc(100vh-6rem)]
          bg-white
          border-r border-slate-200
          px-6 py-6
          space-y-4
          overflow-y-auto
          shadow-sm
          z-40
        "
      >
        <h2 className="text-xl font-bold text-sky-800 mb-4 border-b pb-2">Navigation</h2>
        {['preferences', 'workout', 'meal'].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`transition-colors rounded-lg px-3 py-2 ${
              activeSection === id ? 'bg-sky-200 text-sky-800' : 'hover:bg-sky-100'
            }`}
          >
            {id[0].toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')}
          </a>
        ))}
        {planData.additionalTips.length > 0 && (
          <a
            href="#tips"
            className={`transition-colors rounded-lg px-3 py-2 ${
              activeSection === 'tips' ? 'bg-sky-200 text-sky-800' : 'hover:bg-sky-100'
            }`}
          >
            Additional Tips
          </a>
        )}
      </nav>

      <main className="flex-grow ml-0 lg:ml-72 px-4 md:px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 border-b border-sky-200 pb-4">
          Your Personalized Fitness Plan
        </h1>

        <Section
          id="preferences"
          refObj={preferencesRef}
          icon={<FaAppleAlt />}
          title="Preferences"
          show={showPreferences}
          toggle={() => setShowPreferences(!showPreferences)}
        >
          <ul className="grid sm:grid-cols-2 gap-6 text-slate-700 text-lg">
            <li>
              <strong>Gender:</strong> {planData.gender}
            </li>
            <li>
              <strong>Goal:</strong> {planData.fitnessGoal}
            </li>
            <li>
              <strong>Activity Level:</strong> {planData.activityLevel}
            </li>
            <li>
              <strong>Dietary Preference:</strong> {planData.dietaryPreference}
            </li>
            <li>
              <strong>Meal Plan Type:</strong> {planData.mealPlanType}
            </li>
          </ul>
        </Section>

        <Section
          id="workout"
          refObj={workoutRef}
          icon={<FaDumbbell />}
          title="Workout Plan"
          show={showWorkout}
          toggle={() => setShowWorkout(!showWorkout)}
        >
          {planData.workoutPlan.length === 0 ? (
            <p className="text-slate-600 italic">No workout plan available.</p>
          ) : (
            planData.workoutPlan.map((day, i) => (
              <div
                key={i}
                className="mb-10 p-5 bg-sky-50 rounded-xl border-l-4 border-sky-500"
              >
                <h3 className="text-2xl font-semibold text-sky-900 mb-3">
                  {day.Day} — {day.Focus}
                </h3>
                <ul className="space-y-3">
                  {day.Exercises?.map((ex, idx) => (
                    <li
                      key={idx}
                      className="bg-white rounded p-4 shadow text-slate-800"
                    >
                      <p className="font-bold">{ex.Name}</p>
                      {ex.Sets && (
                        <p>
                          Sets: <strong>{ex.Sets}</strong>, Reps:{' '}
                          <strong>{ex.Reps}</strong>
                          {ex.PerLeg ? ' (per leg)' : ''}
                        </p>
                      )}
                      {ex.Duration && (
                        <p>
                          Duration: <strong>{ex.Duration}</strong>
                        </p>
                      )}
                      {ex.Description && (
                        <p className="text-sm italic text-slate-600 mt-1">
                          {ex.Description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                {day.Notes && (
                  <p className="mt-4 italic text-slate-600 font-medium">
                    {day.Notes}
                  </p>
                )}
              </div>
            ))
          )}
        </Section>

        <Section
          id="meal"
          refObj={mealRef}
          icon={<FaAppleAlt />}
          title="Meal Plan"
          show={showMeal}
          toggle={() => setShowMeal(!showMeal)}
        >
          {planData.mealPlan.length === 0 ? (
            <p className="text-slate-600 italic">No meal plan available.</p>
          ) : (
            planData.mealPlan.map((meal, i) => (
              <div
                key={i}
                className="mb-10 p-5 bg-emerald-50 rounded-xl border-l-4 border-emerald-500"
              >
                <h3 className="text-2xl font-semibold text-emerald-900 mb-2">
                  {meal.Meal}
                </h3>
                <p className="text-lg text-emerald-800 font-medium">
                  {meal.Description}
                </p>
                {meal.Recipes?.length > 0 && (
                  <ul className="mt-3 list-disc list-inside text-emerald-700">
                    {meal.Recipes.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                )}
                {meal.Notes && (
                  <p className="mt-3 italic text-emerald-700 font-medium">
                    {meal.Notes}
                  </p>
                )}
              </div>
            ))
          )}
        </Section>

        {planData.additionalTips.length > 0 && (
          <Section
            id="tips"
            refObj={tipsRef}
            icon={<FaLightbulb />}
            title="Additional Tips"
            show={showTips}
            toggle={() => setShowTips(!showTips)}
          >
            <ul className="list-disc list-inside text-yellow-700 space-y-2">
              {planData.additionalTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </Section>
        )}
      </main>

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg"
          aria-label="Back to Top"
        >
          <FaArrowUp size={24} />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default FitnessPlanPage;
