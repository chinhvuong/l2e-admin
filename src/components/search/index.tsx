import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import useDebounce from '@/hooks/useDebounce';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
type Props = {
    onSearch: (query: string) => void
    onSort: (value: string[]) => void,
    sortOptions: { value: string, text: string }[]
    sort: string[],
    disabled: boolean
}
const Search = ({ onSearch, sort, sortOptions, onSort, disabled }: Props) => {

    const [query, setQuery] = useState('')

    const queryDebounce = useDebounce(query, 500)

    useEffect(() => {
        onSearch(queryDebounce)
    }, [queryDebounce])

    const search = (event: any) => {
        const value = event.target?.value
        setQuery(value)
    }
    // const [sort, setQuery] = useState('')
    const handleSort = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },

        } = event;
        onSort(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    const renderSortValue = (value: string[]) => {
        return value.map(item => {
            for (let i = 0; i < sortOptions.length; i++) {
                console.log(sortOptions[i]);
                if (sortOptions[i].value === item) {
                    return sortOptions[i].text
                }
            }
            return ''
        }).join(', ')
    }

    return (
        <div className='flex gap-8 mb-6'>
            <div className="flex grow px-4 py-0 rounded-md shadow-sm items-center bg-white opacity-90 h-16">
                <SearchIcon className='opacity-50' />
                <input className='grow border-0 outline-none px-4 opacity-80 text-lg' type="text" placeholder='Search...' onChange={search} />
            </div>
            <div className=" bg-white rounded-lg h-16 flex items-center justify-center">
                <FormControl sx={{ m: 1, width: 300 }} >
                    <InputLabel id="demo-multiple-checkbox-label">Sort</InputLabel>
                    <Select
                        size='medium'
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={sort}
                        onChange={handleSort}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={renderSortValue}
                        MenuProps={MenuProps}
                    >
                        {sortOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <Checkbox checked={sort.includes(option.value)} disabled={disabled} />
                                <ListItemText primary={option.text} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default Search