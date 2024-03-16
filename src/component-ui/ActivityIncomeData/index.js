import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ActivityIncomeData = (props) => {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle1" gutterBottom>
          <Grid container justifyContent="space-between">
            <Grid>{props.date}</Grid>
            <Grid>{props.time}</Grid>
            <Grid>{props.type}</Grid>
            <Grid> + {props.amount}</Grid>
          </Grid>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {props.description}
        </Typography>
      </Box>
    </div>
  );
}

export default ActivityIncomeData