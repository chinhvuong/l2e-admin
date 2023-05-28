import { courseQuestions } from '@/services/course.service'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Questions = ({ data }: { data: any }) => {
    const router = useRouter()
    const [questions, setQuestions] = useState<any[]>([
        {
            "_id": "6460d7add6a8deca185f5f8e",
            "courseId": "6460d4c6d6a8deca185f5db7",
            "question": "--",
            "medias": [
                ""
            ],
            "choices": [
                "--",
                "--",
                "--",
                "--"
            ],
            "correctAnswer": 0,
            "__v": 0,
            "createdAt": "2023-05-14T12:44:29.760Z",
            "updatedAt": "2023-05-14T12:44:29.760Z"
        },])
    const [isLoading, setIsLoading] = useState(false)
    const highlight = String(router.query.q)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                if (data._id) {
                    const rs: any[] = await courseQuestions(data._id)
                    setQuestions(rs)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        })()
    }, [data])

    useEffect(() => {
        if (router.query.q) {
            const el = document.getElementById(String(router.query.q))
            if (el) {
                el.scrollIntoView()
            }
        }
    }, [questions, router])

    return (
        <div>
            <h2 className='text-2xl'>Questions</h2>
            <div>{questions.map((question: any) => (
                <div className='p-4 rounded-md shadow-sm' key={question._id}>
                    <h3 id={question._id} className={`text-lg mb-4 ${highlight === question._id ? 'bg-yellow-400' : ''}`}>{question.question}</h3>
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

    )
}

export default Questions