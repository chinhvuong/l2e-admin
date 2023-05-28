import { Router } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'


const TableContent = ({ data, setTab }: { data: any, setTab: (t: string) => void }) => {
    const router = useRouter()
    console.log("🚀 ~ file: table-content.tsx:8 ~ TableContent ~ router:", router)
    const onQuiz = (id: string | undefined) => {
        if (id) {
            setTab('quizzes')
            router.push({
                pathname: router.asPath,
                query: { q: id, tab: 'quizzes' } // Add your desired query parameter and value here
            });
        }

    }
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Course Content</h1>

            <div className="divide-y divide-gray-200">
                {data.sections.map((section: any) => (
                    <div key={section._id} className="py-4">
                        <h2 className="text-lg font-bold">{section.name}</h2>
                        <ul className="mt-2">
                            {section.lessons.map((lesson: any) => (
                                <li key={lesson._id} className="flex items-center py-2 gap-6">
                                    <video src={lesson.media} className="w-[40%] h-64 mr-2" controls />
                                    <div>
                                        <div className="font-medium">{lesson.name}</div>
                                        <div className="text-gray-500">{lesson.description}</div>
                                        <div className='text-blue-600 cursor-pointer' onClick={() => onQuiz(lesson.quizzes[0]._id)}>Quiz: {lesson.quizzes[0]?.name}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TableContent