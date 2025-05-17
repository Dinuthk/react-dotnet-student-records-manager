import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const StudentList = () => {
  //const [students, setStudents] = useState([]);
  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "0771234567",
      dob: "2000-05-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "0719876543",
      dob: "1999-11-22",
    },
    {
      id: 3,
      name: "Charlie Perera",
      email: "charlie@example.com",
      phone: "0754567890",
      dob: "2001-03-10",
    },
  ];
  {
    /* Function to handle edit actions */
  }
  const handleEdit = (id) => {
    console.log(`Edit student with ID: ${id}`);
  };
  {
    /* Function to handle delete action */
  }
  const handleDelete = (id) => {
    console.log(`Delete student with ID: ${id}`);
  };

  return (
     <Box sx={{ p: 3, maxWidth: 800, mx: 'auto'}}>
      <Typography variant="h5" component="h1">
        Student List
      </Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2,mt: 4}}>
        <Typography sx={{ width: "120px" }}>Telephone</Typography>

        {/* Telephone Field With Search Button */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
            type="tel"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="e.g. 0771234567"
            />
            <Button variant="contained">Search</Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Date of Birth</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Telephone</TableCell>
                <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {students.map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.dob}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.dob}</TableCell>
                    <TableCell align="right">
                    <IconButton
                        color="primary"
                        onClick={() => handleEdit(row.id)}
                    >
                        {" "}
                        <EditOutlinedIcon />{" "}
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => handleDelete(row.id)}
                    >
                        {" "}
                        <DeleteOutlineIcon />{" "}
                    </IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
      </Box>
      
    </Box>
  );
};

export default StudentList;
