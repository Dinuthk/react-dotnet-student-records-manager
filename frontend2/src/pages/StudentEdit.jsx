import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, TextField, Button, Divider } from "@mui/material";
import { Table, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getStudentById, updateStudent } from "../services/studentService";

const StudentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    telephone: "",
  });

  const fetchUsers = async () => {
    try {
      const data = await getStudentById(id);

      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString().slice(0, 10)
          : "",
      };

      setFormData(formattedData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    try {
      if (window.confirm("Are you sure you want to update this student?")) {
        await updateStudent(id, formData);
        alert("Student updated successfully!");
        navigate("/students");
        //console.log(`Edit student with ID: ${id}`);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" component="h1">
        Student Details Edit
      </Typography>
      <Divider sx={{ width: "100%", mb: 3, bgcolor: "#C3C3C3", mt: 2 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
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
              value={formData.dateOfBirth}
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
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentEdit;
