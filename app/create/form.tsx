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

import type { NewTargetType } from '@/types/target'

import { createTarget } from '@/lib/features/target'
import { useAppDispatch } from '@/lib/hook'
import { newTargetInputsSchema } from '@/validation/target'

const Form = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTargetType>({
    resolver: zodResolver(newTargetInputsSchema),
    defaultValues: {
      tasks: [{ title: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'tasks' })

  const handleCreate = async (e: NewTargetType) => {
    if (dayjs(e.dueDate).diff(dayjs()) < 0) {
      console.log('Error')
      return
    }
    dispatch(createTarget(e))
    router.push('/')
  }

  return (
    <Card sx={{ maxWidth: 400, mt: 2 }}>
      <CardContent>
        <Typography
          variant='h5'
          gutterBottom
        >
          Create New Target
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(handleCreate)}
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
                      {i > 0 && (
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
              Create
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Form
