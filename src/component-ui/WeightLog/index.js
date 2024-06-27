import { Box, Grid, Input, Stack, Typography } from "@mui/material";
import { Gauge, LineChart, gaugeClasses } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { getDailyLogDataListByMonth } from "../../use-cases/get-dailylog-data-list-by-month";
import { getWaterManagmentData } from "../../use-cases/get-water-managment-data";
import { CustomTextField } from "../CustomTextField/CustomTextField";
import { CustomButton } from "../../theme/CustomThemeComponents";
import { createOrUpdateDailyLog } from "../../use-cases/create-or-update-daily-log";

const WeightLog = (props) => {

    const [chartData, setChartData] = useState({
        x: ["2024-06-24", "2024-06-25", "2024-06-26", "2024-06-27", "2024-06-28", "2024-06-29"],
        y: [2, 5.5, 2, 8.5, 1.5, 5],
      });
  const [initialData, setInitialData] = useState({})
  const [category,setCategory] = useState();
  const [bmi,setBMI] = useState(0);
  const [bmiColor,setBMIColor] = useState();
  const [weightUpperLimit,setWeightUpperLimit] = useState(0)
  const [weightLowerLimit,setWeightLowerLimit] = useState(0)
  const [amount,setAmount] = useState(0)



    useEffect(() => {
        // caloryRangeSelector(props.user);
        getDailyLogDataByType(props?.logType);
        getChartDataByType(props?.logType);
        BMICalculator(props.weight,props.height)
        findHelthyWeight( props.height);
      },[]);

  const getChartDataByType = (logType) => {
    getDailyLogDataListByMonth(logType).then((res) => {
      setChartData(res.data)
    });
  };
  const getDailyLogDataByType = (logType) => {
    getWaterManagmentData(logType).then((e)=>{
      setInitialData(e.data)

    })

  }
    const BMICalculator = (weight,height) => {
        let bmivalue = Math.round(weight*10/((height/100) ** 2))/10
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
    const findHelthyWeight =(height)=>{
        setWeightUpperLimit(Math.round(25 * (height/100) ** 2));
        setWeightLowerLimit(Math.round(18 * (height/100) ** 2));
     }
     const handleChange = (event) => {
        setAmount( event.target.value);
      };
    const sendUserInputs = () =>{
    let payLoad = {
      logId : initialData?.logId,
      logType : "Weight",
      userInput : amount
    }
    createOrUpdateDailyLog(payLoad).then((e)=>{

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
        <img
                  width="150px"
                  height="380px"
                  src={`img/${category}_${props.gender == "male"?"boy":"girl"}.webp`}
                  alt="BMIImage"
                />
        <h2 style={{ margin: "2px", color: bmiColor }}>{category}</h2>
          
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
                 {bmi}
                </Typography>
                <Typography variant="body1" fontWeight={500} letterSpacing={3}>
                BMI
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="primary">
                  {weightLowerLimit}kg - {weightUpperLimit}kg
                </Typography>
                <Typography variant="body1" fontWeight={500} letterSpacing={3}>
                  Healthy Weight Range
                </Typography>
              </Box>
              

            </div>
        </Grid>
        <Grid xs={3} md={3} sx={{marginTop:"10px"}}>
            <CustomTextField onChange={handleChange} type="number" placeholder="Enter Your Weight"></CustomTextField>    <CustomButton variant="contained" onClick={sendUserInputs}>Save</CustomButton>
        </Grid>
 
      </Grid>
    </div>
  )
}

export default WeightLog