import { useCallback, useEffect, useState } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from 'react-toastify';

import DataTable from '../../components/tables/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import IncomeFormDialog from '../../components/dialogs/IncomeFormDialog';
import * as incomeService from '../../services/incomeService';
import { formatCurrency, formatDate } from '../../utils/formatters';

let searchDebounce;

const IncomePage = () => {
  const [pageData, setPageData] = useState({ content: [], totalElements: 0 });
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadIncome = useCallback(async () => {
    setLoading(true);
    try {
      const data = search.trim()
        ? await incomeService.searchIncome({ keyword: search.trim(), page, size: rowsPerPage })
        : await incomeService.getIncomePage({ page, size: rowsPerPage, sortBy: 'date', direction: 'desc' });
      setPageData({ content: data?.content || [], totalElements: data?.totalElements || 0 });
    } catch {
      toast.error('Could not load income.');
    } finally {
      setLoading(false);
    }
  }, [search, page, rowsPerPage]);

  useEffect(() => {
    loadIncome();
  }, [loadIncome]);

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
        await incomeService.updateIncome(editing.id, values);
        toast.success('Income updated.');
      } else {
        await incomeService.createIncome(values);
        toast.success('Income added.');
      }
      setFormOpen(false);
      loadIncome();
    } catch {
      toast.error('Could not save income.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await incomeService.deleteIncome(deleting.id);
      toast.success('Income deleted.');
      setDeleting(null);
      loadIncome();
    } catch {
      toast.error('Could not delete income.');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Source' },
    { key: 'amount', label: 'Amount', render: (row) => <span className="amount">{formatCurrency(row.amount)}</span> },
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
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2.5 }}>
        Income
      </Typography>

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
        searchPlaceholder="Search income…"
        addLabel="Add income"
        onAdd={openAdd}
        emptyTitle="No income found"
        emptyDescription="Try a different search, or add a new income entry."
      />

      <IncomeFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
        submitting={submitting}
      />
      <ConfirmDialog
        open={!!deleting}
        title="Delete income?"
        description={`This will permanently delete "${deleting?.title}".`}
        confirmLabel="Delete"
        loading={submitting}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />
    </Box>
  );
};

export default IncomePage;
