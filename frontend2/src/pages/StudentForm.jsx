import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
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

const StudentForm = () => {
  const [students, setStudents] = useState([]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" component="h1">
        Student Registration
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2,mt: 4}}>
        {/* Full Name Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ width: "120px" }}>Full Name</Typography>
            <TextField variant="outlined" size="small" fullWidth />
        </Box>

        {/* Address Field */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ width: "120px" }}>Adress</Typography>
            <TextField variant="outlined" size="small" fullWidth />
        </Box>


        <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Date of Birth Field */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ width: "150px" }}>Date of Birth</Typography>
                <TextField
                type="date"
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
                />
            </Box>

            {/* Gender Field */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ width: "120px" }}>Gender</Typography>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </Box>
        </Box>
        
        {/* Email Field */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ width: '120px' }}>Email</Typography>
            <TextField
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="e.g. yourname@example.com"
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
            />
        </Box>

        <Button variant="contained">Add</Button>

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
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  );
};

export default StudentForm;
