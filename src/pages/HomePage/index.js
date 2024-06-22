import React, {useEffect, useState} from 'react'
import {Box} from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {CustomPaper} from "../../theme/CustomThemeComponents";
import Widget from "../../component-ui/Widget/index";
import Stack from "@mui/material/Stack";
import GaugeChart from "../../component-ui/GaugeChart";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";



const HomePage = () => {
  const role = sessionStorage.getItem("ROLE");
  const MySwal = withReactContent(Swal);

    const getCurrentDateFormatted = ()=> {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        return `${year}-${day}-${month}`;
    }
    const [category,setCategory] = useState();
    const [profileInfo,setProfileInfo] = useState({weight:285,height:180,gender:1,activeLevel:2,goal:"Weight Loss",firstName:"Hasitha",lastName:"Lakmal",useId:"1560",email:"hasithalakmal@gmail.com",dob:"1999/06/17",});
    const [bmiColor,setBMIColor] = useState();
    const [bmi,setBMI] = useState(0);

    useEffect(()=>{
        BMICalculator()
    },[])
    const BMICalculator = () => {
        let bmivalue = Math.round(profileInfo.weight*10/((profileInfo.height/100) ** 2))/10
        setBMI(bmivalue);
        if (bmivalue > 40) {
            setCategory("extreme obese")
            setBMIColor("#fe4d01")
        } else if (bmivalue > 30) {
            setCategory("obese")
            setBMIColor("orange")
        } else if (bmivalue > 25) {
            setCategory("over weight")
            setBMIColor("#B5970a")
        } else if (bmivalue > 18.5) {
            setCategory("normal")
            setBMIColor("green")
        } else {
            setCategory("under weight")
            setBMIColor("blue")
        }
    };
  return (
    <div>
        <CustomPaper style={{width:'90%'}}>
            <Stack direction="row" justifyContent="space-between">
                <Typography className="main-header">Dashboard</Typography>
                <Typography className="main-header">{getCurrentDateFormatted()}</Typography>
            </Stack>
        </CustomPaper>

        <CustomPaper style={{width:'90%'}}>
            <Stack direction="row">
                <Widget imgSrc="/img/Dashboard/water.png" mainTitle="2500 kCal" value="90" hasImage={true}></Widget>
                <Widget imgSrc="/img/Dashboard/weight.png" mainTitle="45 g" value="90" hasImage={true}></Widget>
                <Widget imgSrc="/img/Dashboard/bmi.png" mainTitle="139-202 g" value="90" hasImage={true}></Widget>
                <Widget imgSrc="/img/Dashboard/calories.png" mainTitle="32-135 g " value="90" hasImage={true}></Widget>
            </Stack>
        </CustomPaper>

        <CustomPaper style={{width:'90%'}}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                    <GaugeChart title="Today Water Intake"/>
                    <GaugeChart title="Today Calery Intake"/>
                    </Grid>
                </Grid>

                <Grid item>

                        <img
                            width="150px"
                            height="380px"
                            src={`img/${category}_${profileInfo.gender === 1?"boy":"girl"}.webp`}
                            alt="BMIImage"
                        />
                        <h2 style={{ margin: "2px", color: bmiColor }}>{category}</h2>
                </Grid>
            </Grid>
        </CustomPaper>


       <Box sx={{align:"center"}}>
       </Box>
    </div>
  );
}

export default HomePage;