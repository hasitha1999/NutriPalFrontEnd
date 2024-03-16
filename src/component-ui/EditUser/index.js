import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LinearProgress from "@mui/material/LinearProgress";
import { editUser } from "../../use-cases/edit-user";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const errorMessages = {
  firstName: "",
  lastName: "",
};

const EditUser = ({ editingUser, setEditingUser, setTableRefreshFlag }) => {
  const [formErrorMessages, setFormErrorMessages] = React.useState({
    ...errorMessages,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setEditingUser(null);
    setFormErrorMessages({...errorMessages})
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // validations
    let isError = false;
    const errors = {...errorMessages}

    if (editingUser.firstName.trim() === "") {
      errors.firstName = "First Name is required";
      isError = true;
    }

    if (editingUser.lastName.trim() === "") {
      errors.lastName = "Last Name is required";
      isError = true;
    }

    if(isError) {
      setFormErrorMessages(errors);
      return;
    }

    setIsLoading(true);

    editUser(editingUser).then(() => {
      setTableRefreshFlag(prev => !prev)
    });
    setIsLoading(false);
  };

  const handleFormValueChange = (event) => {
    setFormErrorMessages((prev) => ({
      ...prev,
      [event.target.name]: "",
    }));

    setEditingUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Modal
      open={editingUser != null}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6">Edit User</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={editingUser?.firstName}
            onChange={handleFormValueChange}
            error={formErrorMessages.firstName !== ""}
            helperText={formErrorMessages.firstName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={editingUser?.lastName}
            onChange={handleFormValueChange}
            error={formErrorMessages.lastName !== ""}
            helperText={formErrorMessages.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={editingUser?.email}
            disabled
          />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              type="button"
              onClick={handleClose}
              variant="outlined"
              sx={{ mt: 3, mb: 1, mr: 1 }}
            >
              Close
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 1 }}>
              Save
            </Button>
          </Box>
        </Box>
        {isLoading && <LinearProgress />}
      </Box>
    </Modal>
  );
};

export default EditUser;
