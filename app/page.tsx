'use client'

import { Stack, Container } from '@mui/material'

import CreateNewTargetButton from './components/CreateNewTargetButton'
import TargetItem from './components/TargetItem'

import { useAppSelector } from '@/lib/hook'

export default function Home() {
  const { tasks, targets } = useAppSelector(store => store.target)

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
              tasks={tasks.filter(task => task.targetId === target.id)}
            />
          ))}
        </Stack>
        <CreateNewTargetButton />
      </Container>
    </section>
  )
}
