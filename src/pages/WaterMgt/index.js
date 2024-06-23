import React, {useEffect} from 'react'
import {Box} from '@mui/material';
import WaterIntake from "../../component-content/WaterIntakeInformation";
import WaterIntakeHistory from '../../component-content/WaterIntakeHistory';
import OpacityIcon from '@mui/icons-material/Opacity';
import HistoryIcon from '@mui/icons-material/History';
import CustomTabs from "../../component-ui/CustomTabs";

const WaterMgt = () => {

  const tabValues = [
    {
      label: (
        <Box sx={{ display: "flex" }}>
          <OpacityIcon sx={{ marginRight: 1 }} />
          WATER METER
        </Box>
      ),
      component: <WaterIntake />,
    },
    {
      label: (
        <Box sx={{ display: "flex" }}>
          <HistoryIcon sx={{ marginRight: 1 }} />
          HISTORY
        </Box>
      ),
      component: <WaterIntakeHistory />,
    }
  ];

  return (
    <div>
      <CustomTabs tabValues={tabValues} />
    </div>
  );
};


export default WaterMgt;