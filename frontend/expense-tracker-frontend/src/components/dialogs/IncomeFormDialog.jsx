import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';

const toInputDate = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  return String(value).slice(0, 10);
};

const IncomeFormDialog = ({ open, onClose, onSubmit, initialData, submitting }) => {
  const isEdit = Boolean(initialData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { title: '', amount: '', date: toInputDate(), description: '' } });

  useEffect(() => {
    if (open) {
      reset({
        title: initialData?.title || '',
        amount: initialData?.amount ?? '',
        date: toInputDate(initialData?.date),
        description: initialData?.description || '',
      });
    }
  }, [open, initialData, reset]);

  const submit = (values) =>
    onSubmit({
      title: values.title,
      amount: Number(values.amount),
      date: values.date,
      description: values.description,
    });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <DialogTitle sx={{ fontWeight: 700 }}>{isEdit ? 'Edit income' : 'Add income'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label="Source / Title"
              autoFocus
              fullWidth
              {...register('title', { required: 'Source is required' })}
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
            <TextField label="Notes" fullWidth multiline minRows={2} {...register('description')} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Add income'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default IncomeFormDialog;
