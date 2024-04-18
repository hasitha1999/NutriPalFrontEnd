import React from 'react'
import { Box, Card, CardContent, Grid, LinearProgress } from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from '@emotion/styled';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 5,
}));
const WaterMgt = () => {
  const role = sessionStorage.getItem("ROLE");
  const MySwal = withReactContent(Swal);
  return (
    <div>
      <Grid xs={12} md={12} >
        <Card
          sx={{
            m: 1,
            borderRadius: 3,
            border: "1px solid #000",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            mt:3,
            height:"485px"
          }}
        >
          <CardContent sx={{ ml: 15,color: "#878787"}}>
            <Grid xs={1} md={1} >

                <img
                  width="50px"
                  height="80px"
                  src={`img/start.png`}
                  alt="BMIImage"
                  sx={{display:"flex",justifyContent:"flex-start"}}
                />
            </Grid>
            <Grid xs={8} md={8}>
            <Box sx={{ width: '80%'}}>
              <BorderLinearProgress color="secondary"  variant="determinate" value={80}/>
            </Box>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default WaterMgt;