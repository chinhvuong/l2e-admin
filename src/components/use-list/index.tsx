import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { users } from '@/services/user.service';
import { USER_SORT } from '@/constants';
import moment from 'moment';
import Image from 'next/image';
import CustomPagination from '../pagination';
import Search from '../search';

function Row(props: { row: any }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row._id}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                    {row.name}
                </TableCell> */}
                <TableCell>{row.walletAddress}</TableCell>
                <TableCell>{row.courseCreated}</TableCell>
                <TableCell>{row.courseEnrolled}</TableCell>
                <TableCell>{moment(row.createdAt).fromNow()}</TableCell>
            </TableRow>


            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <div className='py-6'>
                            <div className="flex gap-6">
                                <Image
                                    src={row.avatar || '/default-avatar.png'}
                                    alt={'user avatar'}
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <h3 className="font-semibold">{row.name || 'No name'}</h3>
                                    <div><span className="font-bold">Title: </span>{row.title || 'Unset'}</div>
                                    <div> <span className="font-bold">Students:</span>{row.students || 0}</div>
                                    <div><span className="font-bold">Rating: </span>{row.rating || 0}</div>
                                </div>
                            </div>
                            <div className="py-4">
                                Bio: {row.bio || 'blank'}
                            </div>
                        </div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const sortUserOptions = [
    {
        value: USER_SORT.COURSE_CREATED_ASC,
        text: 'Course created increase'
    },
    {
        value: USER_SORT.COURSE_CREATED_DESC,
        text: 'Course created decrease'
    },
    {
        value: USER_SORT.COURSE_ENROLLED_ASC,
        text: 'Course enrolled increase'
    },
    {
        value: USER_SORT.COURSE_ENROLLED_DESC,
        text: 'Course enrolled decrease'
    },
    {
        value: USER_SORT.CREATED_AT_ASC,
        text: 'Created at increase'
    },
    {
        value: USER_SORT.CREATED_AT_DESC,
        text: 'Created at decrease'
    }
]
export default function UserList() {
    const [data, setData] = React.useState<{
        isLoading: boolean,
        total: number,
        page: number,
        limit: number,
        sort: string[],
        users: any[],
        query: string
    }>({
        isLoading: false,
        total: 0,
        page: 0,
        limit: 20,
        sort: [],
        users: [],
        query: ''
    })

    React.useEffect(() => {
        if (!data.isLoading) {
            (async () => {
                try {
                    setData({
                        ...data,
                        isLoading: true
                    })
                    const rs = await users({
                        page: data.page,
                        limit: data.limit,
                        sort: data.sort,
                        query: data.query ? data.query : undefined
                    })
                    console.log("🚀 ~ file: index.tsx:137 ~ rs", rs)
                    if (rs) {
                        setData({
                            ...data,
                            users: rs.data,
                            total: rs.total,
                            isLoading: false
                        })
                    }
                } catch (error) {

                }
            })()
        }
    }, [data.page, data.sort, data.query])

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

    const onChangePage = (page: number) => {
        console.log("🚀 ~ file: index.tsx:144 ~ onChangePage ~ page", page)
        setData({
            ...data, page
        })
    }
    return (
        <div className="pt-6">
            <h1 className='font-bold py-6 text-2xl'>Users</h1>
            <Search disabled={data.isLoading} onSearch={onSearch} sort={data.sort} onSort={onSort} sortOptions={sortUserOptions} />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow className='font-bold'>
                            <TableCell />
                            <TableCell className='!font-bold'>Id</TableCell>
                            {/* <TableCell className='!font-bold'>Name</TableCell> */}
                            <TableCell className='!font-bold'>Wallet Address</TableCell>
                            <TableCell className='!font-bold'>Course Created</TableCell>
                            <TableCell className='!font-bold'>Course enrolled</TableCell>
                            <TableCell className='!font-bold'>Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.users.map((user) => (
                            <Row key={user['_id']} row={user} />
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
