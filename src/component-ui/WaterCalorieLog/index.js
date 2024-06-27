import { Grid, Input, Typography } from '@mui/material'
import React from 'react'

const WaterCalorieLog = () => {
  return (
    <div>
    <Grid
    container
    spacing={1}
    alignItems="center"
    direction="row"
    justifyContent="center"
  >
    <Grid xs={9} md={9} sx={{backgroundColor:"black"}}>
      {/* <CanvasJSChart options={chartData} /> */}
    </Grid>
    <Grid xs={3} md={3} sx={{backgroundColor:"black"}}>
      {/* <CanvasJSChart options={chartData} /> */}
    </Grid>
  </Grid>
  
  {/* <Grid
    container
    spacing={0}
    alignItems="center"
    direction="row"
    justifyContent="center"
    sx={{ mt: 2,mb: 5, color: "#878787" }}
  >
    <Grid xs={12} md={4} align="center"
        sx={{ border: "1px solid #878787", height: "280px" }}>
                          <Typography
            variant="h6"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            Your Goal
          </Typography>
        <Typography
            variant="h3"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            {profileInfo.goal}
          </Typography>

          <Typography
            variant="h6"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            Calory Range you have to take
          </Typography>
          <Typography
            variant="h3"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
               {caloryCalculator(lowerRange)} kCal -  {caloryCalculator(upperRange)} kCal
          </Typography>

    </Grid>
    <Grid xs={12} md={5}>
      <Grid container spacing={0}>
        <Grid
          xs={6}
          md={6}
          align="center"
          sx={{ border: "1px solid #878787", height: "140px" }}
        >

          <Input onChange={(e)=>setCalorie(previousValue => previousValue = e.target.value)} inputProps={{style: {fontSize:40,textAlign: 'center' },disableUnderline: true }} endAdornment={<span style={{fontSize:30}}>kCal</span>} placeholder={0}/>
          <Typography
            variant="h6"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            Calory Intake Today
          </Typography>
        </Grid>
        <Grid
          xs={6}
          md={6}
          align="center"
          sx={{ border: "1px solid #878787", height: "140px" }}
        >
          <Typography
            variant="h3"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            {user?.weight} kg
          </Typography>
          <Typography
            variant="h6"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            Weight
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid
          xs={6}
          md={6}
          align="center"
          sx={{ border: "1px solid #878787", height: "140px" }}
        >
          <Typography
            variant="h3"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            {new Date().getFullYear() - profileInfo.dob.split("/", 1)} Years
          </Typography>
          <Typography
            variant="h6"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            AGE
          </Typography>
        </Grid>
        <Grid
          xs={6}
          md={6}
          align="center"
          sx={{ border: "1px solid #878787", height: "140px" }}
        >
          <Typography
            variant="h3"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            {user?.gender === 1 ? "Male":"Female"}
          </Typography>
          <Typography
            variant="h6"
            sx={{ margin: "15px 0px 0px 15px" }}
          >
            Gender
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid> */}
  </div>
  )
}

export default WaterCalorieLog