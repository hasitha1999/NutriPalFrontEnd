import React, {useEffect} from 'react'
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

const getCurrentDateFormatted = ()=> {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');

  return `${year}-${day}-${month}`;
}

const WaterMgt = () => {

  const cardData = [
    { color: "#46f280", label: "Weekly Average", backgroundColor: '#46f280', unit: "ML / DAY" },
    { color: "#34a8eb", label: "Monthly Average", backgroundColor: '#34a8eb', unit: "ML / DAY" },
    { color: "#f2c968", label: "Average Completion", backgroundColor: '#f2c968', unit: "%" },
];

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
                  <WaterIntakeHistory sx={{ width: '100%' }} />
              </Grid>
          </Grid>
          <Card sx={{ p: 2, mt: 4 }} elevation={0}>
              <Stack spacing={{ xs: 2, md: 12 }} justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                  <Typography variant="body1" sx={{ mb: 1, fontSize: '25px' }}>Drink Water Report</Typography>
              </Stack>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                  {cardData.map((data, index) => (
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