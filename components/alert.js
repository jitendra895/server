import React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const MyAlert = ({
  success,
  setSuccess,
  error,
  setError,
  deleteSuccess,
  setDeleteSuccess,
  deleteError,
  setDeleteError,
  uploaded,
  setUploaded,
  uploadError,
  setUploadError,
  deleted,
  setDeleted,
  deletedError,
  setDeletedError,
}) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={success}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Question uploaded successfully!
          </Alert>
        </Collapse>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={error}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Question not uploaded.
          </Alert>
        </Collapse>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={deleteSuccess}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Question deleted.
          </Alert>
        </Collapse>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={deleteError}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Question not deleted.
          </Alert>
        </Collapse>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={uploaded}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUploaded(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Upload operation successful!
          </Alert>
        </Collapse>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={uploadError}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUploadError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Something went wrong. Please try again!
          </Alert>
        </Collapse>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={deleted}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleted(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
           Delete operation successful!
          </Alert>
        </Collapse>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse in={deletedError}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeletedError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Something went wrong. Please try again!
          </Alert>
        </Collapse>
      </div>
    </>
  );
};

export default MyAlert;
