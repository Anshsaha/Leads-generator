import { Box, Button } from "@mui/material";
import NavBar from "./NavBar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { relative } from "path";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 60,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 34 },
  { id: 6, lastName: "Melisandre", firstName: "David", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Roxie", firstName: "Stella", age: 29 },
  { id: 11, lastName: "Smith", firstName: "Harvey", age: 45 },
];

export default function DataTable() {
  return (
    <>
      <NavBar />
      <Button
        sx={{ float: "right", marginRight: 10, marginTop: 4 }}
        variant="contained"
      >
        Add User
      </Button>
      <Box style={{ padding: 80, height: 730, width: "100%" }}>
        <DataGrid
          rows={rows}
          showCellVerticalBorder
          columns={columns}
          showColumnVerticalBorder
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 1,
          }}
        />
      </Box>
    </>
  );
}
