import { Pagination } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
type Props = {
    totalPage: number,
    onChange: (page: number) => void,
    page: number,
    disabled: boolean
}
const CustomPagination = ({ totalPage, onChange, page, disabled }: Props) => {
    const change = (event: React.ChangeEvent<unknown>, page: number) => {
        onChange(page - 1)
    }
    return (
        <Stack spacing={2}>
            <Pagination disabled={disabled} count={totalPage} page={page + 1} onChange={change} />
        </Stack>
    )
}

export default CustomPagination