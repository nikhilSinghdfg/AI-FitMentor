


'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mic } from 'lucide-react';
import Header from '@/app/component/Header/page';
import Footer from '@/app/component/Footer/page';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function Interview() {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [language] = useState('English');
  const [role] = useState('Student');
  const [level] = useState('Beginner');
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!listening && transcript) {
      sendMessage(transcript);
    }
  }, [listening]);

  useEffect(() => {
    const loadVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
      if (synthVoices.length && !selectedVoiceURI) {
        const defaultVoice = synthVoices.find(v => v.name.includes('Female')) || synthVoices[0];
        setSelectedVoiceURI(defaultVoice?.voiceURI);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    };

    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    resetTranscript();

    const inputPrompt = `Language: ${language}, Level: ${level}, Role: ${role}, You are an AI language partner. Engage in a continuous conversation with the user in ${language} at a ${level} level in a ${role} setting. Always reply in ${language} and help the user improve fluency, confidence, and accuracy.`;

    try {
      const result = await axios.post('/api/users/interact-ai', {
        message: text,
        inputPrompt,
      });

      const aiReply = result.data.message;

      setConversation((prev) => [
        ...prev,
        { sender: 'user', message: text },
        { sender: 'ai', message: aiReply },
      ]);

      speak(aiReply);
    } catch (error) {
      console.error('Error communicating with AI:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (

    /*
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 pt-[80px] pl-2 pr-2 bg-white w-[1520px] md:px-5">
        <div className="w-full m-0 p-0 flex flex-col h-[80vh] border rounded-lg shadow-md overflow-hidden bg-gray-50">

       
          <div className="p-4 border-b flex justify-between items-center bg-white">
            <h1 className="text-xl font-semibold text-gray-800">Conversation in {language}</h1>
            <div className="flex items-center space-x-2">
              <label htmlFor="voice" className="text-sm font-medium">Voice:</label>
              <select
                id="voice"
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="px-2 py-1 rounded border text-sm"
              >
                {voices.map((voice, index) => (
                  <option key={index} value={voice.voiceURI}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          </div>

         
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-4 py-2 rounded-lg text-white ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 self-end text-right ml-auto'
                    : 'bg-gray-700 self-start text-left mr-auto'
                }`}
              >
                <strong className="block text-xs uppercase mb-1">{msg.sender}</strong>
                <p className="whitespace-pre-line">{msg.message}</p>
              </div>
            ))}
          </div>

         
          <div className="p-4 border-t flex flex-col md:flex-row md:items-center gap-4 bg-white">
            <button
              onClick={handleToggleListening}
              className={`flex items-center gap-2 px-4 py-2 rounded text-white font-medium transition duration-150 ${
                listening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Mic className="h-5 w-5" />
              {listening ?  '':''  }
            </button>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Speak or type..."
              disabled
              className="flex-1 p-2 rounded border border-gray-300 bg-gray-100 text-sm resize-none"
            />

            {loading && <p className="text-sm text-gray-600">Sending...</p>}
          </div>
        </div>
      </main>

      <Footer />
    </div>

*/

<div className="flex flex-col min-h-screen bg-white">
  <Header />

  <main className="flex-1 pt-[80px] px-2 md:px-5 bg-white w-full max-w-screen-xl mx-auto">
    <div className="w-full m-0 p-0 flex flex-col h-[80vh] border rounded-lg shadow-md overflow-hidden bg-gray-50">

      {/* Header & Voice Selector */}
      <div className="p-4 border-b flex justify-between items-center bg-white">
        <h1 className="text-xl font-semibold text-gray-800">Conversation in {language}</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="voice" className="text-sm font-medium">Voice:</label>
          <select
            id="voice"
            value={selectedVoiceURI}
            onChange={(e) => setSelectedVoiceURI(e.target.value)}
            className="px-2 py-1 rounded border text-sm"
          >
            {voices.map((voice, index) => (
              <option key={index} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[90%] sm:max-w-[75%] px-4 py-2 rounded-lg text-white ${
              msg.sender === 'user'
                ? 'bg-blue-600 self-end text-right ml-auto'
                : 'bg-gray-700 self-start text-left mr-auto'
            }`}
          >
            <strong className="block text-xs uppercase mb-1">{msg.sender}</strong>
            <p className="whitespace-pre-line">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-4 border-t flex flex-col md:flex-row md:items-center gap-4 bg-white">
        <button
          onClick={handleToggleListening}
          className={`flex items-center gap-2 px-4 py-2 rounded text-white font-medium transition duration-150 ${
            listening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <Mic className="h-5 w-5" />
          {listening ? 'Listening...' : 'Start Listening'}
        </button>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Speak or type..."
          disabled
          className="w-full md:flex-1 p-2 rounded border border-gray-300 bg-gray-100 text-sm resize-none"
        />

        {loading && <p className="text-sm text-gray-600">Sending...</p>}
      </div>
    </div>
  </main>

  <Footer />
</div>


  );
}

export default Interview;
