"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useAppContext } from "@/app/userContext/page";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { Dialog } from '@headlessui/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { chatSession } from "@/geminiAIModel";



function AddNewInterview() {

    const router = useRouter();

    const { data, setData, savedconvId, setsavedconvId } = useAppContext()

    const [JsonResponse, setjsonResponse] = useState([]);

    const [language, setLanguage] = useState("");
    const [level, setLevel] = useState("");
    const [role, setRole] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    const onsubmit = async (e) => {

        e.preventDefault();

        console.log(language, level, role);

        const InputPrompt =
            "Language: " + language +
            " , Level: " + level +
            " , Role: " + role +
            " , You are an AI language partner. Engage in a continuous conversation with the user in " + language +
            " at a " + level + " level in a " + role + " setting." +
            " Do not follow a question-and-answer format. Instead, have a natural back-and-forth conversation." +
            " If the user makes grammar or pronunciation mistakes, correct them politely and continue the conversation." +
            " Always reply in " + language + " and help the user improve fluency, confidence, and accuracy. in JSON Format";

        try {
            // Send the InputPrompt to the AI (you may skip this if you don't want AI's first message here)
            const result = await chatSession.sendMessage(InputPrompt);

            // Clean the AI's raw response and extract relevant data
            let MockJsonRes = result.response.text().replace("```json", "").replace("```", "");
            console.log("Raw AI Response:", MockJsonRes);


            const conversationData = {
                jsonLevel: level,
                jsonLanguage: language,
                jsonRole: role,
                jsonconversation: MockJsonRes,
                convId: uuidv4(),
                conversation: [],
            };


            const response = await axios.post("/api/users/conversation", conversationData)


            // Send the conversation settings to the backend and save
            //  const response = await axios.post("/api/users/conversation", JSON.stringify(conversationData), {
            ///      headers: {
            //          'Content-Type': 'application/json',
            //       }
            //   });

            console.log("Data saved successfully", response.data.message);

            if (response.status === 200) {
                // On success, redirect to the AI interaction page
                ///  const { convId } = response.data;
                setsavedconvId(response.data.convId); // Save the conversation ID for later use
                //// router.push('/pages/interview/'+response.data.convId);  // Redirect to the AI interaction page
                fun('/pages/interview/' + response.data.convId);



            } else {
                setErrorMessage("Failed to save settings.");
                console.error("Failed to save settings", response.data.error);
            }

        } catch (error) {
            setErrorMessage("Error communicating with AI.");
            console.error("Error sending message to AI:", error);
        }

        setDialogOpen(false);
        function fun(path) {
            router.push(path);
        }
    };




    return (

        <div>

            <div onClick={() => setDialogOpen(true)}>
                <h2>
                    Get Started
                </h2>
            </div>




            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="relative z-50">
                {/* Background overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Dialog panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white w-full max-w-xl rounded-lg p-6 shadow-xl">
                        <Dialog.Title className="text-xl font-semibold text-black">
                            Customize Your Language Learning Journey
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-900 mb-4">
                            Let’s personalize your learning journey—just fill out the form below.
                        </Dialog.Description>

                        <form onSubmit={onsubmit}>
                            <div className="my-7 flex flex-col md:flex-row md:items-center">
                                <label className="mb-1 md:mb-0 md:mr-4">Job Role/Job Position:</label>
                                <select onChange={(e) => setLanguage(e.target.value)} className="w-full md:w-[200px] ml-9 mb-3 mt-3">
                                    <option value="">Select a language</option>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Japanese">Japanese</option>
                                </select>
                            </div>

                            <div className="my-7 flex flex-col md:flex-row md:items-center">
                                <label className="mb-1 md:mb-0 md:mr-4">What’s your current level:</label>
                                <select onChange={(e) => setLevel(e.target.value)} className="w-full md:w-[200px] ml-4 mb-3 mt-3">
                                    <option value="">Select a level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="my-7 flex flex-col md:flex-row md:items-center">
                                <label className="mb-1 md:mb-0 md:mr-4">Select a learning role:</label>
                                <select onChange={(e) => setRole(e.target.value)} className="w-full md:w-[200px] mb-3 ml-11 mt-3">
                                    <option value="">Select your learning role</option>
                                    <option value="teacher-student">Teacher-Student (Structured Learning)</option>
                                    <option value="Parent–Child">Parent–Child (Casual Conversation)</option>
                                    <option value="interviewer-interviewee">Interviewer-Interviewee (Formal Practice)</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setDialogOpen(false)}
                                    className="bg-gray-200 hover:bg-gray-300 cursor-pointer px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer px-4 py-2 rounded-lg"
                                >
                                    Generate Form with AI
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
















        </div >


    )
}

export default AddNewInterview