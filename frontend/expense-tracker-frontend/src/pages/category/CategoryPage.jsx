import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, IconButton, Stack, Chip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from 'react-toastify';

import DataTable from '../../components/tables/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import CategoryFormDialog from '../../components/dialogs/CategoryFormDialog';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import * as categoryService from '../../services/categoryService';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data || []);
    } catch {
      toast.error('Could not load categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () => categories.filter((c) => c.name?.toLowerCase().includes(search.toLowerCase())),
    [categories, search]
  );

  useEffect(() => setPage(0), [search]);

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        await categoryService.updateCategory(editing.id, values);
        toast.success('Category updated.');
      } else {
        await categoryService.createCategory(values);
        toast.success('Category added.');
      }
      setFormOpen(false);
      load();
    } catch {
      toast.error('Could not save category.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await categoryService.deleteCategory(deleting.id);
      toast.success('Category deleted.');
      setDeleting(null);
      load();
    } catch {
      toast.error('Could not delete category. It may still have expenses linked to it.');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Category',
      render: (row) => (
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Chip label={row.name} size="small" color="primary" variant="outlined" />
        </Stack>
      ),
    },
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

  if (loading) return <LoadingSpinner label="Loading categories…" minHeight={360} />;

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2.5 }}>
        Categories
      </Typography>
      <DataTable
        columns={columns}
        rows={paged}
        page={page}
        totalCount={filtered.length}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(size) => {
          setRowsPerPage(size);
          setPage(0);
        }}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search categories…"
        addLabel="Add category"
        onAdd={openAdd}
        emptyTitle="No categories yet"
        emptyDescription="Categories help you organize expenses. Add your first one to get started."
      />

      <CategoryFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
        submitting={submitting}
      />
      <ConfirmDialog
        open={!!deleting}
        title="Delete category?"
        description={`This will permanently delete "${deleting?.name}". Expenses linked to it may be affected.`}
        confirmLabel="Delete"
        loading={submitting}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />
    </Box>
  );
};

export default CategoryPage;
