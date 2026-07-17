import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Stack,
  Button,
  Skeleton,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EmptyState from '../common/EmptyState';

/**
 * Reusable, server-paginated data table.
 *
 * columns: [{ key, label, align, render(row) }]
 * rows: current page's data
 * page: zero-based current page
 * totalCount: total number of rows across all pages
 * rowsPerPage: current page size
 * onPageChange(newPage), onRowsPerPageChange(newSize)
 * searchValue/onSearchChange: controlled search box (debounced by caller if desired)
 * addLabel/onAdd: optional "Add" button in the toolbar
 */
const DataTable = ({
  columns,
  rows,
  loading = false,
  page = 0,
  totalCount = 0,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  addLabel,
  onAdd,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search, or add a new entry to get started.',
}) => {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        {onSearchChange ? (
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ maxWidth: { sm: 320 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Box />
        )}
        {addLabel && onAdd && (
          <Button startIcon={<AddRoundedIcon />} variant="contained" onClick={onAdd} sx={{ whiteSpace: 'nowrap' }}>
            {addLabel}
          </Button>
        )}
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || 'left'}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              Array.from({ length: rowsPerPage }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading &&
              rows.map((row, idx) => (
                <TableRow key={row.id ?? idx} hover>
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align || 'left'}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {!loading && rows.length === 0 && (
          <EmptyState title={emptyTitle} description={emptyDescription} actionLabel={addLabel} onAction={onAdd} />
        )}
      </TableContainer>

      {onPageChange && !(!loading && rows.length === 0) && (
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value, 10))}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Paper>
  );
};

export default DataTable;
