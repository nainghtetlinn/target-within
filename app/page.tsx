'use client'

import CreateNewTargetButton from './components/CreateNewTargetButton'

import { useAppDispatch, useAppSelector } from '@/lib/hook'
import {
  createTarget,
  toggleIsCompleteTask,
  updateTargetState,
} from '@/lib/features/target'

export default function Home() {
  const dispatch = useAppDispatch()
  const { tasks, targets } = useAppSelector(store => store.target)

  const createNewTarget = () => {
    dispatch(
      createTarget({
        target: {
          title: 'hello',
          startedDate: new Date(),
          dueDate: new Date(),
        },
        tasks: ['1', '2'],
      })
    )
  }

  const updateIsCompleteTaskFn = () => {
    dispatch(
      toggleIsCompleteTask({
        taskId: tasks[0].id,
      })
    )
    dispatch(updateTargetState())
  }

  return (
    <section>
      <CreateNewTargetButton />
    </section>
  )
}
