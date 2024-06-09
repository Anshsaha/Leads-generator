import { Box } from "@mui/material";
import NavBar from "./NavBar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getResult } from "../services/results";
import { useLocation } from "react-router-dom";

let keyword = "";
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Organization Name",
    width: 220,
  },
  {
    field: "website_url",
    headerName: "Website",
    width: 250,
  },
  {
    field: "linkedin_url",
    headerName: "Linkedin URL",
    width: 300,
  },
  {
    field: "twitter_url",
    headerName: "Twitter URL",
    width: 300,
  },
  {
    field: "founded_year",
    headerName: "Founded In",
    width: 120,
  },
  {
    field: "location",
    headerName: "Location",
    width: 300,
  },
];

const ResultData = () => {
  const [result, setResult] = useState([]);
  const location = useLocation();
  console.log(location.state);
  const getResultData = async () => {
    if (location?.pathname?.includes("org-results")) {
      keyword = "organization";
    } else {
      keyword = "leads";
    }
    const { data, error }: any = await getResult(keyword, location?.state?.id);
    if (error) {
      toast.error(error);
    } else {
      setResult(data);
    }
  };

  useEffect(() => {
    getResultData();
  }, []);

  return (
    <>
      <NavBar />
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={result}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default ResultData;
