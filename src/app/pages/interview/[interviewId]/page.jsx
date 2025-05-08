'use client';
{/*

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



    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main>
        <div className="flex flex-col min-h-screen bg-white">


          <div className="p-4 mb-3 border-b mt-15 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-semibold text-center sm:text-left">
              Conversation in <span className="text-blue-600">{language}</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
              <label htmlFor="voice" className="text-sm font-medium text-blue-600">
                Voice:
              </label>
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



          <main className="flex-1  overflow-y-auto pt-[50px] pb-[50px] px-3 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100">
            <div className="max-w-2xl mx-auto space-y-5 b">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 rounded-2xl text-sm shadow-md transition-all break-words w-fit ${msg.sender === 'user'
                    ? 'bg-indigo-600 text-white ml-auto rounded-br-none'
                    : 'bg-white border border-gray-300 text-gray-800 mr-auto rounded-bl-none'
                    }`}
                >
                  <div className="text-[11px] font-bold uppercase mb-1 tracking-wide opacity-70">
                    {msg.sender}
                  </div>
                  <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>
          </main>


          <div className="fixed bottom-12 left-0 right-0 bg-white border-t px-4 sm:px-6 py-4 shadow-md z-10">
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleToggleListening}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition ${listening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
                  }`}
              >
                <Mic className={`w-5 h-5 ${listening ? 'animate-pulse' : ''}`} />
                {listening ? 'Listening...' : 'Start Listening'}
              </button>

              <div className="relative flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Speak or type your message..."
                  disabled
                  className="w-full min-h-[48px] px-4 py-3 pr-24 rounded-lg border border-gray-300 bg-gray-100 text-sm resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {loading && (
                  <div className="absolute right-3 bottom-3 flex items-center gap-2 text-xs text-blue-700">
                    <div className="flex gap-1 animate-bounce">
                      <span className="h-2.5 w-2.5 bg-gray-400 rounded-full" />
                      <span className="h-2.5 w-2.5 bg-gray-400 rounded-full delay-100" />
                      <span className="h-2.5 w-2.5 bg-gray-400 rounded-full delay-200" />
                    </div>
                    <span className="ml-2">Sending...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>



  );
}

export default Interview;

*/}

import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import Header from '@/app/component/Header/page';
import Footer from '@/app/component/Footer/page';
import axios from 'axios';
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
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech is active

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
      setIsSpeaking(false); // Update state when speech ends
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true); // Update state when speech starts
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel(); // Stop all speech
    setIsSpeaking(false); // Update state to indicate speech is stopped
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main>
        <div className="flex flex-col min-h-screen bg-white">
          <div className="p-4 mb-3 border-b mt-15 flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-semibold text-center sm:text-left">
              Conversation in <span className="text-blue-600">{language}</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
              <label htmlFor="voice" className="text-sm font-medium text-blue-600">
                Voice:
              </label>
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

          <main className="flex-1 overflow-y-auto pt-[50px] pb-[50px] px-3 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100">
            <div className="max-w-2xl mx-auto space-y-5 b">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 rounded-2xl text-sm shadow-md transition-all break-words w-fit ${msg.sender === 'user'
                    ? 'bg-indigo-600 text-white ml-auto rounded-br-none'
                    : 'bg-white border border-gray-300 text-gray-800 mr-auto rounded-bl-none'
                    }`}
                >
                  <div className="text-[11px] font-bold uppercase mb-1 tracking-wide opacity-70">
                    {msg.sender}
                  </div>
                  <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>
          </main>

          <div className="fixed bottom-12 left-0 right-0 bg-white border-t px-4 sm:px-6 py-4 shadow-md z-10">
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleToggleListening}
                className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition ${listening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'
                  }`}
              >
                <Mic className={`w-5 h-5 ${listening ? 'animate-pulse' : ''}`} />
                {listening ? 'Listening...' : 'Start Listening'}
              </button>

              <button
                onClick={isSpeaking ? stopSpeaking : () => speak('AI is ready to assist you.')}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                {isSpeaking ? 'Speaker Off' : 'Speaker On'}
              </button>

              <div className="relative flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Speak or type your message..."
                  disabled
                  className="w-full min-h-[48px] px-4 py-3 pr-24 rounded-lg border border-gray-300 bg-gray-100 text-sm resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {loading && (
                  <div className="absolute right-3 bottom-3 flex items-center gap-2 text-xs text-blue-700">
                    <div className="flex gap-1 animate-bounce">
                      <span className="h-2.5 w-2.5 bg-gray-400 rounded-full" />
                      <span className="h-2.5 w-2.5 bg-gray-400 rounded-full delay-100" />
                      <span className="h-2.5 w-2.5 bg-gray-400 rounded-full delay-200" />
                    </div>
                    <span className="ml-2">Sending...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Interview;
