'use client'

import { useAppDispatch } from '@/lib/hook'
import { createTarget } from '@/lib/features/target'

export default function Home() {
  const dispatch = useAppDispatch()

  const createNewTarget = () => {
    dispatch(
      createTarget({
        target: {
          title: 'hello',
          startedDate: new Date(),
          dueDate: new Date(),
        },
        tasks: ['1', '2', '3'],
      })
    )
  }

  return (
    <section>
      Hello world
      <button onClick={createNewTarget}>Click</button>
    </section>
  )
}
