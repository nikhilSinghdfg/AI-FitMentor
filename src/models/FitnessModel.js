import mongoose from "mongoose";

// Define schema for the fitness plan
const fitnessPlanSchema = new mongoose.Schema({
  userId: {
    type: String, 
  },
  gender: {
    type: String,
    required: true
  },
  fitnessGoal: {
    type: String,
    required: true
  },
  activityLevel: {
    type: String,
    required: true
  },
  dietaryPreference: {
    type: String,
    required: true
  },
  mealPlanType: {
    type: String,
    required: true
  },
  recommendations: {
    type: String,  // Storing the recommendation as a single string
    default: ""
  },
  aiResponse: {
    type: mongoose.Schema.Types.Mixed,  // Storing AI-generated response (can include anything)
    
  },
  conversationMessages: [  // Store unconventional conversation data
    {
      data: mongoose.Schema.Types.Mixed, // Store any type of data (could be objects, arrays, strings, etc.)
      timestamp: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export const FitnessPlan = mongoose.models.FitnessPlan || mongoose.model("FitnessPlan", fitnessPlanSchema);
