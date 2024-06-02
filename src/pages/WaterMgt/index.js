import React, {useEffect} from 'react'
import { Box, Card, CardContent, Grid, LinearProgress } from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from '@emotion/styled';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import {getWaterManagmentData} from "../../use-cases/get-water-managment-data";
import {createOrUpdateDailyLog} from "../../use-cases/create-or-update-daily-log";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 5,
}));
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
        getWaterManagmentData().then((e)=>{
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
          <CardContent sx={{ ml: 15,color: "#878787"}}>
            <Grid xs={1} md={1} >

                <img
                  width="50px"
                  height="80px"
                  src={`img/start.png`}
                  alt="BMIImage"
                  sx={{display:"flex",justifyContent:"flex-start"}}
                />
            </Grid>
            <Grid xs={8} md={8}>
            <Box sx={{ width: '80%'}}>
              <BorderLinearProgress color={currentWaterIntake >= 100 ? "warning":"success"} variant="determinate" value={currentWaterIntake >= 100 ? 100 : currentWaterIntake}/>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" color="success" startIcon={<LocalDrinkIcon />} onClick={()=>waterMeterCalculator(50)} loading={isButtonLoading}>50 ml</Button>
                    <Button variant="contained" color="success" startIcon={<LocalDrinkIcon />} onClick={()=>waterMeterCalculator(100)} loading={isButtonLoading}>100 ml</Button>
                    <Button variant="contained" color="success" startIcon={<LocalDrinkIcon />} onClick={()=>waterMeterCalculator(250)} loading={isButtonLoading}>250 ml</Button>
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