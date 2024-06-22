import { Box, Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabButton from "../TabButton";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CustomTabs = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
      >
        {props.tabValues.map((tab, index) => (
          <Tab
            label={<TabButton active={value === index}>{tab.label}</TabButton>}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      {props.tabValues.map((tab, index) => (
        <CustomTabPanel value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </>
  );
};

export default CustomTabs;