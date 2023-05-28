import { ApproveRequestStatus } from '@/constants'
import React, { useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { toast } from 'react-toastify'
import { approveCourse, updateApproveRequest } from '@/services/approve-request.service'
import Link from 'next/link'

type Props = {
    reload: (data: { [key: string]: boolean }) => void,
    data: {
        _id: string,
        status: ApproveRequestStatus,
        createdAt: string,
        updatedAt: string
        courseId: string,
        course: {
            _id: string,
            name: string,
            thumbnail: string
        }
    }
}
const CLIENT_DOMAIN = String(process.env.NEXT_PUBLIC_CLIENT_DOMAIN)
const ApproveRequest = ({ data, reload }: Props) => {
    console.log("🚀 ~ file: index.tsx:27 ~ ApproveRequest ~ data", data)
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState({
        approve: false,
        reject: false,
        isLoading: false
    })
    const onApprove = async (requestId: string, courseId: string) => {
        setOpen({ ...open, isLoading: true })
        // await new Promise(resolve => setTimeout(resolve, 2000));
        await approveCourse({
            id: courseId
        })
        await updateApproveRequest(requestId, {
            status: ApproveRequestStatus.APPROVED,
            notes: []
        })
        reload({
            [ApproveRequestStatus.APPROVED]: true,
            [ApproveRequestStatus.PENDING]: true
        })
        setOpen({ ...open, isLoading: false, approve: false })
        toast.success('Approve successfully!')
    }

    const onReject = async (requestId: string, courseId: string) => {
        setOpen({ ...open, isLoading: true })

        await updateApproveRequest(requestId, {
            status: ApproveRequestStatus.REJECTED,
            notes: []
        })
        reload({
            [ApproveRequestStatus.REJECTED]: true,
            [ApproveRequestStatus.PENDING]: true
        })
        setOpen({ ...open, isLoading: false, reject: false })
        toast.success('Reject successfully!')
    }

    const renderAction = (action: ApproveRequestStatus) => {
        switch (action) {
            case ApproveRequestStatus.PENDING:
                return (
                    <div className="flex gap-4 mt-4 justify-end">
                        <button
                            className='bg-blue-500 rounded-md hover:bg-blue-600 transition-colors px-4 py-2'
                            disabled={isLoading}
                            onClick={() => setOpen({ ...open, approve: true })}
                        >
                            Approve
                        </button>
                        <Dialog
                            open={open.approve}
                            onClose={() => setOpen({ ...open, approve: false })}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure to approve this course?"}
                            </DialogTitle>
                            {/* <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Let Google help apps determine location. This means sending anonymous
                                    location data to Google, even when no apps are running.
                                </DialogContentText>
                            </DialogContent> */}
                            <DialogActions>
                                <Button onClick={() => onApprove(data._id, data.courseId)} disabled={open.isLoading}>Approve</Button>
                                <Button onClick={() => setOpen({ ...open, approve: false })} disabled={open.isLoading}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <button
                            className='bg-red-500 rounded-md hover:bg-red-600 transition-colors px-4 py-2'
                            disabled={isLoading}
                            onClick={() => setOpen({ ...open, reject: true })}
                        >
                            Reject
                        </button>
                        <Dialog
                            open={open.reject}
                            onClose={() => setOpen({ ...open, reject: false })}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure to reject approve this course?"}
                            </DialogTitle>
                            {/* <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Let Google help apps determine location. This means sending anonymous
                                    location data to Google, even when no apps are running.
                                </DialogContentText>
                            </DialogContent> */}
                            <DialogActions>
                                <Button onClick={() => onReject(data._id, data.courseId)} disabled={open.isLoading}>Reject</Button>
                                <Button onClick={() => setOpen({ ...open, reject: false })} disabled={open.isLoading}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
            default:
                break;
        }
    }
    return (
        <div className='flex gap-4 bg-white rounded-sm shadow-sm mb-4 p-2'>

            <Image
                src={'/graduation-cap.png'}
                alt={'Course thumbnail'}
                width={150}
                height={150}
            />
            <div className='flex flex-col grow'>
                <h3 className='text-md font-medium'><Link href={`courses/${data.course._id}`}>{data.course?.name}</Link></h3>
                <span className='opacity-60'>{
                    moment(data.createdAt).fromNow()
                }</span>
                <div className="grow"></div>
                {
                    renderAction(data.status)
                }
            </div>

        </div>
    )
}

export default ApproveRequest