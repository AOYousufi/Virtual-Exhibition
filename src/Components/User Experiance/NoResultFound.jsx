import React from "react";
import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { motion } from "framer-motion";

const NoResultsFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <SentimentDissatisfiedIcon style={{ fontSize: 60, color: "#ccc" }} />
      <Typography variant="h6" style={{ marginTop: "10px", color: "#555" }}>
        No artworks found.
      </Typography>
      <Typography variant="body1" style={{ marginTop: "5px", color: "#777" }}>
        Try a different search or adjust your filters.
      </Typography>
    </motion.div>
  );
};

export default NoResultsFound;
