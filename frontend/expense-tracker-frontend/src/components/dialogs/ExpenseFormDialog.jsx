import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
} from '@mui/material';

const toInputDate = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  return String(value).slice(0, 10);
};

const ExpenseFormDialog = ({ open, onClose, onSubmit, initialData, categories = [], submitting }) => {
  const isEdit = Boolean(initialData);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '', amount: '', date: toInputDate(), categoryId: '', description: '' },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title || '',
        amount: initialData?.amount ?? '',
        date: toInputDate(initialData?.date),
        categoryId: initialData?.category?.id ?? initialData?.categoryId ?? '',
        description: initialData?.description || '',
      });
    }
  }, [open, initialData, reset]);

  const submit = (values) =>
    onSubmit({
      title: values.title,
      amount: Number(values.amount),
      date: values.date,
      categoryId: Number(values.categoryId),
      description: values.description,
    });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEdit ? 'Edit expense' : 'Add expense'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label="Title"
              autoFocus
              fullWidth
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                inputProps={{ step: '0.01', min: 0 }}
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be greater than 0' },
                })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register('date', { required: 'Date is required' })}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            </Stack>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Category"
                  fullWidth
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message || (categories.length === 0 ? 'Create a category first' : '')}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <TextField label="Notes" fullWidth multiline minRows={2} {...register('description')} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Add expense'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ExpenseFormDialog;
