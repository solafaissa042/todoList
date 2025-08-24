import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function MySnackBar({ open, message }) {
  

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        message={message}
      />
    </div>
  );
}
