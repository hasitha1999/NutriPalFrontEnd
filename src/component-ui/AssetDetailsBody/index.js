import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AssetTable from "../AssetTable";

const AssetDetailsBody = (props) => {
  return (
    <div>
      <Card sx={{ borderRadius: 1, mb: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 18, mb: 1 }} color="text.secondary">
            Total Revenue : {props.total}
          </Typography>
        </CardContent>
      </Card>
      <AssetTable timeStamp={props.timeStamp} />
    </div>
  );
};

export default AssetDetailsBody;
