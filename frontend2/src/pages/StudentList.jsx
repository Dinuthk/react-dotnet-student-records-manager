import React, { useState, useEffect } from "react";
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
  Divider,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteStudent, getStudents } from "../services/studentService";
import { useNavigate } from "react-router-dom";
import MainForm from "../components/forms/MainForm";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  {
    /* Function to fetch student data */
  }
  const fetchUsers = async () => {
    const response = await getStudents();

    const formattedStudents = response.map((student) => ({
      ...student,
      dateOfBirth: new Date(student.dateOfBirth).toISOString().slice(0, 10),
    }));

    setStudents(formattedStudents);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  {
    /* Function to handle edit actions */
  }
  const handleEdit = (id) => {
    try {
      if (window.confirm("Are you sure you want to update this student?")) {
        navigate("/students/edit/" + id);
        console.log(`Edit student with ID: ${id}`);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  {
    /* Function to handle delete action */
  }
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this student?")) {
        await deleteStudent(id);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  {
    /* Function to handle search */
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const filteredStudents = students.filter((student) =>
    student.telephone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainForm>
      <Typography variant="h5" component="h1">
        Student List
      </Typography>
      <Divider sx={{ width: "100%", mb: 3, bgcolor: "#C3C3C3", mt: 2 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        <Typography sx={{ width: "120px" }}>Telephone</Typography>
        {/* Telephone Field With Search Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            maxWidth: 400,
            gap: 4,
          }}
        >
          <TextField
            type="tel"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="e.g. 0771234567"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        <Divider sx={{ width: "100%", bgcolor: "#C3C3C3",mb: -1 }} />
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fullName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.dateOfBirth}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.telephone}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(row.id)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No student data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainForm>
  );
};

export default StudentList;
