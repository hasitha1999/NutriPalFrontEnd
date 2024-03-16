import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TeamActivityBelowButtons from "../../component-ui/TeamActivityBelowButtons";

const NewRegistration = () => {
     const [value, setValue] = useState(0);
     const data = (newdata) => {
       setValue((prev) => prev + newdata);
     };
  return (
    <div>
      <Typography gutterBottom variant="h5" align="center">
        New Registration
      </Typography>
      <Typography gutterBottom variant="h6" align="center">
        Today new registration {value}
      </Typography>
      <TeamActivityBelowButtons
        level="1"
        sx={{ borderColor: "primaryVariant" }}
        page="1"
        total={data}
      />
      <TeamActivityBelowButtons level="2" page="1" total={data} />
      <TeamActivityBelowButtons level="3" page="1" total={data} />
    </div>
  );
}

export default NewRegistration