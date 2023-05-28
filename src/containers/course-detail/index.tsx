import { courseDetail } from '@/services/course.service'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import General from './general'
import Questions from './questions'
import Quizzes from './quizzes'
import Students from './students'
import TableContent from './table-content'
const initial = {
    "_id": "",
    "owner": "--",
    "author": "--",
    "name": "Become rich in a night",
    "overview": "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
    "description": "--",
    "price": 0,
    "rating": 0,
    "reviews": 0,
    "students": 0,
    "language": "en",
    "approved": true,
    "requirements": [
        "--",
        "--"
    ],
    "goals": [
        "--",
        "--",
        "--",
        "--",
        "--",
        "--"
    ],
    "thumbnail": "https://l2e-store.s3.amazonaws.com/file-1684421768896.jpg",
    "promotionalVideo": "https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1684421794251.mp4",
    "category": "--",
    "createdAt": "2023-05-18T14:54:56.393Z",
    "updatedAt": "2023-05-23T15:41:19.127Z",
    "__v": 0,
    "include": {},
    "finalTest": {
        "_id": "--",
        "courseId": "64663c405c637757e0746b1c",
        "name": "Final",
        "createdAt": "2023-05-18T15:09:18.642Z",
        "updatedAt": "2023-05-18T15:09:18.642Z",
        "__v": 0
    },
    "courseId": 5,
    "sections": [
        {
            "_id": "64663fcb5c637757e0746cb8",
            "courseId": "64663c405c637757e0746b1c",
            "name": "Day 1 - Beginner - Working with Variables in Python to Manage Data",
            "description": "",
            "order": 0,
            "createdAt": "2023-05-18T15:10:03.421Z",
            "updatedAt": "2023-05-18T15:10:03.421Z",
            "__v": 0,
            "lessons": [
                {
                    "_id": "64663fcb5c637757e0746ccd",
                    "sectionId": "64663fcb5c637757e0746cb8",
                    "name": "What you're going to get from this course",
                    "description": "",
                    "media": "https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1684422045041.mp4",
                    "mediaName": "pexels-edtor-ㅤ-15659109-1920x1080-30fps.mp4",
                    "mediaType": "video",
                    "quizzes": [
                        {
                            "_id": "64663f865c637757e0746c49",
                            "questions": [
                                "64663f785c637757e0746c38"
                            ],
                            "courseId": "64663c405c637757e0746b1c",
                            "name": "Lesson 1",
                            "createdAt": "2023-05-18T15:08:54.269Z",
                            "updatedAt": "2023-05-18T15:08:54.269Z"
                        }
                    ],
                    "mode": "",
                    "order": 0,
                    "updatedAt": "2023-05-18T14:54:57.474Z",
                    "createdAt": "2023-05-18T14:54:57.474Z",
                    "__v": 0,
                    "learned": false
                }
            ]
        },
        {
            "_id": "64663fcb5c637757e0746cb9",
            "courseId": "64663c405c637757e0746b1c",
            "name": "Day 2 - Beginner - Understanding Data Types and How to Manipulate Strings",
            "description": "",
            "order": 1,
            "createdAt": "2023-05-18T15:10:03.421Z",
            "updatedAt": "2023-05-18T15:10:03.421Z",
            "__v": 0,
            "lessons": [
                {
                    "_id": "64663fcb5c637757e0746cc9",
                    "sectionId": "64663fcb5c637757e0746cb9",
                    "name": "Day 2 Goals: what we will make by the end of the day",
                    "description": "",
                    "media": "https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1684422050953.mp4",
                    "mediaName": "pexels-nitin-khajotia-15952972-1280x720-30fps.mp4",
                    "mediaType": "video",
                    "quizzes": [
                        {
                            "_id": "64663f8e5c637757e0746c53",
                            "questions": [
                                "64663f785c637757e0746c39"
                            ],
                            "courseId": "64663c405c637757e0746b1c",
                            "name": "Lesson 2",
                            "createdAt": "2023-05-18T15:09:02.096Z",
                            "updatedAt": "2023-05-18T15:09:02.096Z"
                        }
                    ],
                    "mode": "",
                    "order": 0,
                    "createdAt": "2023-05-18T15:10:03.532Z",
                    "updatedAt": "2023-05-18T15:10:03.532Z",
                    "__v": 0,
                    "learned": false
                },
                {
                    "_id": "64663fcb5c637757e0746cca",
                    "sectionId": "64663fcb5c637757e0746cb9",
                    "name": "Python Primitive Data Types",
                    "description": "",
                    "media": "https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1684422061610.mp4",
                    "mediaName": "pexels-edtor-ㅤ-15659260-2560x1440-30fps.mp4",
                    "mediaType": "video",
                    "quizzes": [
                        {
                            "_id": "64663f965c637757e0746c5c",
                            "questions": [
                                "64663f785c637757e0746c3a"
                            ],
                            "courseId": "64663c405c637757e0746b1c",
                            "name": "Lesson 3",
                            "createdAt": "2023-05-18T15:09:10.135Z",
                            "updatedAt": "2023-05-18T15:09:10.135Z"
                        }
                    ],
                    "mode": "",
                    "order": 1,
                    "createdAt": "2023-05-18T15:10:03.532Z",
                    "updatedAt": "2023-05-18T15:10:03.532Z",
                    "__v": 0,
                    "learned": false
                }
            ]
        }
    ]
}
const CourseDetail = () => {
    const router = useRouter()
    console.log("🚀 ~ file: index.tsx:6 ~ CourseDetail ~ router:", router)
    const [tab, setTab] = useState('general')

    const [data, setData] = useState(initial)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (router.query.id) {
            (async () => {
                try {
                    setIsLoading(true)
                    const rs = await courseDetail(String(router.query.id))
                    console.log("🚀 ~ file: index.tsx:173 ~ rs:", rs)
                    setData(rs)
                    setIsLoading(false)
                } catch (error) {
                    setIsLoading(false)
                }
            })()
        }
        if (router.isReady && router.query.tab) {
            setTab(String(router.query.tab))
        }
    }, [router.isReady])
    // if (!data._id) {
    //     return ''
    // }
    const onTab = (t: string) => {
        setTab(t)
    }
    const tabClass = (t: string) => {
        if (tab === t) {
            return 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
        }

        return 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
    }
    const renderTabContent = () => {
        switch (tab) {
            case 'general':
                return (
                    <General data={data} />
                )
            case 'table-content':
                return (
                    <TableContent data={data} setTab={onTab} />
                )
            case 'students':
                return (
                    <Students data={data} />
                )

            case 'questions':
                return (
                    <Questions data={data} />
                )

            case 'quizzes':
                return (
                    <Quizzes data={data} />
                )
            default:
                break;
        }
    }

    return (
        <div className='max-w-[1280px] mx-auto'>
            <div className="course-detail-thumbnail text-white min-h-[300px] bg-no-repeat bg-center bg-cover backdrop-blur-lg p-12 flex flex-col justify-center " style={{ backgroundImage: `url("${data.thumbnail}")` }}>
                <div className='z-10 opacity-90'>
                    <h1 className='text-white text-bold text-4xl'>{data.name}</h1>
                    <div className="mb-4">Created: {moment(data.createdAt).fromNow()}</div>
                    <div className="text-base mb-1">Overview: {data.overview}</div>
                    <div className="text-base mb-1">Author: {data.author}</div>
                    <div className="text-base mb-1">Price: {data.price} USDT</div>
                    <div className="text-base mb-1">Rating: {data.rating}</div>
                    <div className="text-base mb-1">Students: {data.students}</div>
                    <div className="text-base mb-1">Review: {data.reviews}</div>
                    <div className="text-base mb-1">Language: {data.language}</div>
                    <div className="text-base mb-1">Database Id: {data._id}</div>
                    <div className="text-base mb-1">Course Contract Id: {data.courseId}</div>
                </div>
            </div>

            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2" onClick={() => onTab('general')}>
                        <a href="#" className={tabClass('general')}>General</a>
                    </li>
                    <li className="mr-2" onClick={() => onTab('table-content')}>
                        <a href="#" className={tabClass('table-content')} aria-current="page">Table Content</a>
                    </li>
                    <li className="mr-2" onClick={() => onTab('quizzes')}>
                        <a href="#" className={tabClass('quizzes')}>Quizzes</a>
                    </li>
                    <li className="mr-2" onClick={() => onTab('questions')}>
                        <a href="#" className={tabClass('questions')}>Questions</a>
                    </li>
                    <li onClick={() => onTab('students')}>
                        <a className={tabClass('students')}>Students</a>
                    </li>
                </ul>
            </div>
            <div className='mt-6'>
                {renderTabContent()}
            </div>
        </div>
    )
}

export default CourseDetail