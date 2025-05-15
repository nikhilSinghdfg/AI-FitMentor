/*

'use client';
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


    const inputPrompt = `
Language: ${language}, Level: ${level}, Role: ${role},
You are an AI language partner. Engage in a continuous conversation with the user in ${language} at a ${level} level in a ${role} setting.
Do not follow a question-and-answer format. Instead, have a natural back-and-forth conversation.
If the user makes grammar or pronunciation mistakes, correct them politely and continue the conversation.
Always reply in ${language} and help the user improve fluency, confidence, and accuracy.
`;




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







'use client';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationFinished, setConversationFinished] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState(null);
  const [fluencyRating, setFluencyRating] = useState(0);

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
    if (voice) utterance.voice = voice;
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    resetTranscript();

    const inputPrompt = `
Language: ${language}, Level: ${level}, Role: ${role},
You are an AI language partner. Engage in a continuous conversation with the user in ${language} at a ${level} level in a ${role} setting.
Do not follow a question-and-answer format. Instead, have a natural back-and-forth conversation.
If the user makes grammar or pronunciation mistakes, correct them politely and continue the conversation.
Always reply in ${language} and help the user improve fluency, confidence, and accuracy.
`;

    try {
      const result = await axios.post('/api/users/interact-ai', {
        message: text,
        inputPrompt,
      });

      const aiReply = result.data.message;

      setConversation(prev => [
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

  const handleFinishConversation = async () => {
    setConversationFinished(true);
    setLoading(true);

    try {
      const allText = conversation.map(c => `${c.sender}: ${c.message}`).join('\n');
      const result = await axios.post('/api/users/interact-ai', {
        message: allText,
        inputPrompt: `Act as a language learning expert. Analyze this full conversation between a user and an AI speaking partner. Based on the user's replies, provide a single overall fluency rating (out of 10), and list 3–5 constructive tips to improve language skills.`,
      });

      const feedback = result.data.message;
      setFinalFeedback(feedback);
      // Set fluency rating based on feedback (for example, parsing the feedback)
      const ratingMatch = feedback.match(/fluency rating: (\d+)/i);
      setFluencyRating(ratingMatch ? parseInt(ratingMatch[1], 10) : 0);
    } catch (error) {
      console.error('Error fetching final feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setConversation([]);
    setMessage('');
    setFinalFeedback(null);
    setFluencyRating(0);
    setConversationFinished(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  // Speedometer style CSS for fluency rating
  const speedometerStyles = {
    transform: `rotate(${(fluencyRating / 10) * 180 - 90}deg)`,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex flex-col flex-1">
        <div className="p-4 mb-3 border-b mt-15 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-semibold text-center sm:text-left">
            Conversation in <span className="text-blue-600">{language}</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
            <label htmlFor="voice" className="text-sm font-medium text-blue-600">Voice:</label>
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

        <div className="flex-1 overflow-y-auto pt-[50px] pb-[50px] px-3 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100">
          <div className="max-w-2xl mb-45 mx-auto space-y-5">
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

            {finalFeedback && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-900 rounded-md shadow">
                <h2 className="font-bold mb-1">🌟 Final Feedback:</h2>
                <p className="whitespace-pre-line">{finalFeedback}</p>
              </div>
            )}

            {fluencyRating > 0 && (
              <div className="flex flex-col items-center mt-6">
                <h2 className="text-xl font-semibold text-center">Fluency Rating</h2>
                <div className="relative w-40 h-40 bg-gray-200 rounded-full flex justify-center items-center">
                  <div
                    className="absolute w-36 h-36 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    style={speedometerStyles}
                  ></div>
                  <div className="absolute text-xl text-white font-bold">{fluencyRating}/10</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-12 left-0 right-0 bg-white border-t px-4 sm:px-6 py-4 shadow-md z-10">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleToggleListening}
              disabled={conversationFinished}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition
                ${conversationFinished
                  ? 'bg-gray-400 cursor-not-allowed'
                  : listening
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

            {conversationFinished ? (
              <button
                onClick={resetConversation}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                Start New Conversation
              </button>
            ) : (
              <button
                onClick={handleFinishConversation}
                disabled={conversation.length === 0 || conversationFinished}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Finish Conversation & Get Feedback
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Interview;


*/




'use client';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationFinished, setConversationFinished] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState(null);
  const [fluencyRating, setFluencyRating] = useState(0);

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
    if (voice) utterance.voice = voice;
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    resetTranscript();

    const inputPrompt = `
Language: ${language}, Level: ${level}, Role: ${role},
You are an AI language partner. Engage in a continuous conversation with the user in ${language} at a ${level} level in a ${role} setting.
Do not follow a question-and-answer format. Instead, have a natural back-and-forth conversation.
If the user makes grammar or pronunciation mistakes, correct them politely and continue the conversation.
Always reply in ${language} and help the user improve fluency, confidence, and accuracy.
`;

    try {
      const result = await axios.post('/api/users/interact-ai', {
        message: text,
        inputPrompt,
      });

      const aiReply = result.data.message;

      setConversation(prev => [
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

  const handleFinishConversation = async () => {
    setConversationFinished(true);
    setLoading(true);

    try {
      const allText = conversation.map(c => `${c.sender}: ${c.message}`).join('\n');
      const result = await axios.post('/api/users/interact-ai', {
        message: allText,
        inputPrompt: `Act as a language learning expert. Analyze this full conversation between a user and an AI speaking partner. Based on the user's replies, provide a single overall fluency rating (out of 10), and list 3–5 constructive tips to improve language skills.`,
      });

      const feedback = result.data.message;
      setFinalFeedback(feedback);
      const ratingMatch = feedback.match(/fluency rating: (\d+)/i);
      setFluencyRating(ratingMatch ? parseInt(ratingMatch[1], 10) : 0);
    } catch (error) {
      console.error('Error fetching final feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setConversation([]);
    setMessage('');
    setFinalFeedback(null);
    setFluencyRating(0);
    setConversationFinished(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex flex-col flex-1">
        <div className="p-4 mb-3 border-b mt-15 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-semibold text-center sm:text-left">
            Conversation in <span className="text-blue-600">{language}</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
            <label htmlFor="voice" className="text-sm font-medium text-blue-600">Voice:</label>
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

        <div className="flex-1 overflow-y-auto pt-[50px] pb-[50px] px-3 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100">
          <div className="max-w-2xl mb-45 mx-auto space-y-5">
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

            {/* Fluency Rating */}
            {fluencyRating > 0 && (
              <div className="flex flex-col items-center mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🚗 Fluency Rating</h2>
                <div className="relative w-60 h-30">
                  <svg viewBox="0 0 200 100" className="w-full h-auto">
                    <path
                      d="M10,100 A90,90 0 0,1 190,100"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="20"
                    />
                    <path
                      d="M10,100 A90,90 0 0,1 190,100"
                      fill="none"
                      stroke="url(#grad1)"
                      strokeWidth="20"
                      strokeDasharray="283"
                      strokeDashoffset={`${283 - (fluencyRating / 10) * 283}`}
                    />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle cx={10 + (fluencyRating / 10) * 180} cy="100" r="6" fill="#3b82f6" />
                  </svg>
                </div>
                <div className="mt-2 text-2xl font-bold text-blue-700">{fluencyRating}/10</div>
              </div>
            )}

            {/* Final Feedback */}
            {finalFeedback && (
              <div className="mt-6 p-5 bg-white border border-green-300 rounded-lg shadow-md max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-green-700 mb-2">🌟 Final Feedback</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm whitespace-pre-line">
                  {finalFeedback.split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-12 left-0 right-0 bg-white border-t px-4 sm:px-6 py-4 shadow-md z-10">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleToggleListening}
              disabled={conversationFinished}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition
                ${conversationFinished
                  ? 'bg-gray-400 cursor-not-allowed'
                  : listening
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

            {conversationFinished ? (
              <button
                onClick={resetConversation}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                Start New Conversation
              </button>
            ) : (
              <button
                onClick={handleFinishConversation}
                disabled={conversation.length === 0 || conversationFinished}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Finish Conversation & Get Feedback
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Interview;
