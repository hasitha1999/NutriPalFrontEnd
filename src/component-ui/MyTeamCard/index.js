import React from 'react'
import { Card, CardContent, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Avatar from "@mui/material/Avatar";

const MyTeamCard = (props) => {
    const randomColor ="#"+ Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div>
      <Card
        sx={{
          borderRadius: 1,
          m: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Avatar sx={{ bgcolor: randomColor }}>{`${props.name
            .split(" ")[0][0]
            .toUpperCase()}`}</Avatar>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h6">
            {props.name}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            {props.date}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            Level {props.level}
          </Typography>
        </CardContent>
        <CardContent>
          <ArrowForwardIosIcon />
        </CardContent>
      </Card>
    </div>
  );
}

export default MyTeamCard