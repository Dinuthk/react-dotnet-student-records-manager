import React from "react";
import { Box } from "@mui/material";

const MainForm = ({ children }) => {
  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 900,
        mx: "auto",
        bgcolor: "#FFFFFF",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          bgcolor: "#F8F8F8",
          width: "90%",
          maxWidth: "1200px",
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 3,
          border: "2px solid #E4E4E4",
        }}
      >
        <Box sx={{ p: 3, mx: "auto", bgcolor: "#FFFFFF", minHeight: "100%", width: "96%" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainForm;
