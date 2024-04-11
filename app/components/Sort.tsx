'use client'

import SortIcon from '@mui/icons-material/Sort'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

import { Button, Menu, MenuItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const sortOptions = ['Title', 'Duration', 'Due time']

const Sort = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedSort = searchParams.get('sortBy')

  const onSelect = (value?: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (!value) {
      current.delete('sortBy')
    } else {
      current.set('sortBy', value)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return (
    <>
      <Button
        variant='outlined'
        startIcon={<SortIcon />}
        onClick={handleClick}
      >
        {selectedSort ? selectedSort : 'Sort'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => onSelect('')}>None</MenuItem>
        {sortOptions.map(o => (
          <MenuItem
            key={o}
            onClick={() => onSelect(o)}
          >
            <ListItemText>{o}</ListItemText>
            {selectedSort === o && <ArrowDownwardIcon sx={{ ml: 2 }} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Sort
