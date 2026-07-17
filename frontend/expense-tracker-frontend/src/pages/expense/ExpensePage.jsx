import { useCallback, useEffect, useState } from 'react';
import { Box, Typography, IconButton, Stack, Chip, TextField, MenuItem } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from 'react-toastify';

import DataTable from '../../components/tables/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ExpenseFormDialog from '../../components/dialogs/ExpenseFormDialog';
import * as expenseService from '../../services/expenseService';
import * as categoryService from '../../services/categoryService';
import { formatCurrency, formatDate } from '../../utils/formatters';

let searchDebounce;

const ExpensePage = () => {
  const [pageData, setPageData] = useState({ content: [], totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data || []);
    } catch {
      /* non-fatal for this page */
    }
  }, []);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (search.trim()) {
        data = await expenseService.searchExpenses({ keyword: search.trim(), page, size: rowsPerPage });
      } else if (categoryFilter) {
        data = await expenseService.getExpensesByCategory(categoryFilter, { page, size: rowsPerPage });
      } else {
        data = await expenseService.getExpensesPage({ page, size: rowsPerPage, sortBy: 'date', direction: 'desc' });
      }
      setPageData({ content: data?.content || [], totalElements: data?.totalElements || 0 });
    } catch {
      toast.error('Could not load expenses.');
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, page, rowsPerPage]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      setPage(0);
      setSearch(value);
    }, 350);
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    setFormOpen(true);
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editing) {
        await expenseService.updateExpense(editing.id, values);
        toast.success('Expense updated.');
      } else {
        await expenseService.createExpense(values);
        toast.success('Expense added.');
      }
      setFormOpen(false);
      loadExpenses();
    } catch {
      toast.error('Could not save expense.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await expenseService.deleteExpense(deleting.id);
      toast.success('Expense deleted.');
      setDeleting(null);
      loadExpenses();
    } catch {
      toast.error('Could not delete expense.');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'amount', label: 'Amount', render: (row) => <span className="amount">{formatCurrency(row.amount)}</span> },
    { key: 'category', label: 'Category', render: (row) => <Chip label={row.category?.name || '—'} size="small" /> },
    { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
    { key: 'description', label: 'Notes', render: (row) => row.description || '—' },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (row) => (
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <IconButton size="small" onClick={() => openEdit(row)}>
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => setDeleting(row)}>
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1.5} sx={{ mb: 2.5 }}>
        <Typography variant="h5" fontWeight={800}>
          Expenses
        </Typography>
        <TextField
          select
          size="small"
          label="Filter by category"
          value={categoryFilter}
          onChange={(e) => {
            setPage(0);
            setCategoryFilter(e.target.value);
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <DataTable
        columns={columns}
        rows={pageData.content}
        loading={loading}
        page={page}
        totalCount={pageData.totalElements}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(size) => {
          setRowsPerPage(size);
          setPage(0);
        }}
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search expenses…"
        addLabel="Add expense"
        onAdd={openAdd}
        emptyTitle="No expenses found"
        emptyDescription="Try a different search or category, or add a new expense."
      />

      <ExpenseFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
        categories={categories}
        submitting={submitting}
      />
      <ConfirmDialog
        open={!!deleting}
        title="Delete expense?"
        description={`This will permanently delete "${deleting?.title}".`}
        confirmLabel="Delete"
        loading={submitting}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />
    </Box>
  );
};

export default ExpensePage;
