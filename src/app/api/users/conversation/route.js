import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Conversation } from "@/models/conversationModels";

// Ensure the DB is connected before any operations
connectDB();

export async function POST(request) {
    try {
        // Parse the incoming request body to JSON
        const reqBody = await request.json();
        console.log("Request Body:", reqBody);  // For debugging

        
   ///    const { language, role, level,convId } = reqBody;
   const { jsonLanguage, jsonRole, jsonLevel,convId } = reqBody;



        // If convId is not passed, generate a new one using uuid
        const uniqueId = uuidv4();

  
        const newConversation = new Conversation({
            id: uniqueId,
            jsonLanguage,
            jsonRole,
            jsonLevel,
            convId,  // Pass the generated convId
            conversationMessages: []  // Empty messages initially
        });



        // Save the new conversation to the database
        const savedConversation = await newConversation.save();
        console.log("Saved Conversation:", savedConversation);  // For debugging

        // Return success response with the saved conversation's convId
        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Conversation settings saved successfully.",
                convId: savedConversation.convId,  // Return the saved convId
            }),
            { status: 200 }
        );
    } catch (error) {
        // Handle errors and return a failure response
        console.error("Error storing conversation settings:", error);
        return new NextResponse(
            JSON.stringify({
                error: "Failed to save conversation settings",
                details: error.message,
            }),
            { status: 500 }
        );
    }
}
