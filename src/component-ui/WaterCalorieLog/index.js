import { Box, Grid, Input, Stack, Typography } from "@mui/material";
import { Gauge, LineChart, gaugeClasses } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { getDailyLogDataListByMonth } from "../../use-cases/get-dailylog-data-list-by-month";
import { getWaterManagmentData } from "../../use-cases/get-water-managment-data";

const WaterCalorieLog = (props) => {
  const [chartData, setChartData] = useState({
    x: ["2024-06-24", "2024-06-25", "2024-06-26", "2024-06-27", "2024-06-28", "2024-06-29"],
    y: [2, 5.5, 2, 8.5, 1.5, 5],
  });
  const [initialData, setInitialData] = useState({})
  const [upperLimit,setUpperLimit] = useState(0);
  const [lowerLimit,setLowerLimit] = useState(0);
  let upperRange = 12;
  let lowerRange = 14;
  useEffect(() => {
    // caloryRangeSelector(props.user);
    getDailyLogDataByType(props?.logType);
    getChartDataByType(props?.logType);
    if(props.logType == "Water"){
      calculateWaterIntake(props.weight);
    }else{
      caloryCalculator(props.weight);
    }
  },[]);

  const getChartDataByType = (logType) => {
    getDailyLogDataListByMonth(logType).then((res) => {
      setChartData(res.data)
    });
  };
  const getDailyLogDataByType = (logType) => {
    getWaterManagmentData(logType).then((e)=>{
      setInitialData(e.data.userInput)

    })

  }
  const caloryCalculator = (weight) =>{
    setUpperLimit(Math.round((weight * 2.2) * upperRange));
    setLowerLimit(Math.round((weight * 2.2) * lowerRange));
  }
  const calculateWaterIntake = (weight)=>{
    setLowerLimit(Math.round(((weight * 2.2)/2)*29.574*100)/100);
  }
  console.log(lowerLimit)
  // const caloryRangeSelector = (user)=>{
  //   if(user?.goal === "Weight Loss"){
  //     if(user?.activeLevel === 1){
  //       upperRange = 12;
  //       lowerRange = 14;
  //     }else{
  //       upperRange = 14;
  //       lowerRange = 16;
  //     }
  //   }else if(user?.goal === "Maintainance"){
  //     if(user?.activeLevel === 1){
  //       upperRange = 14;
  //       lowerRange = 16;
  //     }else{
  //       upperRange = 16;
  //       lowerRange = 18;
  //     }
  //   }else{
  //     if(user.activeLevel === 1){
  //       upperRange = 18;
  //       lowerRange = 20;
  //     }else{
  //       upperRange = 20;
  //       lowerRange = 22;
  //     }
  //   }

  // }

  return (
    <div>
      <Grid
        container
        spacing={1}
        alignItems="center"
        direction="row"
        justifyContent="center"
      >
        <Grid xs={9} md={9}>
          <LineChart
            xAxis={[{ scaleType: 'point',data: chartData.x }]}
            series={[
              {
                data: chartData.y,
              },
            ]}
            width={1000}
            height={400}
          />
        </Grid>
        <Grid xs={3} md={3}>
          <Gauge width={350} height={350} value={(initialData/lowerLimit)*100} innerRadius="60%" outerRadius="100%" cornerRadius="40%" text={`${initialData}/${lowerLimit}`} sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 30,
                },
            })} />
          <Typography className="main-header" sx={{textAlign:"center"}}>Current Intake</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        alignItems="center"
        direction="row"
        justifyContent="center"
      >
        <Grid xs={10} md={10}>
          <div
              style={{
                marginTop:"10px",
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-evenly",
                textAlign: "center",
              }}
            >
              <Box>
                <Typography variant="h4" color="primary">
                     {props.main }
                </Typography>
                <Typography variant="body1" fontWeight={500} letterSpacing={3}>
                {props.logType == "Water"? "":"Main Goal"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="primary">
                {props.logType == "Water"? `Above ${lowerLimit}ml`:`${lowerLimit}kCal - ${upperLimit}kCal`}
                </Typography>
                <Typography variant="body1" fontWeight={500} letterSpacing={3}>
                  Healthy Range
                </Typography>
              </Box>
              

            </div>
        </Grid>
        {/* <Grid xs={6} md={6}>
          <Stack>
            <Box
              sx={{
                width: "50%",
                backgroundColor: "#ECF2FF",
                minHeight: "50px",
              }}
            >
              <Typography className="main-header">{props.main}</Typography>
              <br></br>
              <Typography className="title-header">{props.sub}</Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                minHeight: "50px",
              }}
            >
              <Typography className="main-header">{props.main}</Typography>
              <br></br>
              <Typography className="title-header">{props.sub}</Typography>
            </Box>
          </Stack>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default WaterCalorieLog;
