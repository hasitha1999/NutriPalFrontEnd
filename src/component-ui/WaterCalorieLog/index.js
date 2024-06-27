import { Box, Grid, Input, Stack, Typography } from "@mui/material";
import { Gauge, LineChart, gaugeClasses } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import GaugeChart from "../GaugeChart";
import BasicTable from "../BasicTable";
import Widget from "../Widget";
import { WidgetTheme } from "../../theme/CustomThemeComponents";
import { getDailyLogDataListByMonth } from "../../use-cases/get-dailylog-data-list-by-month";
import { getWaterManagmentData } from "../../use-cases/get-water-managment-data";

const WaterCalorieLog = (props) => {
  const [chartData, setChartData] = useState({
    x: ["2024-06-24", "2024-06-25", "2024-06-26", "2024-06-27", "2024-06-28", "2024-06-29"],
    y: [2, 5.5, 2, 8.5, 1.5, 5],
  });
  const [initialData, setInitialData] = useState({})
  let upperLimit = 0;
  let lowerLimit = 0;
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
    upperLimit =  Math.round((weight * 2.2) * upperRange);
    lowerLimit = Math.round((weight * 2.2) * lowerRange);
  }
  const calculateWaterIntake = (weight)=>{
    lowerLimit = Math.round(((weight * 2.2)/2)*29.574*100)/100;
  }
  console.log(props.upperlimit)
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
          <Gauge width={300} height={300} value={initialData/lowerLimit} innerRadius="60%" outerRadius="100%" cornerRadius="40%" text={`${initialData}/${lowerLimit}`} sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 30,
                },
            })} />
          <Typography className="main-header">Current Intake</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        alignItems="center"
        direction="row"
        justifyContent="center"
      >
        <Grid xs={6} md={6}>
        </Grid>
        <Grid xs={6} md={6}>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default WaterCalorieLog;
