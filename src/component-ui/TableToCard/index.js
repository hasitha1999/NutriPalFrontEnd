import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActions, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { packageActive } from "../../use-cases/package-activate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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


const TableToCard = (props) => {
  const [open, setOpen] = useState(false);
  const [packageId, setPackageId] = useState();
  const [disabledPack, isDisabledPack] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const MySwal = withReactContent(Swal);
  const save = () => {
    setOpen(false);
    setPackageId(props.id);
  };
  useEffect(() => {
    try{
    if (packageId > 0) {
      packageActive(packageId).then(()=>{ MySwal.fire("success!", "Package added successful....!", "success");}).catch(()=>{MySwal.fire("ERROR", "Please contact admin", "error");});
    }
  }catch(e){
    alert(e)
  }
  }, [packageId]);

  useEffect(() => {
    if (props.packageUser.id >= props.id) {
      isDisabledPack(true);
    } else {
      isDisabledPack(false);
    }
  },);



  return (
    <div>
      <Card
        sx={{
          m: 1,
          borderRadius: 3,
          border: "1px solid #f2e22c",
          backgroundColor: "transparent",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Avatar
              src={`img/${props.imgname}`}
              sx={{
                height: 50,
                mr: 1,
                width: 50,
              }}
            />
            <Box sx={{ ml: "3" }}>
              <Typography
                gutterBottom
                variant="h6"
                sx={{ mr: 2 }}
                color="secondary"
              >
                {props.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                sx={{ mr: 2 }}
                color="secondary"
              >
                {props.package} USDT
              </Typography>
              <Typography gutterBottom variant="body1">
                4 x Revenue
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", mr: 3, m: 2 }}>
          <Typography color="subtiltle1" variant="body2">
            Daily Revenue : {props.package * 0.01} USDT
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ marginLeft: "auto", order: "2", border: "1px solid #fff" }}
            disabled={disabledPack}
          >
            Join
          </Button>
        </Box>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="secondary"
            align="center"
          >
            Futher Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            1. Subscribe {props.name} Package selling price is {props.package}{" "}
            USDT, the income is 4 times the income can earn {props.package * 4}
            USDT, you can receive {props.package * 0.01} USDT per day. <br />
            <br />
            2. The daily earnings are put in the equivalent value of USDT coins.{" "}
            <br /> <br />
            3. You can upgrade to any higher package at any time while still in
            the purchased package <br />
            <br />
            4. Once this package is sold, it is non-refundable and
            non-exchangeable.
            <br /> <br />
          </Typography>
          <Stack spacing={3} direction="row">
            <Button
              onClick={save}
              variant="contained"
              sx={{ marginRight: "10", border: "1px solid #fff" }}
            >
              Join
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ marginLeft: "10", border: "1px solid #fff" }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default TableToCard;
