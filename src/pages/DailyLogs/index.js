import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Input,
  InputAdornment,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {getWaterManagmentData} from "../../use-cases/get-water-managment-data";
import {getDailyLogDataListByMonth} from "../../use-cases/get-dailylog-data-list-by-month";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DailyLogs = () => {
  const [log, setlog] = useState({});
  const [value, setValue] =useState("1");
  const [category,setCategory] = useState();
  const [bmi,setBMI] = useState(0);
  const [bmiColor,setBMIColor] = useState();
  const [profileInfo,setProfileInfo] = useState({weight:85,height:180,gender:1,activeLevel:2,goal:"Weight Loss",firstName:"Hasitha",lastName:"Lakmal",useId:"1560",email:"hasithalakmal@gmail.com",dob:"1999/06/17",});
  const [upperRange,setUpperRange] = useState();
  const [lowerRange,setLowerRange] = useState();
  const handleChange = (event) => {
    setlog((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(()=>{
    BMICalculator()
    caloryRangeSelector()
    getChartDataByType("3")
  },[])
  
  const BMICalculator = () => {
      let bmivalue = Math.round(profileInfo.weight*10/((profileInfo.height/100) ** 2))/10
      setBMI(bmivalue);
    if (bmivalue > 40) {
        setCategory("extreme obese")
        setBMIColor("#fe4d01")
    } else if (bmivalue > 30) {
      setCategory("obese")
      setBMIColor("orange")
    } else if (bmivalue > 25) {
      setCategory("over weight")
      setBMIColor("#B5970a")
    } else if (bmivalue > 18.5) {
      setCategory("normal")
      setBMIColor("green")
    } else {
      setCategory("under weight")
      setBMIColor("blue")
    }
  };
  const options = {
    animationEnabled: true,
    exportEnabled: false,
    theme: "light2", // "light2", "dark1", "dark2"
    title: {
      text: "Change by Weight",
    },
    axisY: {
      title: " Change",
      gridThickness: 0,
      lineThickness: 1,
    },
    axisX: {
      title: "Days of Month",
      prefix: "W",
      interval: 2,
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
    console.log("value", event)
    setValue(newValue);
    getDailyLogDataByType(newValue);
  };

  const findHelthyWeight =(tragetBMI)=>{
    return Math.round(tragetBMI * (profileInfo.height/100) ** 2)
  }
  const caloryCalculator = (rangeValue) =>{
    return Math.round((profileInfo.weight * 2.2) * rangeValue)
  }
  const calculateWaterIntake = ()=>{
    return  Math.round(((profileInfo.weight * 2.2)/2)*29.574*100)/100
  }
  const caloryRangeSelector = ()=>{
    if(profileInfo.goal === "Weight Loss"){
      if(profileInfo.activeLevel === 1){
        setUpperRange(12);
        setLowerRange(14);
      }else{
        setUpperRange(14);
        setLowerRange(16);
      }
    }else if(profileInfo.goal === "Maintainance"){
      if(profileInfo.activeLevel === 1){
        setUpperRange(14);
        setLowerRange(16);
      }else{
        setUpperRange(16);
        setLowerRange(18);
      }
    }else{
      if(profileInfo.activeLevel === 1){
        setUpperRange(18);
        setLowerRange(20);
      }else{
        setUpperRange(20);
        setLowerRange(22);
      }
    }

  }

  const getDailyLogDataByType = (newValue) => {
    let logType = ""
    newValue == '2' ? logType = "Calorie" : newValue == '3' ?  logType = "Water" : logType = "Weight";
    getWaterManagmentData(logType).then((e)=>{

    })
  }

  const getChartDataByType = (newValue) =>{
    let logType = ""
    newValue == '2' ? logType = "Calorie" : newValue == '3' ?  logType = "Water" : logType = "Weight";
    getDailyLogDataListByMonth(logType).then((e)=>{
      console.log(e)

    })

  }

  return (
    <>
      <Typography variant="h3" sx={{ margin: "15px 0px 0px 20px" }}>
        Daily Logs
      </Typography>
      <Card
        sx={{
          m: 1,
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
              <Tab label="Calory Log" value="2" />
              <Tab label="Water Log" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid
              container
              spacing={1}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid xs={12} md={9}>
                <CanvasJSChart options={options} />
              </Grid>
              <Grid xs={6} md={2} align="center" sx={{visibility: { xs: "hidden", md: "visible" }}}>
                <img
                  width="150px"
                  height="380px"
                  src={`img/${category}_${profileInfo.gender === 1?"boy":"girl"}.webp`}
                  alt="BMIImage"
                />
                <h2 style={{ margin: "2px", color: bmiColor }}>{category}</h2>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="center"
              sx={{ mb: 5, color: "#878787" }}
            >
              <Grid xs={12} md={5} align="center"
                  sx={{ border: "1px solid #878787", height: "280px" }}>
                
                  <Typography
                      variant="h3"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                      {bmi}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                      Body Mass Index
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                        {findHelthyWeight(18.5)}kg -  {findHelthyWeight(25)}kg
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                      Healthy Weight Range
                    </Typography>
              </Grid>
              <Grid xs={12} md={6}>
                <Grid container spacing={0}>
                  <Grid
                    xs={6}
                    md={6}
                    align="center"
                    sx={{ border: "1px solid #878787", height: "140px" }}
                  >

                    <Input inputProps={{style: {fontSize:40,textAlign: 'center' },disableUnderline: true }} endAdornment={<span style={{fontSize:30}}>kg</span>} placeholder={profileInfo?.weight}/>
                    <Typography
                      variant="h6"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                      Weight
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
                      {profileInfo?.height} cm
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                      Height
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
                      {profileInfo?.gender === 1 ? "Male":"Female"}
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
            </Grid>
            <Grid
              xs={11}
              md={11}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ bgcolor: "#8A47EB", color: "#fff" }}
                  value="50"
                  //   onClick={save}
                >
                  Save details
                </Button>
              </CardActions>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
          <Grid
              container
              spacing={1}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid xs={12} md={9}>
                <CanvasJSChart options={options} />
              </Grid>
            </Grid>
            <Grid
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

                    <Input inputProps={{style: {fontSize:40,textAlign: 'center' },disableUnderline: true }} endAdornment={<span style={{fontSize:30}}>kCal</span>} placeholder={0}/>
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
                      {profileInfo?.weight} kg
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
                      {profileInfo?.gender === 1 ? "Male":"Female"}
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
            </Grid>
            <Grid
              xs={10}
              md={10}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ bgcolor: "#8A47EB", color: "#fff" }}
                  value="50"
                  //   onClick={save}
                >
                  Save details
                </Button>
              </CardActions>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
          <Grid
              container
              spacing={1}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid xs={12} md={9}>
                <CanvasJSChart options={options} />
              </Grid>
            </Grid>
            <Grid
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
                      sx={{ margin: "50px 0px 0px 15px" }}
                    >
                      Target Water Intake
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                         {calculateWaterIntake()} ml
                    </Typography>
                    <Typography
                      variant="h7"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                      For every hour of moderate to intense exercise, aim to drink an additional 0.5 to 1 liter of water.
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

                    <Input inputProps={{style: {fontSize:40,textAlign: 'center' },disableUnderline: true }} endAdornment={<span style={{fontSize:30}}>Ltr</span>} placeholder={0}/>
                    <Typography
                      variant="h6"
                      sx={{ margin: "15px 0px 0px 15px" }}
                    >
                      Water Intake Today
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
                      {profileInfo?.weight} kg
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
                      {profileInfo?.gender === 1 ? "Male":"Female"}
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
            </Grid>
            <Grid
              xs={10}
              md={10}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ bgcolor: "#8A47EB", color: "#fff" }}
                  value="50"
                  //   onClick={save}
                >
                  Save details
                </Button>
              </CardActions>
            </Grid>
          </TabPanel>
        </TabContext>
      </Card>
    </>
  );
};

export default DailyLogs;
