import React, {useEffect} from 'react'
import {Box, Card, CardContent, Grid, LinearProgress, Typography} from '@mui/material';
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
const WaterMgt = () => {
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
console.log("llll",waterIntake);

  return (
    <div>
      <Grid xs={12} md={12} >
        <Card
          sx={{
            m: 1,
            borderRadius: 3,
            border: "1px solid #000",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            mt:3,
            height:"485px"
          }}
        >
          <CardContent sx={{ ml: 15,color: "#878787", margin: '0 2%'}}>
              <div style={{marginBottom:'80px'}}>
              <Typography variant="h5" sx={{marginLeft:"20px",marginTop:"10px", textAlign:"center", color:'#101516'}} >
                  Today your target is <span style={{color:'#1976d2', background: '#000', padding:'1px 2px', borderRadius:'5px'}}>{waterIntake}</span> milliliters.

              </Typography>
              <Typography variant="h5" sx={{marginLeft:"20px",marginTop:"10px", textAlign:"center", color:'#101516'}} >
                  Your current water intake is {currentWaterIntake} milliliters
              </Typography>
              </div>
            {/*<Grid xs={1} md={1} >*/}

            {/*    <img*/}
            {/*      width="50px"*/}
            {/*      height="80px"*/}
            {/*      src={`img/start.png`}*/}
            {/*      alt="BMIImage"*/}
            {/*      sx={{display:"flex",justifyContent:"flex-start"}}*/}
            {/*    />*/}
            {/*</Grid>*/}
            <Grid xs={8} md={8}>
            <Box sx={{ width: '100%'}}>
             <Stack
                 spacing={{ xs: 2, md: 5 }}
                 alignItems="center"
                 direction="row"
             >
              <CustomStartIcon color="success"/>
                 <div style={{width:'90%'}}>
                     <BorderLinearProgress color={currentWaterIntake >= 100 ? "warning":"success"} variant="determinate" value={currentWaterIntake >= 100 ? 100 : currentWaterIntake}/>
                 </div>
              <CustomEndIcon color="success"/>
             </Stack>
                <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }} sx={{marginTop: '50px'}}>
                    <CustomButton variant="contained"  startIcon={<LocalDrinkIcon />} onClick={()=>waterMeterCalculator(50)} loading={isButtonLoading} >50 ml</CustomButton>
                    <CustomButton variant="contained"  startIcon={<LocalDrinkIcon />} onClick={()=>waterMeterCalculator(100)} loading={isButtonLoading}>100 ml</CustomButton>
                    <CustomButton variant="contained"  startIcon={<LocalDrinkIcon />} onClick={()=>waterMeterCalculator(250)} loading={isButtonLoading}>250 ml</CustomButton>
                </Stack>
            </Box>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default WaterMgt;