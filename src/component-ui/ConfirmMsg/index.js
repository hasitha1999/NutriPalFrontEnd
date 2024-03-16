import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { getUserDetails } from "../../use-cases/get-user-details";
import { saveAsset } from "../../use-cases/save-recharge";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmMsg = (props) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  // console.log(props.card);
  const MySwal = withReactContent(Swal);
 
  const handleClickOpen = () => {
    let error;
    if (props.amount === "") {
      error = "withdraw value should be not null";
    }
    if (props.amount <= 10) {
      error = "withdraw value should more than 10 ";
    }
    if (props.amount > user.totalBalance) {
      error = "not enough balace in you account";
    }
    if (!error) {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          save();
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire("Cancelled", "widthdraw is cancelled", "error");
         
        }
      });
    } else {
      MySwal.fire("ERROR!", error, "error");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const save = () => {
    setOpen(false);
    saveAsset(props.amount, 1).then(()=>{MySwal.fire("success!", "withdrawal request sent successful..", "success");}).catch(()=>{ MySwal.fire("ERROR", "Please contact admin", "error");});
  };
  React.useEffect(() => {
    getUserDetails().then((res) => setUser(res.data));
  }, []);
  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        {props.buttonName}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={save} variant="contained">
            Yes
          </Button>
          <Button onClick={handleClose} variant="contained">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmMsg;
