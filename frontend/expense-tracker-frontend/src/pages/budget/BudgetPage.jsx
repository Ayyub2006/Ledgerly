import { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, Button, LinearProgress, Chip, Grid } from '@mui/material';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { toast } from 'react-toastify';

import StatCard from '../../components/cards/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import BudgetFormDialog from '../../components/dialogs/BudgetFormDialog';
import * as budgetService from '../../services/budgetService';
import * as dashboardService from '../../services/dashboardService';
import { formatCurrency, monthLabel } from '../../utils/formatters';

const BudgetPage = () => {
  const [budget, setBudget] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const [budgetRes, summaryRes] = await Promise.allSettled([
        budgetService.getCurrentMonthBudget(),
        dashboardService.getDashboardSummary(),
      ]);
      if (budgetRes.status === 'fulfilled') {
        setBudget(budgetRes.value);
      } else {
        setNotFound(true);
      }
      if (summaryRes.status === 'fulfilled') {
        setSummary(summaryRes.value);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const saved = await budgetService.setBudget(values);
      setBudget(saved);
      setNotFound(false);
      toast.success('Budget saved.');
      setFormOpen(false);
      load();
    } catch {
      toast.error('Could not save budget.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading budget…" minHeight={360} />;

  const spent = summary ? (summary.monthlyBudget || 0) - (summary.remainingBudget || 0) : 0;
  const pct = summary?.monthlyBudget ? Math.min(100, Math.round((spent / summary.monthlyBudget) * 100)) : 0;

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1.5} sx={{ mb: 2.5 }}>
        <Typography variant="h5" fontWeight={800}>
          Budget
        </Typography>
        <Button
          variant="contained"
          startIcon={budget ? <EditRoundedIcon /> : <SavingsRoundedIcon />}
          onClick={() => setFormOpen(true)}
        >
          {budget ? 'Update budget' : 'Set budget'}
        </Button>
      </Stack>

      {notFound && !budget ? (
        <Paper variant="outlined" sx={{ borderRadius: 3 }}>
          <EmptyState
            icon={SavingsRoundedIcon}
            title="No budget set for this month"
            description="Set a monthly budget to track how your spending measures up."
            actionLabel="Set budget"
            onAction={() => setFormOpen(true)}
          />
        </Paper>
      ) : (
        <>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={4}>
              <StatCard title="Monthly budget" value={formatCurrency(budget?.amount)} icon={SavingsRoundedIcon} color="secondary" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard title="Spent so far" value={formatCurrency(spent)} icon={SavingsRoundedIcon} color="error" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard title="Remaining" value={formatCurrency(summary?.remainingBudget)} icon={SavingsRoundedIcon} color="success" />
            </Grid>
          </Grid>

          <Paper variant="outlined" sx={{ p: 2.75, borderRadius: 3, mt: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                {monthLabel(budget?.month)} progress
              </Typography>
              {summary?.budgetExceeded && <Chip label="Over budget" color="error" size="small" />}
            </Stack>
            <LinearProgress
              variant="determinate"
              value={pct}
              color={summary?.budgetExceeded ? 'error' : 'primary'}
              sx={{ height: 12, borderRadius: 6 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              {pct}% of this month's budget used
            </Typography>
          </Paper>
        </>
      )}

      <BudgetFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={budget}
        submitting={submitting}
      />
    </Box>
  );
};

export default BudgetPage;
