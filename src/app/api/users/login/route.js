import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModels";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

// Connect to the database
connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        console.log("User exists");

        const validPassword = await bcryptjs.compare(password, user.password); // 1 password from frontend, 2 password from DB compare

        if (!validPassword) {
            return NextResponse.json({ error: "Password is invalid" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Uncomment if you want to send verification email
        // await sendEmail({ email, emailType: "VERIFY", userId: tokenData.id });

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true // only manipulate cookies
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
