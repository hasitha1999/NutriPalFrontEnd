import { Box, Typography } from '@mui/material';
import React from 'react'

const RulesComponent = (props) => {
  return (
    <Box sx={{ m: "20px" }}>
      <Typography color="text.secondary" variant="h5">
       {props.title}
      </Typography>
      <Typography color="text.secondary" variant="p">
        {props.description}
      </Typography>
    </Box>
  );
}

export default RulesComponent