'use client'

import DeleteIcon from '@mui/icons-material/Delete'

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'

import { DateTimePicker } from '@mui/x-date-pickers'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { UpdateTargetType } from '@/types/target'

import { updateTarget } from '@/lib/features/target'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { updateTargetInputsSchema } from '@/validation/target'

const Form = ({ id }: { id?: string }) => {
  const router = useRouter()

  const { targets } = useAppSelector(store => store.target)
  const dispatch = useAppDispatch()

  const selectedTarget = targets.find(target => target.id === id)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTargetType>({
    resolver: zodResolver(updateTargetInputsSchema),
    defaultValues: selectedTarget,
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'tasks' })

  const handleUpdate = (e: UpdateTargetType) => {
    dispatch(updateTarget(e))
    router.push('/')
  }

  if (!selectedTarget) router.push('/')

  return (
    <Card sx={{ maxWidth: 400, mt: 2 }}>
      <CardContent>
        <Typography
          variant='h5'
          gutterBottom
        >
          Edit Target
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(handleUpdate)}
        >
          <TextField
            {...register('title')}
            label='Title'
            helperText={errors.title?.message}
            error={!!errors.title?.message}
          />

          <TextField
            {...register('description')}
            label='Description'
            multiline
            rows={3}
            helperText={errors.description?.message}
            error={!!errors.description?.message}
          />

          <Controller
            name='dueDate'
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label='Due Date'
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
                value={dayjs(field.value)}
                inputRef={field.ref}
                onChange={date => field.onChange(date)}
              />
            )}
          />

          {fields.map((field, i) => (
            <div key={field.id}>
              <FormControl
                variant='outlined'
                fullWidth
                margin='dense'
              >
                <InputLabel>Task {i + 1}</InputLabel>
                <OutlinedInput
                  {...register(`tasks.${i}.title` as const)}
                  label={`Task ${i + 1}`}
                  endAdornment={
                    <InputAdornment position='end'>
                      {fields.length > 1 && (
                        <IconButton
                          edge='end'
                          onClick={() => remove(i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          ))}

          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => append({ title: '' })}
          >
            Add Task
          </Button>

          <div className='flex items-center justify-end mt-4'>
            <Button
              type='submit'
              variant='contained'
            >
              Update
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Form
