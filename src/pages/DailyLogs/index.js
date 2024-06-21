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
import {getUserDetails} from "../../use-cases/get-user-details";
import {createOrUpdateDailyLog} from "../../use-cases/create-or-update-daily-log";

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
  const [chartData, setChartData] = useState({
          animationEnabled: true,
          exportEnabled: false,
          theme: "light2",
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
              toolTipContent: "{x}: {y}",
              dataPoints: [],
            },
          ],
        })
  const [user,setUser] = useState({})
  const [initialData, setInitialData] = useState({})
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  const [calorie,setCalorie] = React.useState(0)
  const [water,setWater] = React.useState(0)
  const [weight,setWeight] = React.useState(0)

        const handleChange = (event) => {
          setlog((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
          }));
        };

  useEffect(()=>{
    caloryRangeSelector()
    getDailyLogDataByType(1)
    getChartDataByType(1)
    getUserDetails().then((res) => {
      setUser(res.data)
      console.log("user", res.data)
      BMICalculator(res.data.weight, res.data.height)
    });

  },[])
  
  const BMICalculator = (weight, height) => {
      let bmivalue = Math.round(weight*10/((height/100) ** 2))/10
    console.log("weight", weight)
    console.log("bmivalue", bmivalue)
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
  // const options = {
  //   animationEnabled: true,
  //   exportEnabled: false,
  //   theme: "light2", // "light2", "dark1", "dark2"
  //   title: {
  //     text: "Change by Weight",
  //   },
  //   axisY: {
  //     title: " Change",
  //     gridThickness: 0,
  //     lineThickness: 1,
  //   },
  //   axisX: {
  //     title: "Days of Month",
  //     prefix: "W",
  //     interval: 2,
  //   },
  //   data: [
  //     {
  //       type: "line",
  //       toolTipContent: "{x}: {y}",
  //       dataPoints: [
  //         {x: '2024-06-18', y: 23.45},
  //         {x: '2024-06-22', y: 60.45}
  //       ],
  //     },
  //   ],
  // };

  const tabChange = (event, newValue) => {
    console.log("value", event)
    setValue(newValue);
    getDailyLogDataByType(newValue);
    getChartDataByType(newValue);
  };

  const findHelthyWeight =(tragetBMI)=>{
    return Math.round(tragetBMI * (user.height/100) ** 2)
  }
  const caloryCalculator = (rangeValue) =>{
    return Math.round((user.weight * 2.2) * rangeValue)
  }
  const calculateWaterIntake = ()=>{
    return  Math.round(((user.weight * 2.2)/2)*29.574*100)/100
  }
  const caloryRangeSelector = ()=>{
    if(user.goal === "Weight Loss"){
      if(user.activeLevel === 1){
        setUpperRange(12);
        setLowerRange(14);
      }else{
        setUpperRange(14);
        setLowerRange(16);
      }
    }else if(user.goal === "Maintainance"){
      if(user.activeLevel === 1){
        setUpperRange(14);
        setLowerRange(16);
      }else{
        setUpperRange(16);
        setLowerRange(18);
      }
    }else{
      if(user.activeLevel === 1){
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
      setInitialData(e.data)

    })
  }
  const sendUserInputs = (amount, logType) =>{
    let payLoad = {
      logId : initialData?.logId,
      logType : logType,
      userInput : amount,
      weight : initialData?.weight
    }
    setIsButtonLoading(true)
    createOrUpdateDailyLog(payLoad).then((e)=>{
      getWaterManagmentData(logType).then((e)=>{
        setInitialData(e.data)

      })
      setIsButtonLoading(false);

    })

  }

  const getChartDataByType = (newValue) =>{

    let logType = ""
    newValue == 3 ? logType = "Weight" : newValue == 1 ?  logType = "Water" : logType = "Calorie";
    console.log("logType", logType)
    getDailyLogDataListByMonth(logType).then((e)=>{

      let newDataPoints = [];
      let processedDataPoints = []
      newDataPoints = e.data;
      if (newDataPoints.length != 0){
        newDataPoints.forEach((item)=>
          processedDataPoints.push({
            x : new Date(item.date),
            y : item.userInputValue
          })
        )
      }
      setChartData(prevChartData => ({
        ...prevChartData,
        title: {
          text: `Change by ${logType}`,
        },
        data: [
          {
            ...prevChartData.data[0],
            dataPoints: processedDataPoints,
          },
        ],
      }));

    })
    console.log("Chart Data", chartData)

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
              <Tab label="Water Log" value="1" />
              <Tab label="Calory Log" value="2" />
              <Tab label="Weight Log" value="3" />
            </TabList>
          </Box>
          <TabPanel value="3">
            <Grid
              container
              spacing={1}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid xs={12} md={9}>
                <CanvasJSChart options={chartData} />
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

                    <Input onChange={(e)=>setWeight(previousValue=> previousValue = e.target.value)} inputProps={{style: {fontSize:40,textAlign: 'center' },disableUnderline: true }} endAdornment={<span style={{fontSize:30}}>kg</span>} placeholder={profileInfo?.weight}/>
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
                      {user?.height} cm
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
                  onClick={()=>sendUserInputs(weight, 'Weight')}
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
                <CanvasJSChart options={chartData} />
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
                    onClick={()=>sendUserInputs(calorie, 'Calorie')}
                >
                  Save details
                </Button>
              </CardActions>
            </Grid>
          </TabPanel>
          <TabPanel value="1">
          <Grid
              container
              spacing={1}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid xs={12} md={9}>
                <CanvasJSChart options={chartData} />
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

                    <Input onChange={(e)=>setWater(previousValue => previousValue=e.target.value)} inputProps={{style: {fontSize:40,textAlign: 'center' },disableUnderline: true }} endAdornment={<span style={{fontSize:30}}>Ltr</span>} placeholder={0}/>
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
                    onClick={()=>sendUserInputs(water, 'Water')}
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
