import React, {useEffect} from 'react'
import {Card, CardContent, LinearProgress, Typography} from '@mui/material';
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
        <Stack spacing={{ xs: 2, md: 12 }} justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                <Typography variant="body1" sx={{ mb: 1, fontSize: '25px' }}>Water Tracker</Typography>
        </Stack>
        <CardContent sx={{ ml: 15, color: "#878787", margin: '0 4%' }}>
            <Stack spacing={{ xs: 2, md: 12 }} justifyContent="center" alignItems="flex-start" direction={{ xs: 'column', md: 'row' }} sx={{ marginTop: '50px' }}>
                <GaugeChart width={400} height={400} value={currentWaterIntake}/>
                <Stack spacing={3} justifyContent="center" alignItems="center" direction="column" sx={{ marginTop: '50px' }}>
                    <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px' }} onClick={() => waterMeterCalculator(150)} loading={isButtonLoading}>ADD 150 ML</CustomButton>
                    <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px' }} onClick={() => waterMeterCalculator(200)} loading={isButtonLoading}>ADD 200 ML</CustomButton>
                    <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px' }} onClick={() => waterMeterCalculator(250)} loading={isButtonLoading}>ADD 250 ML</CustomButton>
                    <CustomButton variant="contained" startIcon={<LocalDrinkIcon />} sx={{ width: '200px', height: '80px' }} onClick={() => waterMeterCalculator(500)} loading={isButtonLoading}>ADD 500 ML</CustomButton>
                </Stack>
            </Stack>
        </CardContent>
        </Card>
    </div>
  );
}

export default WaterIntakeInformation;