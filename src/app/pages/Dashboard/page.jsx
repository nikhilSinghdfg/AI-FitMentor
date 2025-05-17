'use client';

import React from 'react';
import Header from '@/app/component/Header/page';
import Footer from '@/app/component/Footer/page';
import AddnewForm from '../AddnewForm/page';

const features = [
  {
    title: 'Personalized Fitness Plans',
    description: 'Get custom workout routines designed just for your goals, fitness level, and preferences.',
    icon: (
      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
      </svg>
    ),
  },
  {
    title: 'AI-Powered Meal Plans',
    description: 'Enjoy delicious, nutritious meals planned automatically based on your dietary needs and preferences.',
    icon: (
      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your fitness journey with insightful analytics and progress charts.',
    icon: (
      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4v11H3zM10 4h4v17h-4zM17 7h4v14h-4z" />
      </svg>
    ),
  },
  {
    title: 'Seamless Integration',
    description: 'Easily sync with your favorite devices and apps to keep all your health data in one place.',
    icon: (
      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM12 14c-4 0-8 2-8 6h16c0-4-4-6-8-6z" />
      </svg>
    ),
  },
];

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="bg-gray-50 text-gray-800">
        <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 leading-tight">
                Transform Your Health with AI-Powered Fitness & Meal Planner
              </h2>
              <p className="mt-6 text-lg text-gray-700">
                Our AI-driven platform provides personalized workout and meal plans tailored to your unique needs and goals.
              </p>

              {/*
           
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

                <a
                  className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold shadow-md hover:bg-indigo-700 transition w-auto"
                  href="#features"
                >
                  <AddnewForm />
                </a>

              </div>
              */}


              <div className="mt-8 flex flex-col sm:flex-row ml-32 justify-center lg:justify-start gap-4">
                <a
                  className="inline-flex items-center justify-center w-24 h-12 bg-blue-600 text-white rounded-md  font-semibold shadow-md hover:bg-blue-700 transition"
                  href="#features"
                >
                  <AddnewForm />
                </a>
              </div>





            </div>
            <div className="lg:w-1/2 max-w-lg">
              <img
                alt="Fitness and healthy meal concept illustration"
                className="w-full rounded-lg shadow-lg"
                height="400"
                width="600"
                src="/food.jpg"
              />
            </div>
          </section>

          <section
            className="mt-24 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center"
            id="features"
          >
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </section>

          <section className="mt-24 max-w-4xl mx-auto text-center" id="how-it-works">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-12">How It Works</h2>
            <div className="space-y-12">
              {[
                {
                  title: 'Start Your Plan',
                  description:
                    'Provide your fitness goals and preferences to our AI to generate a personalized workout and meal plan.',
                  img: (
                    <img
                      alt="Start your plan"
                      className="mx-auto rounded-lg shadow-md"
                      height="200"
                      width="200"
                      src="/plan.jpg"
                      loading="lazy"
                    />
                  ),
                },
                {
                  title: 'AI Customizes Plans',
                  description:
                    'Gemini AI analyzes your data and crafts fitness routines and meal plans tailored specifically to you.',
                  img: (
                    <img
                      alt="AI Customizes Plans"
                      className="mx-auto rounded-lg shadow-md"
                      height="200"
                      width="200"
                      src="/ai.jpg"
                      loading="lazy"
                    />
                  ),
                },
                {
                  title: 'Track Your Progress',
                  description:
                    'Monitor your workouts, meals, and improvements with insightful analytics to stay motivated.',
                  img: (
                    <img
                      alt="Track Your Progress"
                      className="mx-auto rounded-lg shadow-md"
                      height="200"
                      width="200"
                      src="/pr.jpg"
                      loading="lazy"
                    />
                  ),
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row items-center gap-8 ${i === 1 ? 'sm:flex-row-reverse' : ''}`}
                >
                  <div className="sm:w-1/3">
                    {step.img}
                  </div>
                  <div className="sm:w-2/3 text-left">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
