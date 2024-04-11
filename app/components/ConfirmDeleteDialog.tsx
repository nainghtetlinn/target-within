import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'

const ConfirmDeleteDialog = ({
  title,
  open,
  handleClose,
  handleDelete,
}: {
  title: string
  open: boolean
  handleClose: () => void
  handleDelete: () => void
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Do you want to delete target &quot;{title}&quot;
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDeleteDialog
