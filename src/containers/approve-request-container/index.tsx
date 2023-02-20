import { ApproveRequestStatus } from '@/constants'
import React, { useState } from 'react'
import ApproveRequests from './approve-requests'

const ApproveRequestContainer = () => {
    const [reload, setReload] = useState({
        [ApproveRequestStatus.APPROVED]: false,
        [ApproveRequestStatus.PENDING]: false,
        [ApproveRequestStatus.REJECTED]: false,
    })

    const onReload = (data: { [key: string]: boolean }) => {
        setReload({
            ...reload,
            ...data
        })
    }

    return (
        <div className='grid grid-cols-3 gap-4 pt-6'>
            <ApproveRequests status={ApproveRequestStatus.PENDING} name='Pending request' reload={reload[ApproveRequestStatus.PENDING]} setReload={onReload} />
            <ApproveRequests status={ApproveRequestStatus.APPROVED} name='Approved request' reload={reload[ApproveRequestStatus.APPROVED]} setReload={onReload} />
            <ApproveRequests status={ApproveRequestStatus.REJECTED} name='Reject request' reload={reload[ApproveRequestStatus.REJECTED]} setReload={onReload} />
        </div>
    )
}

export default ApproveRequestContainer