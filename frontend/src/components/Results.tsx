import { toast } from "react-toastify";
import { getResults } from "../services/results";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { Box, Chip, List, Tab, Tabs, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React from "react";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "industries",
    headerName: "Industries",
    width: 250,
  },
  {
    field: "locations",
    headerName: "Locations",
    width: 250,
  },
  {
    field: "employee_range",
    headerName: "Employee Range",
    // type: "number",
    width: 200,
  },
  {
    field: "created_at",
    headerName: "Date & Time",
    width: 420,
    valueGetter: (params: GridValueGetterParams) => {
      const createdAt = new Date(params.value as string);
      return createdAt.toString();
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params: GridCellParams) => {
      const status = params.row.status as string;
      let chipColor = "";
      let textColor = "#000000";
      if (status === "In Progress") {
        chipColor = "#FFF000";
      } else if (status === "Completed") {
        chipColor = "#65E700";
      } else {
        chipColor = "#EA0000";
        textColor = "#FFFFFF";
      }
      return (
        <Chip
          label={status}
          style={{ backgroundColor: chipColor, color: textColor }}
        />
      );
    },
  },
];

const leadsColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "designations",
    headerName: "Designations",
    width: 200,
  },
  ...columns.slice(1),
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Results = () => {
  const [results, setResults] = useState([]);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleCellClick = (params: any) => {
    navigate("/org-results", { state: params.row });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      getResultsList("organization");
    } else if (newValue === 1) {
      getResultsList("leads");
    }
    setValue(newValue);
  };

  const getResultsList = async (keyword: any) => {
    const { data, error }: any = await getResults(keyword);
    if (error) {
      toast.error(error);
    } else {
      setResults(data);
    }
  };

  useEffect(() => {
    getResultsList("organization");
  }, []);

  return (
    <>
      <NavBar />
      <Box sx={{ height: 400, width: "100%", padding: 3 }}>
        <Typography variant="h3" fontWeight="600" marginBottom={2}>
          Results
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Typography sx={{ color: "#4032AF" }}>Organizations</Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={<Typography sx={{ color: "#4032AF" }}>Leads</Typography>}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DataGrid
            rows={results}
            columns={columns}
            getRowHeight={() => "auto"}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            onRowClick={handleCellClick}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DataGrid
            rows={results}
            columns={leadsColumns}
            getRowHeight={() => "auto"}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Results;
