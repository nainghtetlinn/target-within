'use client'

import { Stack, Container } from '@mui/material'

import CreateNewTargetButton from './components/CreateNewTargetButton'
import TargetItem from './components/TargetItem'

import { useAppSelector } from '@/lib/hook'

export default function Home() {
  const { targets } = useAppSelector(store => store.target)

  return (
    <section>
      <Container sx={{ pt: 2 }}>
        <Stack
          direction='column'
          gap={1}
        >
          {targets.map(target => (
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
