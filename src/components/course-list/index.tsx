import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { COURSE_SORT, USER_SORT } from '@/constants';
import moment from 'moment';
import Image from 'next/image';
import CustomPagination from '../pagination';
import { courses } from '@/services/course.service';
import Search from '../search';
import Link from 'next/link';

function Row(props: { row: any }) {
    const { row } = props;
    // const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow component={Link} href={'courses/' + row._id} sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell component="th" scope="row">
                    {row._id}
                </TableCell>
                <TableCell>{row.courseId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.students}</TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.price} USDT</TableCell>
                <TableCell>{row.approved ? (
                    <div className='bg-blue-200 py-2 px-4 rounded-lg text-center'>
                        Approved
                    </div>
                ) : (
                    <div className='bg-red-100 py-2 px-4 rounded-lg text-center'>
                        Unapproved yet
                    </div>
                )}</TableCell>
                <TableCell>{moment(row.createdAt).fromNow()}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const sortCourseOptions = [
    {
        value: COURSE_SORT.PRICE_ASC,
        text: 'Price increase'
    },
    {
        value: COURSE_SORT.PRICE_DESC,
        text: 'Price decrease'
    },
    {
        value: COURSE_SORT.RATING_ASC,
        text: 'Rating increase'
    },
    {
        value: COURSE_SORT.RATING_DESC,
        text: 'Rating decrease'
    },

    {
        value: COURSE_SORT.STUDENT_ASC,
        text: 'Student increase'
    },
    {
        value: COURSE_SORT.STUDENT_DESC,
        text: 'Student decrease'
    },
]

export default function CourseList() {
    const [data, setData] = React.useState<{
        isLoading: boolean,
        total: number,
        page: number,
        limit: number,
        sort: string[],
        courses: any[],
        query: string
    }>({
        isLoading: false,
        total: 0,
        page: 0,
        limit: 20,
        sort: [],
        courses: [],
        query: ''
    })

    React.useEffect(() => {
        if (!data.isLoading) {
            (async () => {
                setData({
                    ...data,
                    isLoading: true
                })
                try {
                    const rs = await courses({
                        page: data.page,
                        limit: data.limit,
                        sort: data.sort,
                        query: data.query ? data.query : undefined
                    })
                    if (rs) {
                        setData({
                            ...data,
                            courses: rs.data,
                            total: rs.total,
                            isLoading: false
                        })
                    }
                } catch (error) {

                }
            })()
        }
    }, [data.page, data.sort, data.query])
    const onChangePage = (page: number) => {
        console.log("🚀 ~ file: index.tsx:144 ~ onChangePage ~ page", page)
        setData({
            ...data, page
        })
    }

    const onSearch = (query: string) => {
        if (query !== data.query) {
            setData({ ...data, query: query })
        }

    }
    const onSort = (value: string[]) => {
        if (!data.isLoading) {
            setData({ ...data, sort: value })
        }
    }

    return (
        <div className="pt-6">
            <h1 className='font-bold py-6 text-2xl'>Courses</h1>

            <Search disabled={data.isLoading} onSearch={onSearch} sort={data.sort} onSort={onSort} sortOptions={sortCourseOptions} />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow className='font-bold'>
                            {/* <TableCell /> */}
                            <TableCell className='!font-bold'>Id</TableCell>
                            {/* <TableCell className='!font-bold'>Name</TableCell> */}
                            <TableCell className='!font-bold'>CourseId</TableCell>
                            <TableCell className='!font-bold'>Name</TableCell>
                            <TableCell className='!font-bold'>Student</TableCell>
                            <TableCell className='!font-bold'>Ratting</TableCell>
                            <TableCell className='!font-bold'>Price</TableCell>
                            <TableCell className='!font-bold'>Approve status</TableCell>
                            <TableCell className='!font-bold'>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.courses.map((course) => (
                            <Row key={course['_id']} row={course} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="flex justify-end pt-6">
                <CustomPagination
                    disabled={data.isLoading}
                    totalPage={Math.ceil(data.total / data.limit)}
                    page={data.page}
                    onChange={onChangePage}
                />
            </div>
        </div>
    );
}
