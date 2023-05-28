import React from 'react'

const General = ({ data }: { data: any }) => {
    return (
        <div className='pb-6'>
            <h2 className='text-blue-600'>Description:</h2>
            <div className='mb-6' dangerouslySetInnerHTML={{ __html: data.description }}></div>
            <div className='grid grid-cols-2 gap-6'>
                <div className="p-4 shadow-md rounded-md bg-white ">
                    <h2 className='text-blue-600'>Requirements:</h2>
                    <ul>
                        {data?.requirements?.map((requirement: string, index: number) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>

                </div>
                <div className="p-4 shadow-md rounded-md bg-white">
                    <h2 className='text-blue-600'>Course Goals:</h2>
                    <ul>
                        {data.goals.map((goal: string, index: number) => (
                            <li key={index}>{goal}</li>
                        ))}
                    </ul>
                </div>
                <div className="p-4 shadow-md rounded-md bg-white">
                    <h2 className='text-blue-600'>Promotional Video</h2>
                    {data.promotionalVideo ? (
                        <video src={data.promotionalVideo} controls />
                    ) : (
                        <div>no video</div>
                    )}

                </div>

                <div className="p-4 shadow-md rounded-md bg-white">
                    <h2 className='text-blue-600'>Include</h2>
                    {data.include && Object.keys(data.include).length ? (
                        <ul>
                            {Object.keys(data.include).map((key, index) => (
                                <li key={index}>{data.include[key]}</li>
                            ))}
                        </ul>
                    ) : (
                        <div>undefined</div>
                    )}

                </div>
            </div>


        </div>
    )
}

export default General