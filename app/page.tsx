import { Container } from '@mui/material'
import { Suspense } from 'react'

import CreateNewTargetButton from './components/CreateNewTargetButton'
import Filter from './components/Filter'
import Sort from './components/Sort'
import TargetList from './components/target/TargetList'
import TargetSkeletonList from './components/target/TargetSkeletonList'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <section className='min-h-screen'>
      <Container sx={{ pt: 2 }}>
        <div className='flex items-center justify-between mb-4 gap-2'>
          <Sort />
          <Filter />
        </div>
        <Suspense fallback={<TargetSkeletonList />}>
          <TargetList />
        </Suspense>
        <div className='h-20'></div>
      </Container>
      <CreateNewTargetButton />
    </section>
  )
}
