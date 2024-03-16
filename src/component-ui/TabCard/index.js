import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TabCard = (props) => {
  console.log(props);
  return (
    <div>
      <Card sx={{ borderRadius: 1, mb: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 18, mb: 2 }} color="text.secondary">
            {props.type} <br /> {props.date}
          </Typography>
          <Typography sx={{ fontSize: 18, mb: 2 }} color="text.secondary">
            Order number : {props.order}
          </Typography>
          <Typography sx={{ fontSize: 18, mb: 2 }} color="text.secondary">
            Amount to be Recived : <br /> {props.value} USDT
          </Typography>
          {!props.isAccepted ? (
            <Typography sx={{ fontSize: 18, mb: 2 }} color="error">
              This Transaction is pending....
            </Typography>
          ) : (
            <Typography sx={{ fontSize: 18, mb: 2 }} color="#0BDA51">
              This Transaction is success
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TabCard;
