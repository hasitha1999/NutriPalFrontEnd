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
import WeightLog from "../../component-ui/WeightLog";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DailyLogs = () => {
  const [user,setUser] = useState({})

  useEffect(()=>{
    getUserDetails().then((res) => {
      setUser(res.data)
    });
  },[])



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
      component: <WeightLog main={"28.3"} sub={"Weight Loss"} logType={"Weight"}  weight={user.weight}  height={user.height} gender={user.gender} />,
    },
    {
      label: (
          <Box sx={{ display: "flex" }}>
            <WhatshotIcon sx={{ marginRight: 1 }} />
            Calorie Intake
          </Box>
      ),
      component: <WaterCalorieLog main={user.goal} sub={"Your Goal"} logType={"Calorie"} weight={user.weight}/>,
    },
    {
      label: (
          <Box sx={{ display: "flex" }}>
            <Opacity sx={{ marginRight: 1 }} />
            Water Intake
          </Box>
      ),
      component: <WaterCalorieLog main={"Take Additional 0.5 - 1L of water while exercising."} sub={""} logType={"Water"} weight={user.weight}/>,
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
