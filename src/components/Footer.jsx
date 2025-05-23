import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        textAlign: "center",
        backgroundColor: "black",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" color="white">
        © 2025 Your Library App
      </Typography>
    </Box>
  );
};

export default Footer;
