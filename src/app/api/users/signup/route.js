import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import {  NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

// Connect to the database
connectDB();

export async function POST(request) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        // Return success response with saved user details
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        // Return error response if any issue occurs
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
