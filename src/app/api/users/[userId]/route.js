// src/app/api/users/[userId]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { FitnessPlan } from "@/models/FitnessModel";
// ensure mongoose is connected


export async function GET(request, { params }) {

  try {
    await connectDB();

    const awaitedParams = await params;
    const { userId } = awaitedParams;

    if (!userId) {
      return NextResponse.json({ message: 'userId is required' }, { status: 400 });
    }

    const fitnessPreference = await FitnessPlan.findOne({ userId });

    if (!fitnessPreference) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: fitnessPreference },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching fitness plan:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
