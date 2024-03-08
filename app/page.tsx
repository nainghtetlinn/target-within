'use client'

import { Stack, Container } from '@mui/material'

import CreateNewTargetButton from './components/CreateNewTargetButton'
import TargetItem from './components/TargetItem'

import { useAppSelector } from '@/lib/hook'
import { useMemo } from 'react'
import moment from 'moment'

export default function Home() {
  const { targets } = useAppSelector(store => store.target)

  const sortedTargets = useMemo(
    () =>
      [...targets].sort((a, b) => moment(b.startedDate).diff(a.startedDate)),
    [targets]
  )

  return (
    <section>
      <Container sx={{ pt: 2 }}>
        <Stack
          direction='column'
          gap={1}
        >
          {sortedTargets.map(target => (
            <TargetItem
              key={target.id}
              target={target}
            />
          ))}
        </Stack>
        <CreateNewTargetButton />
      </Container>
    </section>
  )
}
