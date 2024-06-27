import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Input,
  InputAdornment,
  Stack,
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
import { CustomPaper } from "../../theme/CustomThemeComponents";
import WaterCalorieLog from "../../component-ui/WaterCalorieLog";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Opacity } from "@mui/icons-material";
import SpeedIcon from '@mui/icons-material/Speed';
import CustomTabs from "../../component-ui/CustomTabs";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DailyLogs = () => {
  const [category,setCategory] = useState();
  const [bmi,setBMI] = useState(0);
  const [bmiColor,setBMIColor] = useState();
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
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [calorieUpperLimit,setCalorieUpperLimit] = useState(0)
  const [waterUpperLimit,setWaterUpperLimit] = useState(0)
  const [weightUpperLimit,setWeightUpperLimit] = useState(0)
  const [calorieLowerLimit,setCalorieLowerLimit] = useState(0)
  const [waterLowerLimit,setWaterLowerLimit] = useState(0)
  const [weightLowerLimit,setWeightLowerLimit] = useState(0)

  useEffect(()=>{
    getUserDetails().then((res) => {
      setUser(res.data)
      BMICalculator(res.data.weight, res.data.height)
      findHelthyWeight( res.data.height);
    });
    

  },[])
  
  const BMICalculator = (weight, height) => {
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
  
  // const sendUserInputs = (amount, logType) =>{
  //   let payLoad = {
  //     logId : initialData?.logId,
  //     logType : logType,
  //     userInput : amount,
  //     weight : initialData?.weight
  //   }
  //   setIsButtonLoading(true)
  //   createOrUpdateDailyLog(payLoad).then((e)=>{
  //     getWaterManagmentData(logType).then((e)=>{
  //       setInitialData(e.data)

  //     })
  //     setIsButtonLoading(false);

  //   })

  // }

  const findHelthyWeight =(height)=>{
     setWeightUpperLimit(()=>Math.round(25 * (height/100) ** 2));
     setWeightLowerLimit(()=>Math.round(18 * (height/100) ** 2));
  }



  const getCurrentDateFormatted = ()=> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');

    return `${year}-${day}-${month}`;
}
const tabValues = [
  {
    label: (
      <Box sx={{ display: "flex" }}>
        <SpeedIcon sx={{ marginRight: 1 }} />
        Weight log
      </Box>
    ),
    component: <WaterCalorieLog main={"28.3"} sub={"Weight Loss"} logType={"Weight"} />,
  },
  {
    label: (
      <Box sx={{ display: "flex" }}>
        <WhatshotIcon sx={{ marginRight: 1 }} />
        Calorie Intake
      </Box>
    ),
    component: <WaterCalorieLog main={"Weight Loss"} sub={"Your Goal"} logType={"Calorie"} weight={user.weight}/>,
  },
  {
    label: (
      <Box sx={{ display: "flex" }}>
        <Opacity sx={{ marginRight: 1 }} />
        Water Intake
      </Box>
    ),
    component: <WaterCalorieLog main={"Take 0.5 - 1L of water while exercising."} sub={""} logType={"Water"} weight={user.weight}/>,
  },
];

  return (
    <>
      <CustomPaper style={{width:'90%'}}>
            <Stack direction="row" justifyContent="space-between">
                <Typography className="main-header">Daily Logs</Typography>
                <Typography className="main-header">{getCurrentDateFormatted()}</Typography>
            </Stack>
        </CustomPaper>
        <CustomPaper style={{width:'90%'}}>
            <div>
               <CustomTabs tabValues={tabValues} />
          </div>
        </CustomPaper>
    </>
  );
};

export default DailyLogs;
