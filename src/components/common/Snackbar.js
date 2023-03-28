import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function SnackbarComponent({
  message,
  open,
  setOpen,
  severity,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
      open={open}
      autoHideDuration={6000}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
