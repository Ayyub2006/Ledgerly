import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';

const CategoryFormDialog = ({ open, onClose, onSubmit, initialData, submitting }) => {
  const isEdit = Boolean(initialData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '' } });

  useEffect(() => {
    if (open) reset({ name: initialData?.name || '' });
  }, [open, initialData, reset]);

  const submit = (values) => onSubmit(values);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEdit ? 'Edit category' : 'Add category'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label="Category name"
              autoFocus
              fullWidth
              {...register('name', { required: 'Category name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Add category'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryFormDialog;
