'use client'

import { Grid } from '@mui/material'

import TargetItem from './TargetItem'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import moment from 'moment'

import { useAppSelector } from '@/lib/hook'

const TargetList = () => {
  const { targets } = useAppSelector(store => store.target)

  const searchParams = useSearchParams()
  const filterType = searchParams.get('filterBy')
  const sortType = searchParams.get('sortBy')

  const filteredTargets = useMemo(() => {
    if (filterType === 'Completed')
      return targets.filter(
        target => target.completedTasks === target.totalTasks
      )
    else if (filterType === 'Incomplete')
      return targets.filter(
        target => target.completedTasks !== target.totalTasks
      )
    else if (filterType === "Time's up")
      return targets.filter(target => {
        const end = moment(target.dueDate)
        const now = moment()
        const diff = now.diff(end)
        return diff > 0
      })

    return targets
  }, [targets, filterType])

  const sortedTargets = useMemo(() => {
    if (sortType === 'Title')
      return [...filteredTargets].sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        return 0
      })
    else if (sortType === 'Duration')
      return [...filteredTargets].sort((a, b) => {
        const aDuration = moment(a.dueDate).diff(moment(a.startedDate))
        const bDuration = moment(b.dueDate).diff(moment(b.startedDate))
        if (aDuration > bDuration) return 1
        if (aDuration < bDuration) return -1
        return 0
      })
    else if (sortType === 'Due time')
      return [...filteredTargets].sort((a, b) => {
        const diff = moment(a.dueDate).diff(moment(b.dueDate))
        if (diff > 0) return 1
        if (diff < 0) return -1
        return 0
      })

    return [...filteredTargets].sort((a, b) => {
      const diff = moment(a.startedDate).diff(moment(b.startedDate))
      if (diff > 0) return -1
      if (diff < 0) return 1
      return 0
    })
  }, [filteredTargets, sortType])

  return (
    <>
      <Grid
        container
        columns={{ xs: 1, md: 2 }}
        columnSpacing={{ md: 2 }}
        rowSpacing={{ xs: 2 }}
      >
        {sortedTargets.map(target => (
          <Grid
            item
            xs={1}
            key={target.id}
          >
            <TargetItem target={target} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default TargetList
