import { courseQuizzes } from '@/services/course.service'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Quizzes = ({ data }: { data: any }) => {
    const router = useRouter()
    const [quizzes, setQuizzes] = useState<any[]>([
        {
            "_id": "6460d7b8d6a8deca185f5fa1",
            "questions": [
                {
                    "_id": "6460d7add6a8deca185f5f8e",
                    "courseId": "6460d4c6d6a8deca185f5db7",
                    "question": "which library is not used javascript",
                    "medias": [
                        ""
                    ],
                    "choices": [
                        "php",
                        "next",
                        "react",
                        "angular"
                    ],
                    "correctAnswer": 0,
                    "__v": 0,
                    "createdAt": "2023-05-14T12:44:29.760Z",
                    "updatedAt": "2023-05-14T12:44:29.760Z"
                }
            ],
            "courseId": "6460d4c6d6a8deca185f5db7",
            "name": "quiz 1",
            "createdAt": "2023-05-14T12:44:40.950Z",
            "updatedAt": "2023-05-14T12:44:40.950Z",
            "__v": 0
        }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const highlight = router.query.q
    console.log("🚀 ~ file: quizzes.tsx:39 ~ Quizzes ~ highlight:", highlight)

    useEffect(() => {
        if (router.query.q) {
            const el = document.getElementById(String(router.query.q))
            console.log("🚀 ~ file: quizzes.tsx:43 ~ useEffect ~ el:", el)
            if (el) {
                el.scrollIntoView()
            }
        }
    }, [quizzes, router])

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                if (data._id) {
                    const rs: any[] = await courseQuizzes(data._id)
                    setQuizzes(rs)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        })()
    }, [data])

    return (
        <div>
            <h2 className='text-2xl'>Quizzes</h2>
            <div>
                {quizzes.map((quiz) => (
                    <div className='mt-4' key={quiz._id}>
                        <div id={quiz._id} className={`text-xl mb-4 capitalize ${highlight === quiz._id ? 'bg-yellow-400' : ''}`}> {quiz.name}</div>
                        <div>Questions</div>
                        <div>{quiz.questions.map((question: any) => (
                            <div className='p-4 rounded-md shadow-sm' key={question._id}>
                                <h3 id={question._id} className={`text-lg mb-4`}>{question.question}</h3>
                                {question.medias[0] && (
                                    <div className='mt-6'><img className='w-[50%] h-auto mx-auto' src={question.media[0]} alt="" /></div>
                                )}
                                <div className="grid grid-cols-2 gap-6">
                                    {question.choices.map((c: string, index: number) => (
                                        <div key={index} className={`p-2 rounded-md bg-white capitalize ${index === question.correctAnswer ? 'border border-blue-500' : ''}`}>
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}</div>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default Quizzes