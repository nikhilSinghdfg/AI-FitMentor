/*
"use client";

import { useState } from "react";
import axios from "axios";
import { Dialog } from '@headlessui/react';
import { useAppContext } from "@/app/userContext/page";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { chatSession } from "@/geminiAlModel";
import { LoaderCircle } from "lucide-react";


function FitnessForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [mealPlanType, setMealPlanType] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const { data, setData, saveduserId, setsaveduserId } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const InputPrompt = `
      You are a fitness and meal advisor. Your goal is to create a personalized fitness plan and meal recommendations for a user based on their preferences.

      User Details:
      - Gender: ${gender}
      - Fitness Goal: ${fitnessGoal}
      - Activity Level: ${activityLevel}
      - Dietary Preference: ${dietaryPreference}
      - Meal Plan Type: ${mealPlanType}
      - Additional Information: ${recommendations}

      Based on these details, generate the following:
      1. A personalized workout plan that aligns with the user's fitness goal (e.g., weight loss, muscle gain, or general fitness).
      2. A meal plan tailored to the user's dietary preference and meal plan type (e.g., vegetarian, vegan, high-protein, etc.).
      3. Provide any additional tips or advice that could help the user achieve their fitness goals effectively.

      Always provide advice in a positive, motivating tone. Offer specific exercises, meal suggestions, and actionable advice that helps the user stay on track with their goal.

      Make sure the response is in a structured JSON format, including:
      - Workout Plan: Array of exercises with details (e.g., sets, reps, duration).
      - Meal Plan: Array of meals with ingredients and nutritional information.
      - Additional Tips: Array of general tips or advice.
    `;

    try {
      // Send data to AI (Gemini API) and get the response
      const aiResponse = await chatSession.sendMessage(InputPrompt);


      // Clean the AI's raw response and extract relevant data
      let MockJsonRes = aiResponse.response.text().replace("```json", "").replace("```", "");
      console.log("Raw AI Response:", MockJsonRes);

      const userId = uuidv4();
      const conversationData = {
        userId: userId, // Unique identifier for the user
        gender,
        fitnessGoal,
        activityLevel,
        dietaryPreference,
        mealPlanType,
        recommendations,
        aiResponse: MockJsonRes, // The response from AI
        conversationMessages: [],
      };

      // Save data to database
      const response = await axios.post("/api/users/FitnessPlan", conversationData);
      console.log("Data saved successfully", response.data.message);
      if (response.status === 200) {
        setsaveduserId(response.data.userId);
        router.push(`/pages/fitnessPlan/${userId}`);
      }
    } catch (error) {
      setErrorMessage("Error processing your request.");
      console.error(error);
    }

    setDialogOpen(false);
  };

  return (
    <div className="flex justify-center py-10">

      <button className=""
        onClick={() => setDialogOpen(true)}
      >
        Get Started
      </button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-6">
          <Dialog.Panel className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl border border-gray-200 overflow-auto">
            <Dialog.Title className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Personalize Your Fitness Plan
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-5 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
                  <select
                    onChange={e => setFitnessGoal(e.target.value)}
                    className="w-full px-5 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select Goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                  <select
                    onChange={e => setActivityLevel(e.target.value)}
                    className="w-full px-5 py-3 text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select Activity Level</option>
                    <option value="Sedentary">Sedentary</option>
                    <option value="Active">Active</option>
                    <option value="Very Active">Very Active</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
                  <select
                    onChange={e => setDietaryPreference(e.target.value)}
                    className="w-full px-5 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select Dietary Preference</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meal Plan Type</label>
                  <select
                    onChange={e => setMealPlanType(e.target.value)}
                    className="w-full px-5 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select Meal Plan</option>
                    <option value="Balanced">Balanced</option>
                    <option value="High Protein">High Protein</option>
                    <option value="Low Carb">Low Carb</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Recommendations</label>
                  <textarea
                    onChange={e => setRecommendations(e.target.value)}
                    rows={4}
                    placeholder="Any allergies, preferences, or specific needs..."
                    className="w-full px-5 py-3 text-black border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-center text-red-600 font-medium">{errorMessage}</p>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="px-6 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition"
                >
                  Cancel
                </button>

              <button type="submit"  className="bg-blue-600 text-white hover:bg-blue-700">
                    "Start Interview" 
                </button>


              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>



    </div>
  );
}

export default FitnessForm;

*/


"use client";

import { useState } from "react";
import axios from "axios";
import { chatSession } from "@/geminiAIModel";

import { Dialog } from '@headlessui/react';
import { useAppContext } from "@/app/userContext/page";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { LoaderCircle } from "lucide-react";

function FitnessForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [mealPlanType, setMealPlanType] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);  // <-- Added loading state
  const router = useRouter();

  const { data, setData, saveduserId, setsaveduserId } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const InputPrompt = `
      You are a fitness and meal advisor. Your goal is to create a personalized fitness plan and meal recommendations for a user based on their preferences.

      User Details:
      - Gender: ${gender}
      - Fitness Goal: ${fitnessGoal}
      - Activity Level: ${activityLevel}
      - Dietary Preference: ${dietaryPreference}
      - Meal Plan Type: ${mealPlanType}
      - Additional Information: ${recommendations}

      Based on these details, generate the following:
      1. A personalized workout plan that aligns with the user's fitness goal (e.g., weight loss, muscle gain, or general fitness).
      2. A meal plan tailored to the user's dietary preference and meal plan type (e.g., vegetarian, vegan, high-protein, etc.).
      3. Provide any additional tips or advice that could help the user achieve their fitness goals effectively.

      Always provide advice in a positive, motivating tone. Offer specific exercises, meal suggestions, and actionable advice that helps the user stay on track with their goal.

      Make sure the response is in a structured JSON format, including:
      - Workout Plan: Array of exercises with details (e.g., sets, reps, duration).
      - Meal Plan: Array of meals with ingredients and nutritional information.
      - Additional Tips: Array of general tips or advice.
    `;

    try {
      // Send data to AI (Gemini API) and get the response
      const aiResponse = await chatSession.sendMessage(InputPrompt);

      // Clean the AI's raw response and extract relevant data
      let MockJsonRes = aiResponse.response.text().replace("```json", "").replace("```", "");
      console.log("Raw AI Response:", MockJsonRes);

      const userId = uuidv4();
      const conversationData = {
        userId: userId, // Unique identifier for the user
        gender,
        fitnessGoal,
        activityLevel,
        dietaryPreference,
        mealPlanType,
        recommendations,
        aiResponse: MockJsonRes, // The response from AI
        conversationMessages: [],
      };

      // Save data to database
      const response = await axios.post("/api/users/FitnessPlan", conversationData);
      console.log("Data saved successfully", response.data.message);
      if (response.status === 200) {
        setsaveduserId(response.data.userId);
        router.push(`/pages/fitnessPlan/${userId}`);
      }
    } catch (error) {
      setErrorMessage("Error processing your request.");
      console.error(error);
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  return (
    <div className="flex justify-center py-10">

      <button className=""
        onClick={() => setDialogOpen(true)}
      >
        Get Started
      </button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-6">
          <Dialog.Panel className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl border border-gray-200 overflow-auto">
            <Dialog.Title className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Personalize Your Fitness Plan
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-5 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    disabled={loading}  // <-- disable while loading
                    value={gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
                  <select
                    onChange={e => setFitnessGoal(e.target.value)}
                    className="w-full px-5 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    disabled={loading}
                    value={fitnessGoal}
                  >
                    <option value="">Select Goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                  <select
                    onChange={e => setActivityLevel(e.target.value)}
                    className="w-full px-5 py-3 text-black border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    disabled={loading}
                    value={activityLevel}
                  >
                    <option value="">Select Activity Level</option>
                    <option value="Sedentary">Sedentary</option>
                    <option value="Active">Active</option>
                    <option value="Very Active">Very Active</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
                  <select
                    onChange={e => setDietaryPreference(e.target.value)}
                    className="w-full px-5 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    disabled={loading}
                    value={dietaryPreference}
                  >
                    <option value="">Select Dietary Preference</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meal Plan Type</label>
                  <select
                    onChange={e => setMealPlanType(e.target.value)}
                    className="w-full px-5 py-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    disabled={loading}
                    value={mealPlanType}
                  >
                    <option value="">Select Meal Plan</option>
                    <option value="Balanced">Balanced</option>
                    <option value="High Protein">High Protein</option>
                    <option value="Low Carb">Low Carb</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Recommendations</label>
                  <textarea
                    onChange={e => setRecommendations(e.target.value)}
                    rows={4}
                    placeholder="Any allergies, preferences, or specific needs..."
                    className="w-full px-5 py-3 text-black border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    disabled={loading}
                    value={recommendations}
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-center text-red-600 font-medium">{errorMessage}</p>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="px-6 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition"
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-2 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    "Get Plan"
                  )}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default FitnessForm;
