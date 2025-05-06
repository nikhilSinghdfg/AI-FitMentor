import nodemailer from "nodemailer"
import { User } from "@/models/userModels"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // Generate a hashed token for verification or password reset
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // Update the user's record based on the email type
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId, {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            )
        }

        // Create a transporter object using the SMTP service
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a368ac4d5a5667",
                pass: "0eeefa124d4bd7"
            }
        })

        // Define the email options
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            text: `Welcome to AiMockApplication website, your account has been created with email id: ${email}`,
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser</br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
        }

        // Send the email
        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse

    } catch (error) {
        throw new Error(error.message)
    }
}
