import React from 'react'
import Header from '@/app/component/Header/page'
import Footer from '@/app/component/Footer/page'
import AddNewInterview from '../AddNewInterview/page'


function page() {
  return (
    <div>
      <Header />

      <div className='bg-gray-50 text-gray-800'>
        <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <section className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 leading-tight">
                Improve Your Language Skills with AI-Powered Conversations
              </h2>
              <p className="mt-6 text-lg text-gray-700">
                LangAdvisor AI helps you practice and enhance your language skills
                through natural, interactive conversations powered by advanced AI
                technology.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a
                  className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-md font-semibold shadow-md hover:bg-indigo-700 transition"
                  href="#how-it-works"
                >
                  <AddNewInterview />
                </a>

              </div>
            </div>
            <div className="lg:w-1/2 max-w-lg">
              <img
                alt="Illustration of a person interacting with an AI chatbot on a mobile device, showing speech bubbles with different languages"
                className="w-full rounded-lg shadow-lg"
                height="400"
                src="https://storage.googleapis.com/a1aa/image/291a9f11-bc09-45bb-ab4b-6d16357b13b0.jpg"
                width="600"
              />
            </div>
          </section>
          <section
            className="mt-24 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center"
            id="features"
          >
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <i className="fas fa-robot text-indigo-600 text-5xl mb-6"></i>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Conversations</h3>
              <p className="text-gray-600">
                Engage in realistic dialogues with our AI to practice speaking and
                comprehension in multiple languages.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <i className="fas fa-comments text-indigo-600 text-5xl mb-6"></i>
              <h3 className="text-xl font-semibold mb-2">Real-Time Feedback</h3>
              <p className="text-gray-600">
                Receive instant suggestions and corrections to improve your grammar,
                vocabulary, and pronunciation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <i className="fas fa-chart-line text-indigo-600 text-5xl mb-6"></i>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your language learning journey with detailed analytics and
                personalized goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <i className="fas fa-globe text-indigo-600 text-5xl mb-6"></i>
              <h3 className="text-xl font-semibold mb-2">Multi-Language Support</h3>
              <p className="text-gray-600">
                Practice languages like English, Spanish, French, Mandarin, and many
                more with ease.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <i className="fas fa-mobile-alt text-indigo-600 text-5xl mb-6"></i>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">
                Use LangAdvisor AI on any device, anytime, anywhere for convenient
                language practice.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <i className="fas fa-user-shield text-indigo-600 text-5xl mb-6"></i>
              <h3 className="text-xl font-semibold mb-2">Privacy &amp; Security</h3>
              <p className="text-gray-600">
                Your conversations and data are securely stored and never shared
                without your consent.
              </p>
            </div>
          </section>
          <section
            className="mt-24 max-w-4xl mx-auto text-center"
            id="how-it-works"
          >
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-12">
              How It Works
            </h2>
            <div className="space-y-12">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="sm:w-1/3">
                  <img
                    alt="Screenshot of a chat interface showing a user typing a message to AI"
                    className="mx-auto rounded-lg shadow-md"
                    height="200"
                    src="https://storage.googleapis.com/a1aa/image/78d25fa4-1d74-409d-db9b-2405522678ae.jpg"
                    width="200"
                  />
                </div>
                <div className="sm:w-2/3 text-left">
                  <h3 className="text-xl font-semibold mb-2">Start a Conversation</h3>
                  <p className="text-gray-700">
                    Begin chatting with the AI in your target language. The AI
                    understands context and responds naturally.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="sm:w-1/3 order-2 sm:order-1">
                  <img
                    alt="Illustration of AI providing feedback with grammar corrections and suggestions"
                    className="mx-auto rounded-lg shadow-md"
                    height="200"
                    src="https://storage.googleapis.com/a1aa/image/8efdf063-fb30-42f4-ade5-bbe961c276cd.jpg"
                    width="200"
                  />
                </div>
                <div className="sm:w-2/3 order-1 sm:order-2 text-left">
                  <h3 className="text-xl font-semibold mb-2">Receive Instant Feedback</h3>
                  <p className="text-gray-700">
                    Get real-time corrections and tips to improve your language skills
                    as you chat.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="sm:w-1/3">
                  <img
                    alt="Dashboard showing language learning progress charts and statistics"
                    className="mx-auto rounded-lg shadow-md"
                    height="200"
                    src="https://storage.googleapis.com/a1aa/image/89f2094d-88c2-48ff-1932-b49c5a99bac7.jpg"
                    width="200"
                  />
                </div>
                <div className="sm:w-2/3 text-left">
                  <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
                  <p className="text-gray-700">
                    Review your learning stats and set goals to stay motivated and
                    improve faster.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>




  )
}

export default page