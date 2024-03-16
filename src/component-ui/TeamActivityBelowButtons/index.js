import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getRefUsersByPrevioudayAndLevel, getRefUsersByPrevioudayWidthdrawalByLvel } from "../../use-cases/get-refusers-bydate-level";
import { getNewTops } from "../../use-cases/getNewTops";

const TeamActivityBelowButtons = (props) => {

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (props.page == "1") {
      getRefUsersByPrevioudayAndLevel(props.level).then((res) =>
        setValue(res.data)
      );
    }else if (props.page == "3") {
      getRefUsersByPrevioudayWidthdrawalByLvel(props.level).then((res) => {
        setValue(res.data);
      });
    } else {
      getNewTops(props.level).then((res) => setValue(res.data));
    }
  }, []);

  useEffect(() => {
    props.total && props.total(value);
  }, [value]);
  
  return (
    <div>
      <Card sx={{ borderRadius: 1, m: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Level - {props.level}</Typography>
          <Typography variant="h6">{value}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamActivityBelowButtons;
