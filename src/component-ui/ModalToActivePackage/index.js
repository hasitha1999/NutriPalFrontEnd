import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalToActivePackage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            1. Subscribe Browns 1 Package selling price is 100 USDT, the income
            is 5 times the income can earn 500 USDT, you can receive 1 USDT per
            day. 
            2. The daily earnings are put in the equivalent value of USDT
            coins. 
            3. You can upgrade to any higher package at any time while
            still in the purchased package 
            4. Once this package is sold, it is
            non-refundable and non- exchangeable.
          </Typography>
          <Button>click me</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalToActivePackage;
