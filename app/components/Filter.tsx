'use client'

import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const filterOptions = ['Completed', 'Incomplete', "Time's up"]

const Filter = () => {
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
  const selectedFilter = searchParams.get('filterBy')

  const onSelect = (value?: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (!value) {
      current.delete('filterBy')
    } else {
      current.set('filterBy', value)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return (
    <>
      <Button
        variant='outlined'
        startIcon={<FilterAltIcon />}
        onClick={handleClick}
      >
        {selectedFilter ? selectedFilter : 'Filter'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => onSelect('')}>All</MenuItem>
        {filterOptions.map(o => (
          <MenuItem
            key={o}
            onClick={() => onSelect(o)}
          >
            {o}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Filter
