import { chatSession } from "@/geminiAIModel";  // Your AI integration logic
import { NextResponse } from "next/server"; // Make sure to import NextResponse

export async function POST(request) {
    try {
        const { convId, message, inputPrompt } = await request.json();

        // Send the prompt and the message to the AI
        const result = await chatSession.sendMessage(inputPrompt + "\nUser: " + message);

        // Assuming `result.response.text()` is valid
        const aiResponse = await result.response.text();

        // Return the AI's reply
        return new NextResponse(JSON.stringify({ message: aiResponse.trim() }), { status: 200 });

    } catch (error) {
        console.error("Error communicating with AI:", error);

        // Log more details to help debug
        console.error("Error details:", error.response ? error.response.data : error.message);

        return new NextResponse(
          JSON.stringify({ error: "Error communicating with AI", details: error.message }), 
          { status: 500 }
        );
    }
}
