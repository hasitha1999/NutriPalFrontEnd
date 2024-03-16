import React from 'react'
import { Button, Card, CardContent, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TelegramIcon from "@mui/icons-material/Telegram";

const ContactCustomer = (props) => {
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
          <Avatar>
            <TelegramIcon />
          </Avatar>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h6" align="center">
            {props.name}
          </Typography>
        </CardContent>
        <CardContent>
          <Button variant="contained" href={props.url} target="blank">
            contact
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactCustomer