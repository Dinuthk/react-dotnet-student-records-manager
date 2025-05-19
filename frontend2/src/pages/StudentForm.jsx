import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Divider } from "@mui/material";
import {
  Table,
  Radio,
  RadioGroup,
  FormControlLabel,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { createStudent, getStudents } from "../services/studentService";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    telephone: "",
  });
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
    /* Function to create Student */
  }
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await createStudent(formData);
      console.log("Student created:", response);
      alert("Student created successfully!");
      setFormData({
        fullName: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        telephone: "",
      });
    } catch (error) {
      alert("Please fill required fields", error);
      console.error("Error creating student:", error);
    }
    fetchUsers();
  };

  {
    /* Function to handle form submission */
  }
  const handleSubmit = () => {
    alert("Form submitted!");
    console.log("Submitted students:", students);
    navigate("/students");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", bgcolor: "#FFFFFF",minHeight: "100%" }}>
      <Typography variant="h5" component="h1">
        Student Registration
      </Typography>

      <Divider sx={{ width: "100%", mb: 3, bgcolor: "#C3C3C3", mt: 2 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
          padding: 2,
        }}
      >
        {/* Full Name Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ width: "120px" }}>Full Name</Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Box>

        {/* Address Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ width: "120px" }}>Adress</Typography>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Date of Birth Field */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ width: "150px" }}>Date of Birth</Typography>
            <TextField
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="dateOfBirth"
              onChange={handleChange}
            />
          </Box>

          {/* Gender Field */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ width: "120px" }}>Gender</Typography>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="female"
              />
              <FormControlLabel value="male" control={<Radio />} label="male" />
            </RadioGroup>
          </Box>
        </Box>

        {/* Email Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ width: "120px" }}>Email</Typography>
          <TextField
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="e.g. yourname@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>

        {/* Telephone Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ width: "120px" }}>Telephone</Typography>
          <TextField
            type="tel"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="e.g. 0771234567"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={addStudent}>
            Add
          </Button>
        </Box>
        <Divider sx={{ width: "100%", mb: 3, bgcolor: "#C3C3C3", mt: -1,mb:-1 }} />
        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Date of Birth</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Telephone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(students || []).map((row) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentForm;
