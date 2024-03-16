import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { saveBonus } from "../../use-cases/save-recharge";

const Promotion = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const claimBouns = async (value) => {
    setIsLoading(true);
    await saveBonus(value);
    (await props.resetT) && props.resetT();
    setIsLoading(false);
  };
  return (
    <div>
      <Card sx={{ borderRadius: 1, m: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 16, mb: 2 }} color="text.secondary">
            Accumilated members {props.members} successful promotions Active
            members and rewards. {props.value} USDT
          </Typography>
          <Button
            variant="contained"
            onClick={() => claimBouns(props.value)}
            disabled={!props.isdisabled || isLoading}
          >
            Claim
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Promotion;
