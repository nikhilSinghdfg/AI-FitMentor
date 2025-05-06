import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connectDB();

export async function POST(request) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        // Find user with the token and check if token is valid
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user);

        // Update the user verification status and remove the token and expiry
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        
        // Return success response
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        });

    } catch (error) {
        // Return error response in case of failure
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
