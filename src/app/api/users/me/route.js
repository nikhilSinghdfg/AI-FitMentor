import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Connect to the database
connectDB();

export async function POST(request) {
    try {
        // Extract userId from the token in the request
        const userId = await getDataFromToken(request);
        
        // Find the user in the database by userId, excluding the password field
        const user = await User.findOne({ _id: userId }).select("-password");

        // Return a JSON response with the user data
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error) {
        // Return a JSON response with an error message in case of failure
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
