
'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, Radio, Circle } from 'lucide-react'
import Header from '@/app/component/Header/page'
import Footer from '@/app/component/Footer/page'
import { FaCheckCircle, FaRegCircle, FaRegDotCircle } from 'react-icons/fa';



const STORAGE_KEY = 'language-todo-status'


const languageData = {
  English: [
    {
      title: 'Alphabet and Pronunciation',
      subTodos: [
        { text: 'Learn the vowel sounds (A, E, I, O, U)', status: 'not-read' },
        { text: 'Learn consonant sounds (B, C, D, etc.)', status: 'not-read' },
        { text: 'Practice basic pronunciation exercises', status: 'not-read' },
        { text: 'Explore common spelling patterns', status: 'not-read' },
        { text: 'Learn common English diphthongs (oi, ow, etc.)', status: 'not-read' },
        { text: 'Master stress patterns in syllables', status: 'not-read' },
        { text: 'Practice tongue twisters to improve pronunciation', status: 'not-read' }
      ]
    },
    {
      title: 'Basic Vocabulary Building',
      subTodos: [
        { text: 'Learn common nouns (e.g., objects, people, places)', status: 'not-read' },
        { text: 'Learn basic verbs (run, eat, go, be, do, have)', status: 'not-read' },
        { text: 'Study pronouns and question words', status: 'not-read' },
        { text: 'Practice vocabulary with images and spaced repetition', status: 'not-read' },
        { text: 'Learn common adjectives and adverbs', status: 'not-read' },
        { text: 'Understand and practice basic prepositions', status: 'not-read' }
      ]
    },
    {
      title: 'Basic Grammar Rules',
      subTodos: [
        { text: 'Learn subject-verb-object sentence structure', status: 'not-read' },
        { text: 'Understand the use of articles (a, an, the)', status: 'not-read' },
        { text: 'Learn about singular and plural forms', status: 'not-read' },
        { text: 'Study simple present tense usage', status: 'not-read' },
        { text: 'Understand the use of conjunctions (and, but, or)', status: 'not-read' }
      ]
    }
  ],
  French: [
    {
      title: 'L’alphabet et la prononciation',
      subTodos: [
        { text: 'Apprenez les sons des voyelles (A, E, I, O, U)', status: 'not-read' },
        { text: 'Apprenez les sons des consonnes (B, C, D, etc.)', status: 'not-read' },
        { text: 'Exercez-vous à la prononciation de base', status: 'not-read' },
        { text: 'Explorez les modèles d\'orthographe courants', status: 'not-read' },
        { text: 'Apprenez les diphtongues courantes en français', status: 'not-read' },
        { text: 'Maîtrisez les schémas de stress des syllabes', status: 'not-read' },
        { text: 'Exercez-vous avec des virelangues', status: 'not-read' }
      ]
    },
    {
      title: 'Construction du vocabulaire de base',
      subTodos: [
        { text: 'Apprenez les noms communs (par exemple objets, personnes, lieux)', status: 'not-read' },
        { text: 'Apprenez les verbes de base (courir, manger, aller, être, avoir)', status: 'not-read' },
        { text: 'Étudiez les pronoms et les mots interrogatifs', status: 'not-read' },
        { text: 'Pratiquez le vocabulaire avec des images et la répétition espacée', status: 'not-read' },
        { text: 'Apprenez les adjectifs et les adverbes courants', status: 'not-read' },
        { text: 'Comprenez les prépositions de base', status: 'not-read' }
      ]
    },
    {
      title: 'Règles de grammaire de base',
      subTodos: [
        { text: 'Apprenez la structure sujet-verbe-objet', status: 'not-read' },
        { text: 'Comprenez l\'utilisation des articles (un, une, le, la)', status: 'not-read' },
        { text: 'Apprenez les formes singulières et plurielles', status: 'not-read' },
        { text: 'Étudiez l\'utilisation du présent simple', status: 'not-read' },
        { text: 'Comprenez l\'utilisation des conjonctions (et, mais, ou)', status: 'not-read' }
      ]
    }
  ],
  Japanese: [
    {
      title: 'アルファベットと発音',
      subTodos: [
        { text: '母音の音を学ぶ（A、E、I、O、U）', status: 'not-read' },
        { text: '子音の音を学ぶ（B、C、Dなど）', status: 'not-read' },
        { text: '基本的な発音練習を行う', status: 'not-read' },
        { text: '一般的な綴りのパターンを探る', status: 'not-read' },
        { text: '日本語の特殊な音（撥音、促音など）を学ぶ', status: 'not-read' },
        { text: '日本語の音節構造を理解する', status: 'not-read' }
      ]
    },
    {
      title: '基本的な語彙の構築',
      subTodos: [
        { text: '一般的な名詞を学ぶ（例：物、場所、人）', status: 'not-read' },
        { text: '基本的な動詞を学ぶ（走る、食べる、行く、いる、する、持つ）', status: 'not-read' },
        { text: '代名詞と疑問詞を学ぶ', status: 'not-read' },
        { text: '画像と間隔反復を使って語彙を練習する', status: 'not-read' },
        { text: 'よく使われる形容詞と副詞を学ぶ', status: 'not-read' },
        { text: '基本的な前置詞を理解する', status: 'not-read' }
      ]
    },
    {
      title: '基本的な文法ルール',
      subTodos: [
        { text: '日本語の基本的な文型を学ぶ（SOV）', status: 'not-read' },
        { text: '助詞の使い方を学ぶ（が、の、に、で、へ）', status: 'not-read' },
        { text: '動詞の活用を理解する（ます形、て形、辞書形）', status: 'not-read' },
        { text: '形容詞の使い方（い形容詞、な形容詞）', status: 'not-read' },
        { text: '簡単な会話の表現を覚える', status: 'not-read' }
      ]
    }
  ]
}

/*

export default function BasicsPage() {
  const [language, setLanguage] = useState('English')
  const [todos, setTodos] = useState([])
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    // Deep clone to avoid mutating original data
    const data = JSON.parse(JSON.stringify(languageData[language]))
    // Ensure every subTodo has a status
    data.forEach(t => {
      t.subTodos.forEach(s => {
        if (!s.status) s.status = 'not-read'
      })
    })
    // Initialize each section as collapsed (null)
    const initExp = {}
    data.forEach((_, i) => initExp[i] = null)

    setTodos(data)
    setExpanded(initExp)
  }, [language])

  const updateStatus = (tIdx, sIdx, status) =>
    setTodos(prev => {
      const copy = [...prev]
      copy[tIdx].subTodos[sIdx].status = status
      return copy
    })

  const expandNext = tIdx => {
    const curr = expanded[tIdx]
    if (curr < todos[tIdx].subTodos.length - 1) {
      updateStatus(tIdx, curr, 'read')
      setExpanded(prev => ({ ...prev, [tIdx]: curr + 1 }))
    }
  }

  const expandPrev = tIdx => {
    const curr = expanded[tIdx]
    if (curr > 0) {
      updateStatus(tIdx, curr, 'not-read')
      setExpanded(prev => ({ ...prev, [tIdx]: curr - 1 }))
    }
  }

  const toggleExpand = tIdx => {
    setExpanded(prev => ({
      ...prev,
      [tIdx]: prev[tIdx] === null ? 0 : null
    }))
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-30">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
            Basics of Language
          </h1>

          <div className="mb-8">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow focus:ring-indigo-600"
            >
              {Object.keys(languageData).map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="space-y-8">
            {todos.map((todo, tIdx) => {
              const sIdx = expanded[tIdx]
              const sub = sIdx != null ? todo.subTodos[sIdx] : null

              return (
                <div key={tIdx}>
                  <div
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow cursor-pointer"
                    onClick={() => toggleExpand(tIdx)}
                  >
                    <h2 className="text-2xl font-semibold text-indigo-700">
                      {todo.title}
                    </h2>
                    <div className="text-xl text-gray-500">›</div>
                  </div>

                  {sub && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner mt-2 space-y-4">
                      <div className="flex items-center space-x-3">
                        {sub.status === 'read'
                          ? <CheckCircle className="text-green-600" />
                          : sub.status === 'half-read'
                            ? <Radio className="text-yellow-600" />
                            : <Circle className="text-gray-600" />
                        }
                        <h3 className="text-lg font-medium">{sub.text}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'read')}
                          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Mark as Read
                        </button>
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'half-read')}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        >
                          Mark as Half-Read
                        </button>
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'not-read')}
                          className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                          Mark as Not-Read
                        </button>
                      </div>

                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => expandPrev(tIdx)}
                          disabled={sIdx === 0}
                          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => expandNext(tIdx)}
                          disabled={sIdx === todo.subTodos.length - 1}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


export default function Basics() {
  const [language, setLanguage] = useState('English')
  const [todos, setTodos] = useState([])
  const [expanded, setExpanded] = useState({})
  const [filter, setFilter] = useState('all') // all | not-read | half-read | read

  // Initialize from languageData + localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const data = JSON.parse(JSON.stringify(languageData[language]))
    data.forEach((sec, i) => {
      sec.subTodos.forEach((sub, j) => {
        sub.status = stored[language]?.[i]?.[j] || sub.status
      })
    })
    setTodos(data)
    // All collapsed initially
    setExpanded(data.reduce((acc, _, i) => ({ ...acc, [i]: null }), {}))
  }, [language])

  // Persist statuses
  useEffect(() => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    store[language] = todos.map(sec => sec.subTodos.map(s => s.status))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }, [todos, language])

  const updateStatus = (tIdx, sIdx, status) => {
    setTodos(prev => {
      const copy = [...prev]
      copy[tIdx].subTodos[sIdx].status = status
      return copy
    })
  }

  const expandNext = tIdx => {
    const curr = expanded[tIdx]
    if (curr < todos[tIdx].subTodos.length - 1) {
      updateStatus(tIdx, curr, 'read')
      setExpanded(prev => ({ ...prev, [tIdx]: curr + 1 }))
    }
  }

  const expandPrev = tIdx => {
    const curr = expanded[tIdx]
    if (curr > 0) {
      updateStatus(tIdx, curr, 'not-read')
      setExpanded(prev => ({ ...prev, [tIdx]: curr - 1 }))
    }
  }

  const toggleExpand = tIdx => {
    setExpanded(prev => ({
      ...prev,
      [tIdx]: prev[tIdx] === null ? 0 : null
    }))
  }

  const collapseAll = () =>
    setExpanded(todos.reduce((acc, _, i) => ({ ...acc, [i]: null }), {}))

  const expandAll = () =>
    setExpanded(todos.reduce((acc, _, i) => ({ ...acc, [i]: 0 }), {}))

  const resetSection = tIdx => {
    setTodos(prev => {
      const copy = [...prev]
      copy[tIdx].subTodos = copy[tIdx].subTodos.map(s => ({ ...s, status: 'not-read' }))
      return copy
    })
  }

  // Overall progress
  const total = todos.reduce((sum, sec) => sum + sec.subTodos.length, 0)
  const done = todos.reduce((sum, sec) => sum + sec.subTodos.filter(s => s.status === 'read').length, 0)
  const overallPct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
        
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
            Basics of Language
          </h1>

         
          <div className="mb-6">
            <div className="text-sm mb-1">Overall Progress: {overallPct}%</div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-indigo-600 h-2 rounded"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>

              <div className="flex flex-wrap gap-3 mb-8">
            {['English', 'French', 'Japanese'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-md ${language === lang ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                  }`}
              >
                {lang}
              </button>
            ))}

            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-2 py-1 border rounded-md"
            >
              <option value="all">All</option>
              <option value="not-read">Not-Read</option>
              <option value="half-read">Half-Read</option>
              <option value="read">Read</option>
            </select>

            <button
              onClick={expandAll}
              className="px-3 py-1 bg-green-200 rounded-md"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1 bg-red-200 rounded-md"
            >
              Collapse All
            </button>
          </div>

       
          <div className="space-y-8">
            {todos.map((todo, tIdx) => {
              // For collapsed view: filter subTodos
              const filtered = todo.subTodos.filter(s =>
                filter === 'all' ? true : s.status === filter
              )
              const sIdx = expanded[tIdx]
              const sub = sIdx != null ? todo.subTodos[sIdx] : null

              // Section progress %
              const secDone = todo.subTodos.filter(s => s.status === 'read').length
              const secPct = Math.round((secDone / todo.subTodos.length) * 100)

              return (
                <div key={tIdx}>
              
                  <div className="flex justify-between items-center">
                    <div
                      className="flex-1 bg-white p-4 rounded-lg shadow cursor-pointer"
                      onClick={() => toggleExpand(tIdx)}
                    >
                      <h2 className="text-2xl font-semibold text-indigo-700">
                        {todo.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => resetSection(tIdx)}
                      className="ml-4 text-sm text-red-500"
                    >
                      Reset Section
                    </button>
                  </div>

                
                  <div className="mt-2 mb-4 px-4">
                    <div className="text-sm mb-1">
                      Section Progress: {secPct}%
                    </div>
                    <div className="w-full bg-gray-200 h-1 rounded">
                      <div
                        className="bg-indigo-400 h-1 rounded"
                        style={{ width: `${secPct}%` }}
                      />
                    </div>
                  </div>

                 
                  {sub && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-4 space-y-4">
                      <div className="flex items-center space-x-3">
                        {sub.status === 'read'
                          ? <CheckCircle className="text-green-600" />
                          : sub.status === 'half-read'
                            ? <Radio className="text-yellow-600" />
                            : <Circle className="text-gray-600" />
                        }
                        <h3 className="text-lg font-medium">{sub.text}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'read')}
                          className="px-3 py-1 bg-green-500 text-white rounded-md"
                        >
                          Mark as Read
                        </button>
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'half-read')}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                        >
                          Half-Read
                        </button>
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'not-read')}
                          className="px-3 py-1 bg-gray-500 text-white rounded-md"
                        >
                          Not-Read
                        </button>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => expandPrev(tIdx)}
                          disabled={sIdx === 0}
                          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => expandNext(tIdx)}
                          disabled={sIdx === todo.subTodos.length - 1}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                
                  {sIdx == null && filtered.length > 0 && (
                    <ul className="px-4 space-y-2 mb-4">
                      {filtered.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-center space-x-3 bg-white p-3 rounded shadow"
                        >
                          {step.status === 'read'
                            ? <CheckCircle className="text-green-600" />
                            : step.status === 'half-read'
                              ? <Radio className="text-yellow-600" />
                              : <Circle className="text-gray-600" />
                          }
                          <span>{step.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


export default function BasicsPage() {
  const [language, setLanguage] = useState('English')
  const [todos, setTodos] = useState([])
  const [expanded, setExpanded] = useState({})
  const [filter, setFilter] = useState('all') // all|not-read|half-read|read

  // Initialize from localStorage + defaults
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const data = JSON.parse(JSON.stringify(languageData[language]))
    data.forEach((section, i) => {
      section.subTodos.forEach((step, j) => {
        step.status = stored[language]?.[i]?.[j] || 'not-read'
      })
    })
    setTodos(data)
    setExpanded(data.reduce((o, _, i) => ({ ...o, [i]: null }), {}))
  }, [language])

  // Persist statuses
  useEffect(() => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    store[language] = todos.map(s => s.subTodos.map(st => st.status))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }, [todos, language])

  const updateStatus = (tIdx, sIdx, status) =>
    setTodos(prev => {
      const copy = [...prev]
      copy[tIdx].subTodos[sIdx].status = status
      return copy
    })

  const expandNext = tIdx => {
    const curr = expanded[tIdx]
    if (curr < todos[tIdx].subTodos.length - 1) {
      updateStatus(tIdx, curr, 'read')
      setExpanded(e => ({ ...e, [tIdx]: curr + 1 }))
    }
  }

  const expandPrev = tIdx => {
    const curr = expanded[tIdx]
    if (curr > 0) {
      updateStatus(tIdx, curr, 'not-read')
      setExpanded(e => ({ ...e, [tIdx]: curr - 1 }))
    }
  }

  const toggleExpand = tIdx =>
    setExpanded(e => ({ ...e, [tIdx]: e[tIdx] === null ? 0 : null }))

  const collapseAll = () =>
    setExpanded(todos.reduce((o, _, i) => ({ ...o, [i]: null }), {}))

  const expandAll = () =>
    setExpanded(todos.reduce((o, _, i) => ({ ...o, [i]: 0 }), {}))

  const resetSection = tIdx =>
    setTodos(prev => {
      const c = [...prev]
      c[tIdx].subTodos = c[tIdx].subTodos.map(s => ({ ...s, status: 'not-read' }))
      return c
    })

  const total = todos.reduce((sum, s) => sum + s.subTodos.length, 0)
  const done = todos.reduce((sum, s) => sum + s.subTodos.filter(st => st.status === 'read').length, 0)
  const overallPct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
        
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
            Basics of Language
          </h1>

   
          <div className="mb-6">
            <div className="text-sm mb-1">Overall Progress: {overallPct}%</div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div className="bg-indigo-600 h-2 rounded" style={{ width: `${overallPct}%` }} />
            </div>
          </div>

        
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.keys(languageData).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-md ${
                  language === lang ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                }`}
              >
                {lang}
              </button>
            ))}

            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-2 py-1 border rounded-md"
            >
              <option value="all">All</option>
              <option value="not-read">Not-Read</option>
              <option value="half-read">Half-Read</option>
              <option value="read">Read</option>
            </select>

            <button onClick={expandAll} className="px-3 py-1 bg-green-200 rounded-md">
              Expand All
            </button>
            <button onClick={collapseAll} className="px-3 py-1 bg-red-200 rounded-md">
              Collapse All
            </button>
          </div>

       
          <div className="space-y-8">
            {todos.map((todo, tIdx) => {
              const filtered = todo.subTodos.filter(s =>
                filter === 'all' ? true : s.status === filter
              )
              const sIdx = expanded[tIdx]
              const sub = sIdx != null ? todo.subTodos[sIdx] : null
              const secDone = todo.subTodos.filter(s => s.status === 'read').length
              const secPct = Math.round((secDone / todo.subTodos.length) * 100)

              return (
                <div key={tIdx}>
               
                  <div className="flex justify-between items-center">
                    <div
                      className="flex-1 bg-white p-4 rounded-lg shadow cursor-pointer"
                      onClick={() => toggleExpand(tIdx)}
                    >
                      <h2 className="text-2xl font-semibold text-indigo-700">
                        {todo.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => resetSection(tIdx)}
                      className="ml-4 text-sm text-red-500"
                    >
                      Reset Section
                    </button>
                  </div>

              
                  <div className="mt-2 mb-4 px-4">
                    <div className="text-sm mb-1">Section: {secPct}%</div>
                    <div className="w-full bg-gray-200 h-1 rounded">
                      <div
                        className="bg-indigo-400 h-1 rounded"
                        style={{ width: `${secPct}%` }}
                      />
                    </div>
                  </div>

                
                  {sub && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-4 space-y-4">
                      <div className="flex items-center space-x-3">
                        {sub.status === 'read' ? (
                          <CheckCircle className="text-green-600" />
                        ) : sub.status === 'half-read' ? (
                          <Radio className="text-yellow-600" />
                        ) : (
                          <Circle className="text-gray-600" />
                        )}
                        <h3 className="text-lg font-medium">{sub.text}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'read')}
                          className="px-3 py-1 bg-green-500 text-white rounded-md"
                        >
                          Mark as Read
                        </button>
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'half-read')}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                        >
                          Mark as Half-Read
                        </button>
                        <button
                          onClick={() => updateStatus(tIdx, sIdx, 'not-read')}
                          className="px-3 py-1 bg-gray-500 text-white rounded-md"
                        >
                          Mark as Not-Read
                        </button>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => expandPrev(tIdx)}
                          disabled={sIdx === 0}
                          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => expandNext(tIdx)}
                          disabled={sIdx === todo.subTodos.length - 1}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                
                  {sIdx == null && filtered.length > 0 && (
                    <ul className="px-4 space-y-2 mb-4">
                      {filtered.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-center space-x-3 bg-white p-3 rounded shadow"
                        >
                          {step.status === 'read' ? (
                            <CheckCircle className="text-green-600" />
                          ) : step.status === 'half-read' ? (
                            <Radio className="text-yellow-600" />
                          ) : (
                            <Circle className="text-gray-600" />
                          )}
                          <span>{step.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}




export default function Basics() {
  const [language, setLanguage] = useState('English')
  const [todos, setTodos] = useState([])
  const [expandedSections, setExpandedSections] = useState({})  // Track which section is expanded
  const [currentStep, setCurrentStep] = useState({})  // Track current step for each section
  const [filter, setFilter] = useState('all')

  // Load data & initialize section state
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const data = JSON.parse(JSON.stringify(languageData[language]))
    data.forEach((section, i) => {
      section.subTodos.forEach((step, j) => {
        step.status = stored[language]?.[i]?.[j] || 'not-read'
      })
    })
    setTodos(data)
    setExpandedSections(data.reduce((o, _, i) => {
      o[i] = false // Default: collapsed
      return o
    }, {}))
    setCurrentStep(data.reduce((o, _, i) => {
      o[i] = 0 // Default: first step in each section
      return o
    }, {}))
  }, [language])

  // Persist statuses
  useEffect(() => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    store[language] = todos.map(sec => sec.subTodos.map(s => s.status))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }, [todos, language])

  const updateStatus = (ti, si, st) =>
    setTodos(prev => {
      const c = [...prev]
      c[ti].subTodos[si].status = st
      return c
    })

  // Function to navigate next and previous steps
  const nextStep = (sectionIndex) => {
    const current = currentStep[sectionIndex]
    if (current < todos[sectionIndex].subTodos.length - 1) {
      setCurrentStep((prev) => ({ ...prev, [sectionIndex]: current + 1 }))
    }
  }

  const prevStep = (sectionIndex) => {
    const current = currentStep[sectionIndex]
    if (current > 0) {
      setCurrentStep((prev) => ({ ...prev, [sectionIndex]: current - 1 }))
    }
  }

  // Toggle expanded/collapsed state of a section
  const toggleExpand = (ti) => {
    setExpandedSections((e) => ({ ...e, [ti]: !e[ti] }))
  }

  const collapseAll = () =>
    setExpandedSections(todos.reduce((o, _, i) => {
      o[i] = false
      return o
    }, {}))
  const expandAll = () =>
    setExpandedSections(todos.reduce((o, _, i) => {
      o[i] = true
      return o
    }, {}))

  const total = todos.reduce((s, sec) => s + sec.subTodos.length, 0)
  const done = todos.reduce((s, sec) => s + sec.subTodos.filter(x => x.status === 'read').length, 0)
  const overallPct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">

         
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
            Basics of Language
          </h1>
          <div className="mb-6">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full p-3 border rounded shadow"
            >
              {Object.keys(languageData).map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

     
          <div className="mb-6">
            <div className="text-sm mb-1">Overall Progress: {overallPct}%</div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-indigo-600 h-2 rounded"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>

        
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={expandAll} className="px-3 py-1 bg-green-200 rounded">Expand All</button>
            <button onClick={collapseAll} className="px-3 py-1 bg-red-200 rounded">Collapse All</button>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-2 py-1 border rounded"
            >
              <option value="all">All</option>
              <option value="not-read">Not-Read</option>
              <option value="half-read">Half-Read</option>
              <option value="read">Read</option>
            </select>
          </div>

        
          <div className="space-y-8">
            {todos.map((section, ti) => {
              const expanded = expandedSections[ti]
              const current = currentStep[ti]
              const filtered = section.subTodos.filter(s => filter === 'all' || s.status === filter)

              return (
                <div key={ti}>
                 
                  <div
                    className="flex justify-between items-center bg-white p-4 rounded shadow cursor-pointer"
                    onClick={() => toggleExpand(ti)}
                  >
                    <h2 className="text-2xl font-semibold text-indigo-700">
                      {section.title}
                    </h2>
                  </div>

                 
                  {expanded && (
                    <ul className="px-4 space-y-2 mb-4">
                      {filtered.slice(current, current + 1).map((step, si) => (
                        <li
                          key={si}
                          className="flex items-center space-x-3 bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-100"
                        >
                          {step.status === 'read' && <CheckCircle />}
                          {step.status === 'half-read' && <Circle />}
                          {step.status === 'not-read' && <Radio />}
                          <span>{step.text}</span>
                          <div className="flex ml-auto">
                            <button onClick={() => updateStatus(ti, si, 'read')} className="text-green-500">Mark as Read</button>
                            <button onClick={() => updateStatus(ti, si, 'half-read')} className="text-yellow-500 ml-2">Mark as Half-Read</button>
                            <button onClick={() => updateStatus(ti, si, 'not-read')} className="text-red-500 ml-2">Mark as Not-Read</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                
                  {expanded && (
                    <div className="flex justify-between px-4">
                      <button onClick={() => prevStep(ti)} disabled={current === 0} className="px-4 py-2 bg-blue-200 rounded">Back</button>
                      <button onClick={() => nextStep(ti)} disabled={current === section.subTodos.length - 1} className="px-4 py-2 bg-blue-200 rounded">Next</button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


*/

export default function BasicsPage() {
  const [language, setLanguage] = useState('English')
  const [todos, setTodos] = useState([])
  const [expandedSections, setExpandedSections] = useState({})
  const [currentStep, setCurrentStep] = useState({})
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const data = JSON.parse(JSON.stringify(languageData[language]))
    data.forEach((section, i) => {
      section.subTodos.forEach((step, j) => {
        step.status = stored[language]?.[i]?.[j] || 'not-read'
      })
    })
    setTodos(data)
    setExpandedSections(data.reduce((o, _, i) => {
      o[i] = false
      return o
    }, {}))
    setCurrentStep(data.reduce((o, _, i) => {
      o[i] = 0
      return o
    }, {}))
  }, [language])

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    store[language] = todos.map(sec => sec.subTodos.map(s => s.status))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }, [todos, language])

  const updateStatus = (ti, si, st) =>
    setTodos(prev => {
      const c = [...prev]
      c[ti].subTodos[si].status = st
      return c
    })

  const nextStep = (sectionIndex) => {
    const current = currentStep[sectionIndex]
    if (current < todos[sectionIndex].subTodos.length - 1) {
      setCurrentStep((prev) => ({ ...prev, [sectionIndex]: current + 1 }))
    }
  }

  const prevStep = (sectionIndex) => {
    const current = currentStep[sectionIndex]
    if (current > 0) {
      setCurrentStep((prev) => ({ ...prev, [sectionIndex]: current - 1 }))
    }
  }

  const toggleExpand = (ti) => {
    setExpandedSections((e) => ({ ...e, [ti]: !e[ti] }))
  }

  const collapseAll = () =>
    setExpandedSections(todos.reduce((o, _, i) => {
      o[i] = false
      return o
    }, {}))
  const expandAll = () =>
    setExpandedSections(todos.reduce((o, _, i) => {
      o[i] = true
      return o
    }, {}))

  const total = todos.reduce((s, sec) => s + sec.subTodos.length, 0)
  const done = todos.reduce((s, sec) => s + sec.subTodos.filter(subTodo => subTodo.status === 'read').length, 0)
  const overallPct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Header */}
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
            Basics of Language
          </h1>
          <div className="mb-6">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full p-3 border rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {Object.keys(languageData).map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Overall progress */}
          <div className="mb-6">
            <div className="text-sm mb-1">Overall Progress: {overallPct}%</div>
            <div className="w-full bg-gray-200 h-2 rounded-lg">
              <div
                className="bg-indigo-600 h-2 rounded-lg"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={expandAll}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition"
            >
              Collapse All
            </button>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              <option value="not-read">Not-Read</option>
              <option value="half-read">Half-Read</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {todos.map((section, ti) => {
              const expanded = expandedSections[ti]
              const current = currentStep[ti]
              const filtered = section.subTodos.filter(s => filter === 'all' || s.status === filter)

              return (
                <div key={ti}>
                  {/* section header */}
                  <div
                    className="flex justify-between items-center bg-white p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => toggleExpand(ti)}
                  >
                    <h2 className="text-2xl font-semibold text-indigo-700">
                      {section.title}
                    </h2>
                  </div>

                  {/* Subtodos list */}
                  {expanded && (
                    <ul className="px-4 space-y-2 mb-4">
                      {filtered.map((step, si) => (
                        <li
                          key={si}
                          className="flex items-center space-x-3 bg-white p-3 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition"
                        >
                          {step.status === 'read' && <CheckCircle />}
                          {step.status === 'half-read' && <Radio />}
                          {step.status === 'not-read' && <Circle />}
                          <span>{step.text}</span>
                          <div className="flex ml-auto space-x-2">
                            <button
                              onClick={() => updateStatus(ti, si, 'read')}
                              className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 focus:ring-2 focus:ring-green-400 transition"
                            >
                              Mark as Read
                            </button>
                            <button
                              onClick={() => updateStatus(ti, si, 'half-read')}
                              className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-400 transition"
                            >
                              Mark as Half-Read
                            </button>
                            <button
                              onClick={() => updateStatus(ti, si, 'not-read')}
                              className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 focus:ring-2 focus:ring-red-400 transition"
                            >
                              Mark as Not-Read
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

               
                  {/* Navigation buttons */}
                  {expanded && (
                    <div className="flex justify-between px-4">
                      <button
                        onClick={() => prevStep(ti)}
                        disabled={current === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition disabled:cursor-not-allowed"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => nextStep(ti)}
                        disabled={current === section.subTodos.length - 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}