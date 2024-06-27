import { Box, Grid, Input, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
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

  useEffect(() => {
    getDailyLogDataByType(props?.logType);
    getChartDataByType(props?.logType);
  },[]);

  const getChartDataByType = (logType) => {
    console.log("logType", logType);
    getDailyLogDataListByMonth(logType).then((e) => {
    //   let newDataPoints = [];
    //   let processedDataPoints = [];
    //   newDataPoints = e.data;
    //   if (newDataPoints.length != 0) {
    //     newDataPoints.forEach((item) =>
    //       processedDataPoints.push({
    //         x: new Date(item.date),
    //         y: item.userInputValue,
    //       })
    //     );
    //   }
    //   setChartData((prevChartData) => ({
    //     ...prevChartData,
    //     title: {
    //       text: `Change by ${logType}`,
    //     },
    //     data: [
    //       {
    //         ...prevChartData.data[0],
    //         dataPoints: processedDataPoints,
    //       },
    //     ],
    //   }));
    });
    console.log("Chart Data", chartData);
  };
  const getDailyLogDataByType = (logType) => {
    getWaterManagmentData(logType).then((e)=>{
      setInitialData(e.data)

    })
  }

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
          <GaugeChart width={300} height={300} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        alignItems="center"
        direction="row"
        justifyContent="center"
      >
        <Grid xs={9} md={9}>
          <BasicTable />
        </Grid>
        <Grid xs={3} md={3}>
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
