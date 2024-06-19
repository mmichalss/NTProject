import './Book_list-form.css';
import useBooks from './Book_data';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { GetBookDto } from '../../api/dto/book/book.dto';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useApi } from '../../api/ApiProvider';
import CreateLoan from './Create_loan';
import useGetMe from '../../users_page/getMe';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { enqueueSnackbar } from 'notistack';
import ErrorPage from '../../errors_and_snackbars/ErrorPage';
import MySnackbar from '../../errors_and_snackbars/Snackbar';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof GetBookDto;
  label: string;
  numeric: boolean;
}

const headCells = (t: TFunction): readonly HeadCell[] => {
  return [
    {
      id: 'isbn',
      numeric: false,
      disablePadding: true,
      label: t('bookPage.label.isbn'),
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: t('bookPage.label.title'),
    },
    {
      id: 'author',
      numeric: false,
      disablePadding: false,
      label: t('bookPage.label.author'),
    },
    {
      id: 'publisher',
      numeric: false,
      disablePadding: false,
      label: t('bookPage.label.publisher'),
    },
    {
      id: 'yearPublished',
      numeric: false,
      disablePadding: false,
      label: t('bookPage.label.yearPublished'),
    },
    {
      id: 'available',
      numeric: false,
      disablePadding: false,
      label: t('bookPage.label.available'),
    },
  ];
};

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof GetBookDto,
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const { t } = useTranslation();
  const apiClient = useApi();
  const userRole = apiClient.getUserRole();
  const createSortHandler =
    (property: keyof GetBookDto) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {userRole === 'ROLE_READER' || userRole === 'ROLE_ADMIN' ? (
          <TableCell align="left" padding="normal">
            {t('bookPage.label.borrow')}
          </TableCell>
        ) : (
          <TableCell align="left" padding="normal" />
        )}
        {headCells(t).map((headCell: HeadCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly number[];
  userId: number | undefined;
  updateBooks: any;
}

function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps & { updateBooks: () => void },
) {
  const { numSelected, selected, userId, updateBooks } = props;
  const { t } = useTranslation();
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {t('bookPage.label.selected')}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Borrow">
          <CreateLoan
            selected={selected}
            userId={userId}
            onUpdate={updateBooks}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
function BookList() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof GetBookDto>('title');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const apiClient = useApi();
  const userRole = apiClient.getUserRole();
  const userId = useGetMe()?.id;

  const { t } = useTranslation();

  const { rows, fetchBooks } = useBooks();

  const updateBooks = () => {
    fetchBooks();
  };

  React.useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const visibleRows = React.useMemo(() => {
    if (rows === undefined) {
      return [];
    } else {
      return stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
    }
  }, [order, orderBy, page, rowsPerPage, rows]);

  if (rows === undefined) {
    return <ErrorPage errorName={t('errors.booksNotFound')} />;
  } else {
    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof GetBookDto,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleClick = (
      event: React.MouseEvent<unknown>,
      id: number,
      available: string,
    ) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly number[] = [];

      if (available === 'true') {
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
      }
      setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_READER') && (
            <EnhancedTableToolbar
              numSelected={selected.length}
              selected={selected}
              userId={userId}
              updateBooks={updateBooks}
            />
          )}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover={row.available === 'true'}
                      onClick={
                        userRole !== 'ROLE_ADMIN' && userRole !== 'ROLE_READER'
                          ? undefined
                          : (event) => handleClick(event, row.id, row.available)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        {row.available === 'true' &&
                        (userRole === 'ROLE_READER' ||
                          userRole === 'ROLE_ADMIN') ? (
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.isbn}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.author}</TableCell>
                      <TableCell align="left">{row.publisher}</TableCell>
                      <TableCell align="left">{row.yearPublished}</TableCell>
                      <TableCell align="left">{row.available}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label={t('bookPage.label.densePadding')}
        />
      </Box>
    );
  }
}

export default BookList;
