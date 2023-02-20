import ApproveRequest from '@/components/approve-request'
import CustomPagination from '@/components/pagination'
import { ApproveRequestStatus } from '@/constants'
import { getApproveRequests } from '@/services/approve-request.service'
import React, { useEffect, useState } from 'react'
type Props = {
    name: string,
    status: ApproveRequestStatus,
    reload: boolean,
    setReload: (data: { [key: string]: boolean }) => void
}
const ApproveRequests = ({ name, status, reload, setReload }: Props) => {
    const [data, setData] = useState({
        isLoading: true,
        requests: [],
        page: 0,
        limit: 15,
        total: 0,
    })

    useEffect(() => {
        (async () => {
            try {
                const rs = await getApproveRequests({
                    page: data.page,
                    limit: data.limit,
                    status: status
                })
                setData({
                    ...data,
                    requests: rs.data,
                    isLoading: false,
                    total: rs.total
                })

            } catch (error) {

            }
        })()
    }, [data.page, data.limit])

    useEffect(() => {
        if (reload) {
            (async () => {
                try {
                    const rs = await getApproveRequests({
                        page: data.page,
                        limit: data.limit,
                        status: status
                    })
                    setData({
                        ...data,
                        requests: rs.data,
                        isLoading: false,
                        total: rs.total
                    })
                    setReload({
                        [status]: false
                    })

                } catch (error) {

                }
            })()
        }
    }, [reload])
    return (
        <div>
            <h2 className='text-2xl font-semibold mb-6 text-center'>{name}</h2>
            <ul className='max-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-hide'>
                {
                    data.requests?.map?.((req, index) => (
                        <ApproveRequest key={index} data={req} reload={setReload} />
                    ))
                }
            </ul>
            {
                data.requests?.length === 0 && !data.isLoading && (
                    <div className='font-extrabold opacity-30 text-2xl py-12 text-center'>
                        This list is empty now!
                    </div>
                )
            }
            {
                Boolean(data.total) && (
                    <div className="flex justify-end pt-2">
                        <CustomPagination
                            disabled={data.isLoading}
                            totalPage={Math.ceil(data.total / data.limit)}
                            page={data.page}
                            onChange={(page: number) => setData({ ...data, page: page })}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default ApproveRequests