import React, {useEffect} from 'react'
import {Card, CardContent, LinearProgress, Typography, Grid, Box} from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from '@emotion/styled';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import {getWaterManagmentData} from "../../use-cases/get-water-managment-data";
import {createOrUpdateDailyLog} from "../../use-cases/create-or-update-daily-log";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GaugeChart from '../../component-ui/GaugeChart';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: ResponsiveLinearProgress(),
    borderRadius: 5,
}));

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor:'#1976d2',
    fontSize: '1.25rem',
    padding: '12px 24px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '8px 16px',
    },
}));

const CustomEndIcon = styled(AssignmentTurnedInIcon)(({theme}) =>({
    fontSize: '64px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '32px',
    },
}))

const CustomStartIcon = styled(SportsScoreIcon)(({theme}) => ({
    fontSize: '64px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '32px',
    },
}))


const ResponsiveLinearProgress = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));


    let progressBarHeight;

    if (isSmallScreen) {
        progressBarHeight = 30; // height for small screens
    } else if (isMediumScreen) {
        progressBarHeight = 50; // height for medium screens
    } else if (isLargeScreen) {
        progressBarHeight = 70; // height for large screens
    }

    return  progressBarHeight ;
};
const WaterIntakeInformation = () => {
  const role = sessionStorage.getItem("ROLE");
  const MySwal = withReactContent(Swal);
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  const [waterIntake, setWaterIntake] = React.useState(100);
  const [currentWaterIntake, setCurrentWaterIntake] = React.useState(0);
  const [data, setData] = React.useState({});


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

  return (
    <div>
        <Card sx={{ p: 2, mt: 4 }} elevation={4}>
        <Stack spacing={{ xs: 2, md: 12 }} justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }} sx={{ 
                padding: '15px', 
                borderRadius: '10px', 
                background: '#5D87FF', 
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' 
            }}>
            <Typography variant="h4" sx={{ 
                    mb: 1, 
                    fontSize: { xs: '15px', md: '25px' }, 
                    color: 'white', 
                    textAlign: 'center'
                }}>
                Water Tracker
            </Typography>
        </Stack>
            <CardContent sx={{ color: "#878787", margin: '0 1%' }}>
                <Grid container spacing={4} sx={{ marginTop: '30px' }}>
                    <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <GaugeChart width={400} height={400} value={currentWaterIntake}/>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px', mb: 2 }} onClick={() => waterMeterCalculator(150)} loading={isButtonLoading}>ADD 150 ML</CustomButton>
                        <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px', mb: 2 }} onClick={() => waterMeterCalculator(200)} loading={isButtonLoading}>ADD 200 ML</CustomButton>
                        <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px', mb: 2 }} onClick={() => waterMeterCalculator(250)} loading={isButtonLoading}>ADD 250 ML</CustomButton>
                        <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px', mb: 2 }} onClick={() => waterMeterCalculator(500)} loading={isButtonLoading}>ADD 500 ML</CustomButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </div>
  );
}

export default WaterIntakeInformation;