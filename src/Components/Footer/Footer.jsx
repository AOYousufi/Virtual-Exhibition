import React from "react";
import { Box, Typography } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <div className="footer-container">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} My Art Platform. All rights reserved.
        </Typography>
      </div>
    </Box>
  );
};

export default Footer;
