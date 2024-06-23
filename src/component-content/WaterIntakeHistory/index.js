import React, {useEffect} from 'react'
import {Box, Card, CardContent, Typography} from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from '@emotion/styled';
import Button from "@mui/material/Button";
import {getWaterManagmentData} from "../../use-cases/get-water-managment-data";
import {createOrUpdateDailyLog} from "../../use-cases/create-or-update-daily-log";

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {blue, red } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor:'#1976d2',
    fontSize: '1.25rem',
    padding: '12px 24px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '8px 16px',
    },
}));

const WaterIntakeHistory = () => {
  const role = sessionStorage.getItem("ROLE");
  const MySwal = withReactContent(Swal);
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  const [waterIntake, setWaterIntake] = React.useState(100);
  const [currentWaterIntake, setCurrentWaterIntake] = React.useState(0);
  const [data, setData] = React.useState({});

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        getInitData();
    }, []);

    const getInitData = () =>{
        getWaterManagmentData("Water").then((e)=>{
            let waterIntakeForWeight = Math.round(((e.data.weight * 2.2)/2)*29.574*100)/100;
            if (e.data.logId != null){
                e.data.userInput != 0 ? setCurrentWaterIntake((e.data.userInput/waterIntakeForWeight)*100) : setCurrentWaterIntake(0);
            }
            setData(e.data);
            setWaterIntake(waterIntakeForWeight)
        })
    }


    const sendWaterAmount = (waterAmount) =>{
        let payLoad = {
            logId : data?.logId,
            logType : "Water",
            userInput : data?.userInput + waterAmount,
            weight : data?.weight 
        }
        setIsButtonLoading(true)
        createOrUpdateDailyLog(payLoad).then((e)=>{
            getInitData();
            setIsButtonLoading(false);

        })

    }

    const waterMeterCalculator = (waterAmount) =>{
      let waterAmountPresentage = ((currentWaterIntake+waterAmount)/waterIntake) * 100;
      setCurrentWaterIntake(waterAmountPresentage);
      sendWaterAmount(waterAmount);

  }

    const getCurrentDateFormatted = ()=> {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        return `${year}-${day}-${month}`;
    }

  return (
    <div>
        <Card sx={{ p: 2 }} elevation={4} >
          <CardContent sx={{color: "#878787", margin: '0 4%'}}>
                <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="space-between" alignItems="center" direction={{ xs: 'column', md: 'row' }} sx={{marginTop: '50px'}}>
                    <Typography variant="h1">Water Tracker</Typography>
                    <Typography variant="h1">{getCurrentDateFormatted()}</Typography>
                </Stack>
                <Card sx={{ p: 2, background : "#8bd3f7" }} elevation={4} >   
                        <CardContent sx={{ ml: 1, color: "#878787", background : "#8bd3f7"}}>
                            <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="space-between" alignItems="left" direction={{ xs: 'column', md: 'row' }}>
                                <Typography  variant="body1" sx={{ color: 'white', mb: 1, fontSize: '20px' }}>Weekly Completion</Typography>
                            </Stack> 
                            <Stack direction="row" spacing={8} alignItems="center">
                                {daysOfWeek.map((day, index) => (
                                    <Box key={index} textAlign="center">
                                        <Avatar sx={{ bgcolor: index < 5 ? blue[500] : red[500], width: 70, height: 70 }}>
                                            {index < 6 ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
                                        </Avatar>
                                        <Typography variant="body1" sx={{ color: 'white', mt: 1, fontSize: '20px' }}>
                                            {day}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                </Card>
                <Card sx={{ p: 2, mt: 4 }} elevation={4} >
                    <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                        <Typography  variant="body1" sx={{mb: 1, fontSize: '20px' }}>Drink Water Report</Typography>
                    </Stack>
                    <Card sx={{ p: 1, mt: 0.5}} >
                        <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="space-between" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                            <div style={{ background: "#46f280", borderRadius: "50%", width: "15px", height: "15px" }}></div>
                            <Typography  variant="body1" sx={{mb: 1, fontSize: '20px' }}>Weekly Average</Typography>
                            <Typography  variant="body1" sx={{mb: 1, fontSize: '20px' }}>ML / DAY</Typography>
                        </Stack>
                    </Card>
                    <Card sx={{ p: 1, mt: 0.5 }} >
                        <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="space-between" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                            <div style={{ background: "#34a8eb", borderRadius: "50%", width: "15px", height: "15px" }}></div>
                            <Typography  variant="body1" sx={{mb: 1, fontSize: '20px' }}>Monthly Average</Typography>
                            <Typography  variant="body1" sx={{mb: 1, fontSize: '20px' }}>ML / DAY</Typography>
                        </Stack>
                    </Card>
                    <Card sx={{ p: 1, mt: 0.5 }} >
                        <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="space-between" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                            <div style={{ background: "#f2c968", borderRadius: "50%", width: "15px", height: "15px" }}></div>
                            <Typography  variant="body1" sx={{mb: 1, fontSize: '20px' }}>Average Completion</Typography>
                            <Typography  variant="body1" sx={{mb: 1, fontSize: '20px' }}>%</Typography>
                        </Stack>
                    </Card>
                </Card>
          </CardContent>
        </Card>
    </div>
  );
}

export default WaterIntakeHistory;