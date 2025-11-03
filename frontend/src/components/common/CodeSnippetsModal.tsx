import { useFileSystem } from '@/context/FileContext'
import { useState, useEffect } from 'react'
import { HiSparkles } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { toast } from 'react-hot-toast'

interface CodeSnippetsModalProps {
    isOpen: boolean
    onClose: () => void
}

interface CodeSnippet {
    name: string
    language: string
    code: string
    description: string
}

const codeSnippets: CodeSnippet[] = [
    {
        name: 'React Component',
        language: 'javascript',
        description: 'Basic React functional component template',
        code: `import React from 'react'

function ComponentName() {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

export default ComponentName`,
    },
    {
        name: 'Express API Route',
        language: 'javascript',
        description: 'Basic Express.js API route handler',
        code: `const express = require('express')
const router = express.Router()

router.get('/api/endpoint', async (req, res) => {
    try {
        // Your logic here
        res.json({ success: true, data: {} })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

module.exports = router`,
    },
    {
        name: 'Python FastAPI Route',
        language: 'python',
        description: 'Basic FastAPI endpoint template',
        code: `from fastapi import FastAPI, HTTPException
from typing import Optional

app = FastAPI()

@app.get("/api/endpoint")
async def get_endpoint(param: Optional[str] = None):
    try:
        # Your logic here
        return {"success": True, "data": {}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))`,
    },
    {
        name: 'HTML5 Boilerplate',
        language: 'html',
        description: 'Modern HTML5 page structure',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <!-- Your content here -->
    </main>
</body>
</html>`,
    },
    {
        name: 'CSS Grid Layout',
        language: 'css',
        description: 'Responsive CSS Grid template',
        code: `.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.item {
    background: #f0f0f0;
    padding: 1rem;
    border-radius: 8px;
}`,
    },
    {
        name: 'TypeScript Interface',
        language: 'typescript',
        description: 'TypeScript interface definition',
        code: `interface InterfaceName {
    id: string
    name: string
    createdAt: Date
    updatedAt?: Date
}

type ResponseType<T> = {
    success: boolean
    data?: T
    error?: string
}`,
    },
]

function CodeSnippetsModal({ isOpen, onClose }: CodeSnippetsModalProps) {
    const { activeFile, setActiveFile } = useFileSystem()
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    const insertSnippet = (snippet: CodeSnippet) => {
        if (!activeFile) {
            toast.error('Please open a file first')
            return
        }

        const newContent = activeFile.content + '\n\n' + snippet.code
        setActiveFile({ ...activeFile, content: newContent })
        toast.success(`Inserted ${snippet.name} snippet`)
    }

    const filteredSnippets =
        selectedLanguage === 'all'
            ? codeSnippets
            : codeSnippets.filter((s) => s.language === selectedLanguage)

    const languages = Array.from(new Set(codeSnippets.map((s) => s.language)))

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <HiSparkles className="h-5 w-5 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Code Snippets</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <IoClose className="h-5 w-5" />
                    </button>
                </div>

                <div className="mb-4">
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    >
                        <option value="all">All Languages</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="max-h-[60vh] space-y-3 overflow-y-auto">
                    {filteredSnippets.length === 0 ? (
                        <div className="py-8 text-center text-gray-400">No snippets found for selected language</div>
                    ) : (
                        filteredSnippets.map((snippet, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-white">{snippet.name}</h3>
                                        <p className="mt-1 text-xs text-gray-400">{snippet.description}</p>
                                    </div>
                                    <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-300">
                                        {snippet.language}
                                    </span>
                                </div>
                                <pre className="mt-3 max-h-32 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-gray-300">
                                    <code>{snippet.code}</code>
                                </pre>
                                <button
                                    onClick={() => insertSnippet(snippet)}
                                    className="mt-3 w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
                                >
                                    Insert Snippet
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default CodeSnippetsModal

