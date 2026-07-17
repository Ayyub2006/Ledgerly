import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import { currentMonthString } from '../../utils/formatters';

const BudgetFormDialog = ({ open, onClose, onSubmit, initialData, submitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { amount: '', month: currentMonthString() } });

  useEffect(() => {
    if (open) {
      reset({
        amount: initialData?.amount ?? '',
        month: initialData?.month || currentMonthString(),
      });
    }
  }, [open, initialData, reset]);

  const submit = (values) => onSubmit({ amount: Number(values.amount), month: values.month });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <DialogTitle sx={{ fontWeight: 700 }}>Set monthly budget</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label="Month"
              type="month"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('month', { required: 'Month is required' })}
              error={!!errors.month}
              helperText={errors.month?.message}
            />
            <TextField
              label="Budget amount"
              type="number"
              fullWidth
              autoFocus
              inputProps={{ step: '0.01', min: 0 }}
              {...register('amount', {
                required: 'Amount is required',
                min: { value: 0, message: 'Amount cannot be negative' },
              })}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save budget'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BudgetFormDialog;
