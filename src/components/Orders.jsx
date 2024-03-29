import { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    history: [
      {
        date: "1",
        customerId: "Rasgulla",
        amount: 3,
      },
      {
        date: "2",
        customerId: "Thekua",
        amount: 1,
      },
      {
        date: "3",
        customerId: "Jalebi",
        amount: 1,
      },
    ],
  };
}

const rows = [
  createData(
    "495528723148919435",
    "08/02/2022 18:32:30",
    "Dhirtarashtra Vaikar",
    "43"
  ),
  createData("129836253071910764", "23/03/2022 22:37:19", "Din Tipanis", "49"),
  createData(
    "996776682575304811",
    "27/01/2022 01:16:59",
    "Venkata Bajpai",
    "60"
  ),
  createData(
    "723969113024360033",
    "17/02/2022 20:10:59",
    "Patanjali Sinha",
    "40"
  ),
  createData(
    "889863078320501822",
    "08/04/2022 16:56:22",
    "Mishri Pandey",
    "39"
  ),
  createData(
    "872714007279415048",
    "24/04/2022 12:29:08",
    "Har Khamavant",
    "39"
  ),
  createData(
    "568666228725466584",
    "03/01/2022 13:58:14",
    "Motilal Ashtikar",
    "39"
  ),
  createData(
    "893045694738381949",
    "13/01/2022 11:56:29",
    "Prashant Poddar",
    "39"
  ),
  createData("568458634919272746", "26/02/2022 14:37:59", "Gopal Thakre", "39"),
  createData("595887586732041718", "31/01/2022 06:59:29", "Dasra Kamath", "39"),
  createData(
    "144595254382780427",
    "24/01/2022 23:28:51",
    "Saurandhri Gayakvad",
    "39"
  ),
  createData(
    "761304011979809152",
    "28/03/2022 07:00:27",
    "Muskaanb Adwani",
    "39"
  ),
  createData(
    "664491657382919716",
    "06/04/2022 00:56:49",
    "Amandara Jadhav",
    "65"
  ),
  createData(
    "495211325542570687",
    "30/01/2022 07:24:43",
    "Praanvi Devadhikar",
    "43"
  ),
  createData(
    "530006279466477224",
    "14/02/2022 14:51:39",
    "Mataji Phadanis",
    "00"
  ),
  createData(
    "734568620862110411",
    "17/03/2022 23:43:53",
    "Versha Chetti",
    "70"
  ),
  createData(
    "527006993012305783",
    "16/03/2022 09:25:08",
    "Chamunda Heravdakar",
    "40"
  ),
  createData(
    "450481448730825708",
    "19/04/2022 01:59:22",
    "Akshara Roychaudhuri",
    "20"
  ),
  createData("834178900568641603", "08/04/2022 14:55:24", "Ujali Haldar", "30"),
  createData(
    "065842103795413318",
    "04/02/2022 19:16:10",
    "Saryu Chaudhari",
    "40"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "OrderId",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Ordered on",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "Price",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    rowsOpenCount,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" style={{ width: "75px" }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all orders",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sx={{ borderLeft: 1, borderColor: "divider" }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {rowsOpenCount === 0 ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} orders selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Recieved orders
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Mark as done">
          <IconButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function Row(props) {
  const {
    row,
    clickEvent,
    isSel,
    labelId,
    incrRowsOpenCount,
    decrRowsOpenCount,
  } = props;
  const [open, setStateOpen] = useState(false);
  const setOpen = (bool) => {
    setStateOpen(bool);
    if (bool) {
      incrRowsOpenCount();
    } else {
      decrRowsOpenCount();
    }
  };
  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isSel}
        tabIndex={-1}
        key={row.name}
        selected={isSel}
      >
        <TableCell sx={{ display: "flex" }} padding="checkbox">
          <Checkbox
            color="primary"
            onClick={clickEvent}
            checked={isSel}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />

          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Tooltip title="Close all rows to use sorting and pagination.">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 14l5-5 5 5z" />
                </svg>
              </Tooltip>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10l5 5 5-5z" />
              </svg>
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr No.</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Amount (kg)</TableCell>
                    <TableCell align="right">Total price (₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(
                          historyRow.amount * (Math.random() + 0.4) * 100
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Orders() {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsOpenCount, setRowsOpenCount] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%", height: "80%", padding: "0" }}>
      <Paper sx={{ width: "100%", mb: 2, mt: -3, height: "100%" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 800, height: "80%" }}
            aria-labelledby="tableTitle"
            size={"small"}
            stickyHeader
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rowsOpenCount={rowsOpenCount}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row
                      key={index}
                      row={row}
                      clickEvent={(event) => handleClick(event, row.name)}
                      isSel={isItemSelected}
                      labelId={labelId}
                      incrRowsOpenCount={() => {
                        setRowsOpenCount(rowsOpenCount + 1);
                      }}
                      decrRowsOpenCount={() => {
                        setRowsOpenCount(rowsOpenCount - 1);
                      }}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {rowsOpenCount === 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}
