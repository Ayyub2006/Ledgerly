import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { toast } from 'react-toastify';

import StatCard from '../../components/cards/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ExpenseFormDialog from '../../components/dialogs/ExpenseFormDialog';
import IncomeFormDialog from '../../components/dialogs/IncomeFormDialog';
import CategoryFormDialog from '../../components/dialogs/CategoryFormDialog';

import * as dashboardService from '../../services/dashboardService';
import * as expenseService from '../../services/expenseService';
import * as incomeService from '../../services/incomeService';
import * as categoryService from '../../services/categoryService';
import { formatCurrency, formatDate } from '../../utils/formatters';

const PIE_COLORS = ['#0D9488', '#F59E0B', '#E11D48', '#6366F1', '#0EA5E9', '#84CC16', '#EC4899'];

const monthKey = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const buildMonthlySeries = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const key = monthKey(item.date);
    map.set(key, (map.get(key) || 0) + Number(item.amount || 0));
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .slice(-6)
    .map(([key, total]) => ({
      month: new Date(`${key}-01`).toLocaleDateString('en-IN', { month: 'short' }),
      total,
    }));
};

const buildCategorySeries = (expenses) => {
  const map = new Map();
  expenses.forEach((e) => {
    const name = e.category?.name || 'Uncategorized';
    map.set(name, (map.get(name) || 0) + Number(e.amount || 0));
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);
};

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [allExpenses, setAllExpenses] = useState([]);
  const [allIncomes, setAllIncomes] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [summaryRes, expensesRes, incomesRes, recentExpRes, recentIncRes, categoriesRes] = await Promise.all([
        dashboardService.getDashboardSummary(),
        expenseService.getAllExpenses(),
        incomeService.getAllIncomes(),
        expenseService.getExpensesPage({ page: 0, size: 5, sortBy: 'date', direction: 'desc' }),
        incomeService.getIncomePage({ page: 0, size: 5, sortBy: 'date', direction: 'desc' }),
        categoryService.getAllCategories(),
      ]);
      setSummary(summaryRes);
      setAllExpenses(expensesRes || []);
      setAllIncomes(incomesRes || []);
      setRecentExpenses(recentExpRes?.content || []);
      setRecentIncomes(recentIncRes?.content || []);
      setCategories(categoriesRes || []);
    } catch (err) {
      toast.error('Could not load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const expenseSeries = useMemo(() => buildMonthlySeries(allExpenses), [allExpenses]);
  const incomeSeries = useMemo(() => buildMonthlySeries(allIncomes), [allIncomes]);
  const categorySeries = useMemo(() => buildCategorySeries(allExpenses), [allExpenses]);

  const budgetPct = summary?.monthlyBudget
    ? Math.min(100, Math.round(((summary.monthlyBudget - summary.remainingBudget) / summary.monthlyBudget) * 100))
    : 0;

  const handleAddExpense = async (payload) => {
    setSubmitting(true);
    try {
      await expenseService.createExpense(payload);
      toast.success('Expense added.');
      setExpenseDialogOpen(false);
      loadAll();
    } catch {
      toast.error('Could not add expense.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddIncome = async (payload) => {
    setSubmitting(true);
    try {
      await incomeService.createIncome(payload);
      toast.success('Income added.');
      setIncomeDialogOpen(false);
      loadAll();
    } catch {
      toast.error('Could not add income.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddCategory = async (payload) => {
    setSubmitting(true);
    try {
      await categoryService.createCategory(payload);
      toast.success('Category added.');
      setCategoryDialogOpen(false);
      loadAll();
    } catch {
      toast.error('Could not add category.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading your dashboard…" minHeight={400} />;

  return (
    <Box>
      {/* Stat cards */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Total income" value={formatCurrency(summary?.totalIncome)} icon={TrendingUpRoundedIcon} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Total expense" value={formatCurrency(summary?.totalExpense)} icon={TrendingDownRoundedIcon} color="error" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Remaining balance" value={formatCurrency(summary?.remainingBalance)} icon={AccountBalanceWalletRoundedIcon} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard title="Monthly budget" value={formatCurrency(summary?.monthlyBudget)} icon={SavingsRoundedIcon} color="secondary" />
        </Grid>
      </Grid>

      {/* Budget progress + quick actions */}
      <Grid container spacing={2.5} sx={{ mt: 0.25 }}>
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 2.75, borderRadius: 3, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={700}>
                Budget utilization
              </Typography>
              {summary?.budgetExceeded && <Chip label="Over budget" color="error" size="small" />}
            </Stack>
            <LinearProgress
              variant="determinate"
              value={budgetPct}
              color={summary?.budgetExceeded ? 'error' : 'primary'}
              sx={{ height: 10, borderRadius: 6 }}
            />
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency((summary?.monthlyBudget || 0) - (summary?.remainingBudget || 0))} spent
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(summary?.remainingBudget)} remaining of {formatCurrency(summary?.monthlyBudget)}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 2.75, borderRadius: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              Quick actions
            </Typography>
            <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
              <Button size="small" variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setExpenseDialogOpen(true)}>
                Expense
              </Button>
              <Button size="small" variant="outlined" color="success" startIcon={<AddRoundedIcon />} onClick={() => setIncomeDialogOpen(true)}>
                Income
              </Button>
              <Button size="small" variant="outlined" startIcon={<AddRoundedIcon />} onClick={() => setCategoryDialogOpen(true)}>
                Category
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2.5} sx={{ mt: 0.25 }}>
        <Grid item xs={12} lg={4}>
          <Paper variant="outlined" sx={{ p: 2.75, borderRadius: 3, height: 320 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              Monthly expense
            </Typography>
            {expenseSeries.length === 0 ? (
              <EmptyState title="No expenses yet" description="Add an expense to see the trend." />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={expenseSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} width={40} />
                  <RTooltip formatter={(v) => formatCurrency(v)} />
                  <Bar dataKey="total" fill="#E11D48" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper variant="outlined" sx={{ p: 2.75, borderRadius: 3, height: 320 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              Monthly income
            </Typography>
            {incomeSeries.length === 0 ? (
              <EmptyState title="No income yet" description="Add income to see the trend." />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={incomeSeries}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} width={40} />
                  <RTooltip formatter={(v) => formatCurrency(v)} />
                  <Line type="monotone" dataKey="total" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper variant="outlined" sx={{ p: 2.75, borderRadius: 3, height: 320 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
              Category-wise expense
            </Typography>
            {categorySeries.length === 0 ? (
              <EmptyState title="No categories yet" description="Add a category and an expense to see the split." />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={categorySeries} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {categorySeries.map((entry, i) => (
                      <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <RTooltip formatter={(v) => formatCurrency(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Recent tables */}
      <Grid container spacing={2.5} sx={{ mt: 0.25, mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ p: 2.5, pb: 1.5 }}>
              Recent expenses
            </Typography>
            {recentExpenses.length === 0 ? (
              <EmptyState title="No expenses yet" description="Your recent expenses will show up here." />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentExpenses.map((e) => (
                    <TableRow key={e.id} hover>
                      <TableCell>{e.title}</TableCell>
                      <TableCell>
                        <Chip label={e.category?.name || 'Uncategorized'} size="small" />
                      </TableCell>
                      <TableCell>{formatDate(e.date)}</TableCell>
                      <TableCell align="right" className="amount">
                        {formatCurrency(e.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ p: 2.5, pb: 1.5 }}>
              Recent income
            </Typography>
            {recentIncomes.length === 0 ? (
              <EmptyState title="No income yet" description="Your recent income entries will show up here." />
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentIncomes.map((i) => (
                    <TableRow key={i.id} hover>
                      <TableCell>{i.title}</TableCell>
                      <TableCell>{formatDate(i.date)}</TableCell>
                      <TableCell align="right" className="amount">
                        {formatCurrency(i.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>

      <ExpenseFormDialog
        open={expenseDialogOpen}
        onClose={() => setExpenseDialogOpen(false)}
        onSubmit={handleAddExpense}
        categories={categories}
        submitting={submitting}
      />
      <IncomeFormDialog
        open={incomeDialogOpen}
        onClose={() => setIncomeDialogOpen(false)}
        onSubmit={handleAddIncome}
        submitting={submitting}
      />
      <CategoryFormDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        onSubmit={handleAddCategory}
        submitting={submitting}
      />
    </Box>
  );
};

export default Dashboard;
