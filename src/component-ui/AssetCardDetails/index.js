import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { getCardDetailsByUser } from "../../use-cases/get-Card-Details-by-user";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 2,
};

export const AssetCardDetails = ({ row }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({});

  const handleClick = () => {
    getCardDetailsByUser(row?.user?.id).then(res => {
      setValues(res.data);
      setModalOpen(true);
    });
  };
  const handleClose = () => {
    setValues({});
    setModalOpen(false);
  };

  return (
    <>
      {row.paymentType.id === 1 ? (
        <Button
          variant="contained"
          color={"info"}
          onClick={handleClick}
          fullWidth
        >
          View Card Details
        </Button>
      ) : (
        ""
      )}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid xs={12} md={6} p={2}>
              <TextField
                fullWidth
                name="accountType"
                label="Account Type"
                disabled
                value={values?.accountType || ''}
              />
            </Grid>
            <Grid xs={12} md={6} p={2}>
              <TextField
                fullWidth
                name="cardType"
                label="Card Type"
                disabled
                value={values?.cardType || ''}
              />
            </Grid>
            <Grid xs={12} md={6} p={2}>
              <TextField
                fullWidth
                name="receivingAddress"
                label="Receiving Address"
                disabled
                value={values?.receivingAddress || ''}
              />
            </Grid>
            <Grid xs={12} md={6} p={2}>
              <TextField
                fullWidth
                name="chainName"
                label="Chain Name"
                disabled
                value={values?.chainName || ''}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
