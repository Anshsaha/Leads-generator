import { Box, Button, Grid } from "@mui/material";
import NavBar from "./NavBar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getAllUsers } from "../services/User";
import CustomMenuOption from "../utils/CustomActionButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const iconStyle = {
  fontSize: "18px",
  marginRight: "6px",
};

export default function DataTable() {
  const menuIcons = [
    <EditIcon sx={iconStyle} />,
    <DeleteIcon sx={iconStyle} />,
  ];

  const options = ["Edit", "Delete"];
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleActions = (value: string, row: any) => {
    if (value === "Edit") navigate("/edit-user", { state: { row } });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 350 },
    { field: "email", headerName: "Email", width: 475 },
    { field: "user_role", headerName: "Role", width: 350 },
    {
      field: "ACTION",
      headerName: "Action",
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <Grid item xs={12}>
          <CustomMenuOption
            MenuOptions={options}
            menuIcons={menuIcons}
            selection={(val: string) => handleActions(val, params.row)}
          />
        </Grid>
      ),
    },
  ];

  const handleAddUser = () => {
    navigate("/add-user");
  };

  const getUsersList = async () => {
    const { data, error }: any = await getAllUsers();
    if (error) {
      toast.error(error);
    } else {
      setUsers(data);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <NavBar />
      <Button
        sx={{ float: "right", marginRight: 10, marginTop: 4 }}
        variant="contained"
        onClick={handleAddUser}
      >
        Add User
      </Button>
      <Box style={{ padding: 80, height: 730, width: "100%" }}>
        <DataGrid
          rows={users}
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
            border: 2,
            fontSize: 20,
          }}
        />
      </Box>
    </>
  );
}
