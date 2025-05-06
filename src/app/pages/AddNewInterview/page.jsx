"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useAppContext } from "@/app/userContext/page";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogOverlay,
} from "@/components/ui/dialog";
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
        /*    <div>
                <div
                    className="h-[120px] bg-secondary border rounded-lg hover:scale-105 hover:shadow-6xl cursor-pointer transition-all"
                    onClick={() => setDialogOpen(true)}
                >
                    <h2 className="text-lg flex justify-center pt-[40px] font-semibold text-black">
                        + Add New
                    </h2>
                </div>
    
    
                <Dialog open={dialogOpen} >
                    <DialogContent className="bg-white w-full fixed top-[130px] left-2 sm:left-4 md:left-8 lg:left-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-black">Customize Your Language Learning Journey</DialogTitle>
                            <DialogDescription className="text-sm text-gray-900">
                                <form onSubmit={onsubmit}>
                                    <div>
    
                                        <h1>Let's personalize your learning journey—just fill out the form below.</h1>
    
                                        <div className="mt-7 my-4 flex flex-row">
                                            <label className="mt-1 mr-9">Job Role/Job position:</label>
                                            <Select onValueChange={setLanguage} >
                                                <SelectTrigger className="w-[200px] mb-3">
                                                    <SelectValue placeholder="Select a language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="English" >English</SelectItem>
                                                    <SelectItem value="French">French</SelectItem>
                                                    <SelectItem value="Japanese">Japanese</SelectItem>
                                                </SelectContent>
                                            </Select>
    
                                        </div>
    
                                        <div className="my-2 flex flex-row">
                                            <label className="mt-2 mr-4 ">What’s your current level:</label>
                                            <Select onValueChange={setLevel}>
    
                                                <SelectTrigger className="w-[200px] mb-3 ">
                                                    <SelectValue placeholder="Select a level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Beginner" >Beginner </SelectItem>
                                                    <SelectItem value="Intermediate">Intermediate </SelectItem>
                                                    <SelectItem value="Advanced ">Advanced </SelectItem>
                                                </SelectContent>
    
                                            </Select>
                                        </div>
    
                                        <div className=" my-2 flex flex-row  ">
                                            <label className="mt-2 mr-10">Select a learning role:</label>
                                            <Select onValueChange={setRole}>
    
                                                <SelectTrigger className="w-[200px] mb-3 ">
                                                    <SelectValue placeholder="Select your learning role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="teacher-student">Teacher-Student (Structured Learning) </SelectItem>
                                                    <SelectItem value="Parent–Child">Parent–Child (Casual Conversation) </SelectItem>
                                                    <SelectItem value="interviewer-interviewee ">Interviewer-Interviewee (Formal Practice) </SelectItem>
                                                </SelectContent>
    
                                            </Select>
    
                                        </div>
                                    </div>
    
    
    
                                    <div className="flex gap-5 justify-end">
                                        <Button type="button" onClick={() => setDialogOpen(false)} variant="ghost" className="bg-gray-200 hover:bg-gray-300 cursor-pointer">
                                            Cancel
                                        </Button>
    
                                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                                            Generating form AI
                                        </Button>
                                    </div>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
    
            */
        <div>
            <div
                className="h-[120px] bg-secondary border rounded-lg hover:scale-105 hover:shadow-6xl cursor-pointer transition-all"
                onClick={() => setDialogOpen(true)}
            >
                <h2 className="text-lg flex justify-center pt-[40px] font-semibold text-black">
                    + Add New
                </h2>
            </div>

            <Dialog open={dialogOpen}>
                <DialogContent
                    className="bg-white w-[90%] max-w-xl mx-auto rounded-lg p-6 shadow-xl"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-black">
                            Customize Your Language Learning Journey
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-900">
                            <form onSubmit={onsubmit}>
                                <div>
                                    <h1 className="mb-4">Let's personalize your learning journey—just fill out the form below.</h1>

                                    <div className="my-4 flex flex-col md:flex-row md:items-center">
                                        <label className="mb-1 md:mb-0 md:mr-4">Job Role/Job position:</label>
                                        <Select onValueChange={setLanguage}>
                                            <SelectTrigger className="w-full md:w-[200px] mb-3">
                                                <SelectValue placeholder="Select a language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="English">English</SelectItem>
                                                <SelectItem value="French">French</SelectItem>
                                                <SelectItem value="Japanese">Japanese</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="my-4 flex flex-col md:flex-row md:items-center">
                                        <label className="mb-1 md:mb-0 md:mr-4">What’s your current level:</label>
                                        <Select onValueChange={setLevel}>
                                            <SelectTrigger className="w-full md:w-[200px] mb-3">
                                                <SelectValue placeholder="Select a level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Beginner">Beginner</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                <SelectItem value="Advanced">Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="my-4 flex flex-col md:flex-row md:items-center">
                                        <label className="mb-1 md:mb-0 md:mr-4">Select a learning role:</label>
                                        <Select onValueChange={setRole}>
                                            <SelectTrigger className="w-full md:w-[200px] mb-3">
                                                <SelectValue placeholder="Select your learning role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="teacher-student">Teacher-Student (Structured Learning)</SelectItem>
                                                <SelectItem value="Parent–Child">Parent–Child (Casual Conversation)</SelectItem>
                                                <SelectItem value="interviewer-interviewee">Interviewer-Interviewee (Formal Practice)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-6">
                                    <Button
                                        type="button"
                                        onClick={() => setDialogOpen(false)}
                                        variant="ghost"
                                        className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                    >
                                        Generating form AI
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>



    )
}

export default AddNewInterview