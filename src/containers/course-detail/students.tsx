import { courseStudents } from '@/services/course.service';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
function Row(props: { row: any }) {
    const { row } = props;

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {row._id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name ? row.name : '--'}
                </TableCell>
                <TableCell>{moment(row.createdAt).fromNow()}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const Students = ({ data }: { data: any }) => {
    const [students, setStudents] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                if (data._id) {
                    const rs: any[] = await courseStudents(data._id)
                    setStudents(rs)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        })()
    }, [data])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow className='font-bold'>
                            {/* <TableCell /> */}
                            <TableCell className='!font-bold'>Id</TableCell>
                            <TableCell className='!font-bold'>Name</TableCell>
                            <TableCell className='!font-bold'>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((user) => (
                            <Row key={user['_id']} row={user} />
                        ))}
                        {students.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    There is no students
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Students