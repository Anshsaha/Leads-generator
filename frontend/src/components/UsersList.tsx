import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import NavBar from "./NavBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { deleteUser, getAllUsers } from "../services/User";
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
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleActions = (value: string, row: any) => {
    if (value === "Edit") navigate("/edit-user", { state: { row } });
    else if (value === "Delete") handleDeleteUser(row.id);
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

  const handleDeleteUser = (userId: any) => {
    setDeleteUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const { data, error }: any = await deleteUser(deleteUserId);
    if (error) {
      toast.error(error);
    } else {
      setDeleteDialogOpen(false);
      toast.success(data);
      getUsersList();
    }
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
    setDeleteDialogOpen(false);
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
        sx={{
          float: "right",
          marginRight: 10,
          marginTop: 4,
          backgroundColor: "#4032AF",
          "&:hover": {
            backgroundColor: "#4032AF",
          },
        }}
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
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this user? This can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="primary"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
