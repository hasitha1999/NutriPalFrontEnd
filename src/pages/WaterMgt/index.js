import React, {useEffect, useState} from 'react'
import {Box, Card, Grid} from '@mui/material';
import WaterIntake from "../../component-content/WaterIntakeInformation";
import WaterIntakeHistory from '../../component-content/WaterIntakeHistory';
import { CustomPaper } from "../../theme/CustomThemeComponents";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import OpacityIcon from '@mui/icons-material/Opacity';
import {getAverageWaterIntake} from "../../use-cases/get-average-water-intake";
import {getUserDetails} from "../../use-cases/get-user-details";
import {getWeekWaterIntakeData} from "../../use-cases/get-week-water-intake-data";

const getCurrentDateFormatted = ()=> {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  return `${year}-${day}-${month}`;
}

const WaterMgt = () => {

    const [cards, setCards] = useState([
        { color: "#46f280", label: "Weekly Average", backgroundColor: '#46f280', unit: "ML / DAY" },
        { color: "#34a8eb", label: "Monthly Average", backgroundColor: '#34a8eb', unit: "ML / Month" },
        { color: "#f2c968", label: "Average Completion", backgroundColor: '#f2c968', unit: "%" },
    ]);

    const [waterDataStatList, setWaterDataStatList] = useState([])

    useEffect(() => {
        getAverageWaterIntakeValues();
        getWeekWaterIntakeDataList();

    }, []);

  const getAverageWaterIntakeValues = () =>{
      let waterAverageValues = {week : 0, month:0}
      getAverageWaterIntake("Month").then((e)=>{
          console.log("Month",e);
          waterAverageValues.month = e.data.averagewaterIntake;
          setCards(prevCards => [
              {
                  ...prevCards[0],
                  unit: `${e.data.averagewaterIntake?.toFixed(2)} ML/DAY`
              },
              ...prevCards.slice(1)
          ]);

      })
      getAverageWaterIntake("Week").then((e)=>{
          console.log("Week",e);
          waterAverageValues.week = e.data.averagewaterIntake;
          setCards(prevCards => [
              ...prevCards.slice(0, 1),
              {
                  ...prevCards[1],
                  unit: `${e.data.averagewaterIntake?.toFixed(2)} ML/Month`
              },
              ...prevCards.slice(2)
          ]);

      })
      return waterAverageValues;
  }

  const getWeekWaterIntakeDataList = () =>{
      getWeekWaterIntakeData().then((e)=>{
          console.log("getWeekWaterIntakeData",e.data)
          setWaterDataStatList(e.data)
      })
      console.log("waterDataStatList",waterDataStatList)
  }

  return (
    <div>
      <CustomPaper style={{ width: '90%', padding: '20px', borderRadius: '15px', background: 'linear-gradient(135deg, #5D87FF 0%, #9DAAFF 100%)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
                <OpacityIcon sx={{ color: 'white', mr: 1 }} />
                <Typography className="main-header" sx={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                  Water Management
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <EventNoteIcon sx={{ color: 'white', mr: 1 }} />
                <Typography className="main-header" sx={{ color: 'white', fontSize: '18px' }}>
                    {getCurrentDateFormatted()}
                </Typography>
            </Box>
        </Stack>
    </CustomPaper>
      <CustomPaper style={{ width: '90%' }}>
          <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                  <WaterIntake sx={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12} md={4}>
                  <WaterIntakeHistory sx={{ width: '100%' }} waterHistoryList={waterDataStatList}/>
              </Grid>
          </Grid>
          <Card sx={{ p: 2, mt: 4 }} elevation={0}>
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
                      Drink Water Report
                  </Typography>
              </Stack>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                  {cards.map((data, index) => (
                      <Grid item xs={12} md={4} key={index}>
                          <Card sx={{ p: 1, height: '100px', backgroundColor: data.backgroundColor || 'defaultColor' }}>
                              <Stack spacing={2} justifyContent="space-between" alignItems="center" direction="row" sx={{ height: '100%' }}>
                                  <div style={{ background: data.color, borderRadius: "50%", width: "15px", height: "15px" }}></div>
                                  <Typography variant="body1" sx={{ fontSize: '20px' }}>{data.label}</Typography>
                                  <Typography variant="body1" sx={{ fontSize: '20px' }}>{data.unit}</Typography>
                              </Stack>
                          </Card>
                      </Grid>
                  ))}
              </Grid>
          </Card>
      </CustomPaper>

    </div>
  );
};


export default WaterMgt;