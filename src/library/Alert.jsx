import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertTypes = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({
    severity: AlertTypes.SUCCESS,
    message: "This is a success Alert inside a Snackbar!",
  });

  const handleClick = (severity, message) => {
    setAlertProps({ severity, message });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() =>
          handleClick(
            AlertTypes.SUCCESS,
            "This is a success Alert inside a Snackbar!"
          )
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          handleClick(
            AlertTypes.ERROR,
            "This is an error Alert inside a Snackbar!"
          )
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          handleClick(
            AlertTypes.WARNING,
            "This is a warning Alert inside a Snackbar!"
          )
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          handleClick(
            AlertTypes.INFO,
            "This is an info Alert inside a Snackbar!"
          )
        }
      >
        Info
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertProps.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertProps.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
