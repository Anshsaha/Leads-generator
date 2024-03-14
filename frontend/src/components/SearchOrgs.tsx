import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import { searchOrgs } from "../services/searchorgs";
import { toast } from "react-toastify";

const SearchOrgs = () => {
  const fields = [
    "Sales",
    "Marketing",
    "AI",
    "ML",
    "Data Science",
    "Fintech",
    "Legal",
    "Real Estate",
    "Social Media Marketing",
  ];

  const locations = [
    "USA",
    "Germany",
    "France",
    "Canada",
    "India",
    "Europe",
    "London",
    "New York",
    "Australia",
  ];

  const [industries, setIndustries] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [employeeFromSize, setEmployeeFromSize] = useState("");
  const [employeeToSize, setEmployeeToSize] = useState("");

  const handleSearchOrgs = async () => {
    const payload = {
      data: {
        industries: industries,
        locations: location,
        employee_size_from: parseInt(employeeFromSize),
        employee_size_to: parseInt(employeeToSize),
      },
    };

    const { data, error }: any = await searchOrgs(payload);
    if (error) {
      toast.error(error);
    } else {
      toast.success("You will get the results shortly.");
      setIndustries([]);
      setLocation([]);
      setEmployeeFromSize("");
      setEmployeeToSize("");
    }
  };

  return (
    <>
      <NavBar />
      <Typography variant="h3" fontWeight="600" padding={4}>
        Search Organizations
      </Typography>
      <Box paddingX={15} marginTop={2}>
        <Typography variant="h6" marginBottom={2}>
          Choose the Organization industries you're interested in:
        </Typography>
        <Autocomplete
          multiple
          value={industries}
          options={fields}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Industries" required />
          )}
          sx={{
            marginBottom: 4,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4032AF",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4032AF",
            },
          }}
          onChange={(event, selectedOptions) => setIndustries(selectedOptions)}
        />
        <Typography variant="h6" marginBottom={2}>
          Choose the location of the required organizations:
        </Typography>
        <Autocomplete
          multiple
          value={location}
          options={locations}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Locations" required />
          )}
          sx={{
            marginBottom: 4,
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4032AF",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4032AF",
            },
          }}
          onChange={(event, selectedOptions) => setLocation(selectedOptions)}
        />
        <Stack direction="row">
          <Typography variant="h6" marginBottom={2}>
            Choose the employee size of the organizations:
          </Typography>
          <Typography marginTop={0.6} marginLeft={0.7} color="grey">
            (optional)
          </Typography>
        </Stack>
        <Stack direction="row" spacing={4}>
          <TextField
            label="From"
            value={employeeFromSize}
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4032AF",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#4032AF",
                },
            }}
            onChange={(f) => setEmployeeFromSize(f.target.value)}
          />
          <TextField
            label="To"
            value={employeeToSize}
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4032AF",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#4032AF",
                },
            }}
            onChange={(t) => setEmployeeToSize(t.target.value)}
          />
        </Stack>
        <Button
          variant="contained"
          size="large"
          sx={{
            float: "right",
            marginTop: 2,
            backgroundColor: "#4032AF",
            "&:hover": {
              backgroundColor: "#4032AF",
            },
          }}
          onClick={handleSearchOrgs}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default SearchOrgs;
