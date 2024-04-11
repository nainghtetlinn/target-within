import { Stack } from '@mui/material'
import Form from './form'

const EditTargetPage = ({ params }: { params: { id: string } }) => {
  return (
    <section>
      <Stack alignItems='center'>
        <Form id={params.id} />
      </Stack>
    </section>
  )
}

export default EditTargetPage
