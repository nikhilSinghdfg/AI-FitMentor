import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { FitnessPlan } from "@/models/FitnessModel";
import { v4 as uuidv4 } from "uuid";

// ensure mongoose is connected
connectDB();

export async function POST(request) {
  try {

    const reqBody = await request.json();

    const {
      userId,
      gender,
      fitnessGoal,
      activityLevel,
      dietaryPreference,
      mealPlanType,
      recommendations,
      aiResponse,
      conversationMessages,
    } = reqBody;

    const uniqueId = uuidv4();

    // create a new document
    const plan = new FitnessPlan({
      userId,
      id: uniqueId,
      gender,
      fitnessGoal,
      activityLevel,
      dietaryPreference,
      mealPlanType,
      recommendations,
      aiResponse,
      conversationMessages,
    });

    // save to MongoDB
    const saved = await plan.save();

   
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Fitness plan saved successfully",
        userId: saved.userId,
      }),
      { status: 200 }
  );
  } catch (error) {
    console.error("Error saving fitness plan:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
