import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DailyLogs = () => {
  const [log, setlog] = useState({});
  const [value, setValue] = React.useState("1");
  const handleChange = (event) => {
    setlog((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const BMICalculator = (bmi) =>{
      if (bmi > 40) {
        return "<>"
      } else if(bmi > 30){
        
      }else if(bmi > 25){

      }else if (bmi >18.5){

      }else{

      }
  }
  const options = {
    animationEnabled: true,
    exportEnabled: false,
    theme: "light2", // "light2", "dark1", "dark2"
    title: {
      text: "Weight Change by Week of Year",
    },
    axisY: {
      title: "Weight Change",
      gridThickness: 0,
      lineThickness: 1,
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2
    },
    data: [
      {
        type: "line",
        toolTipContent: "Week {x}: {y}",
        dataPoints: [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 64 },
          { x: 4, y: 62 },
          { x: 5, y: 64 },
          { x: 6, y: 60 },
          { x: 7, y: 58 },
          { x: 8, y: 59 },
          { x: 9, y: 53 },
          { x: 10, y: 54 },
          { x: 11, y: 61 },
          { x: 12, y: 60 },
          { x: 13, y: 55 },
          { x: 14, y: 60 },
          { x: 15, y: 56 },
          { x: 16, y: 60 },
          { x: 17, y: 59.5 },
          { x: 18, y: 63 },
          { x: 19, y: 58 },
          { x: 20, y: 54 },
          { x: 21, y: 59 },
          { x: 22, y: 64 },
          { x: 23, y: 59 },
        ],
      },
    ],
  };

  const tabChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}></Box>
      <Card
        sx={{
          m: 3,
          borderRadius: 3,
          border: "1px solid #000",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={tabChange}
              textColor="secondary"
              indicatorColor="secondary"
              centered
            >
              <Tab label="Weight Log" value="1" />
              <Tab label="Calory Intake Log" value="2" />
              <Tab label="Water Intake Log" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CardContent sx={{ ml: 5 }}>
              <CanvasJSChart options={options} />
              <Box sx={{ mb: 5, color: "#000" }}>
                <Grid container spacing={2}>
                  <Grid xs={6} md={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "35px",
                        marginLeft: "15px",
                        float: "inline-end",
                      }}
                    >
                      Weight Today
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={2}>
                    <TextField
                      // fullWidth
                      label="Enter weight "
                      name="weight"
                      onChange={handleChange}
                      required
                      color="secondary"
                      value={log?.weight}
                      sx={{ marginLeft: "15px", marginTop: "30px" }}
                    />
                  </Grid>
                  <Grid xs={6} md={3}>
                  <Typography
                      variant="h6"
                      sx={{
                        marginTop: "35px",
                        marginLeft: "15px",
                        float: "inline-end",
                      }}
                    >
                      Current BMI Value  : 25.5
                  </Typography> 
                  </Grid>
                  <Grid xs={6} md={3}>
                  <Typography
                      variant="h6"
                      sx={{
                        marginTop: "35px",
                        marginLeft: "15px",
                        float: "inline-end",
                      }}
                    >
                      Target BMI Value  : 25.5
                  </Typography>
                  </Grid>
                </Grid>
                <Grid xs={12} md={6}>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ bgcolor: "#8A47EB", color: "#fff", float: "right" }}
                      value="50"
                      //   onClick={save}
                    >
                      Save details
                    </Button>
                  </CardActions>
                </Grid>
              </Box>
            </CardContent>
          </TabPanel>
          <TabPanel value="2">
            <CardContent sx={{ ml: 5 }}>
              <CanvasJSChart options={options} />
              <Box sx={{ mb: 5, color: "#fff" }}>
                <Grid container spacing={2}>
                  <Grid xs={6} md={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "35px",
                        marginLeft: "15px",
                        float: "inline-end",
                      }}
                    >
                      Calory Intake Today
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={2}>
                    <TextField
                      // fullWidth
                      label="Calory Intake Today"
                      name="weight"
                      onChange={handleChange}
                      required
                      value={log?.weight}
                      sx={{ marginLeft: "15px", marginTop: "30px" }}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} md={6}>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="medium"
                      value="50"
                      //   onClick={save}
                    >
                      Save details
                    </Button>
                  </CardActions>
                </Grid>
              </Box>
            </CardContent>
          </TabPanel>
          <TabPanel value="3">
            <CardContent sx={{ ml: 5 }}>
              <CanvasJSChart options={options} />
              <Box sx={{ mb: 5, color: "#fff" }}>
                <Grid container spacing={2}>
                  <Grid xs={6} md={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "35px",
                        marginLeft: "15px",
                        float: "inline-end",
                      }}
                    >
                      Water Intake Today
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={2}>
                    <TextField
                      // fullWidth
                      label="Water Intake Today"
                      name="weight"
                      onChange={handleChange}
                      required
                      value={log?.weight}
                      sx={{ marginLeft: "15px", marginTop: "30px" }}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} md={6}>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="medium"
                      value="50"
                      //   onClick={save}
                    >
                      Save details
                    </Button>
                  </CardActions>
                </Grid>
              </Box>
            </CardContent>
          </TabPanel>
        </TabContext>
      </Card>
    </>
  );
};

export default DailyLogs;
