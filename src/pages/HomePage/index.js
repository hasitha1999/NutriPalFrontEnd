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
import PieChartComponent from "../../component-ui/PieChartComponent";
import {getPieChartData} from "../../use-cases/get-pie-chart-data";
import  {getGaugeChartData} from "../../use-cases/get-gauge-chart-data";
import {getStatisticDashboardData} from "../../use-cases/get-statistic-dashboard-data";


const HomePage = () => {
  const role = sessionStorage.getItem("ROLE");
  const MySwal = withReactContent(Swal);

    const getCurrentDateFormatted = ()=> {
        // Get current date
        const currentDate = new Date();

        // Extract year, date and month
        const year = currentDate.getFullYear();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        // Format the date
        return `${year}-${day}-${month}`;
    }


    const [pieChartDataList, setPieChartDataList] = useState([]);
    const [gaugeChartDataList, setGaugeChartDataList] = useState([]);
    const [statisticDataList, setStatisticDataList] = useState({});

    useEffect(()=>{
        getPieChartDataList()
        getGaugeChartDataList()
        statisticData()

    },[])

    const getPieChartDataList = () =>{
        getPieChartData().then((e)=>{
            console.log(e)
            if (e.data.length !==0) {
                setPieChartDataList([...e.data])
                console.log("pie", pieChartDataList);
            }

        })

    }
    const getGaugeChartDataList = () =>{
        getGaugeChartData().then((e)=>{
            console.log(e)
            setGaugeChartDataList([...e.data])
        })
    }
    const statisticData = () => {
        getStatisticDashboardData().then((e) =>{
            console.log(e);
            setStatisticDataList({...e.data})
        })
    }

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
                <Widget imgSrc="/img/Dashboard/water.png" mainTitle="BMR" value={`${statisticDataList.bmr?.toFixed(2)} kCal`} tooltipTitle="Basic Metabolic Rate"></Widget>
                <Widget imgSrc="/img/Dashboard/weight.png" mainTitle="TDEE" value={statisticDataList.tdee?.toFixed(2)} tooltipTitle="Total Daily Energy Expenditure"></Widget>
                <Widget imgSrc="/img/Dashboard/bmi.png" mainTitle="Water Intake" value={`${statisticDataList.waterIntake?.toFixed(2)/1000}L`}></Widget>
                <Widget imgSrc="/img/Dashboard/calories.png" mainTitle="BMI" value={`${statisticDataList.bmi?.toFixed(2)}`}  tooltipTitle="Body Mass Index"></Widget>
            </Stack>
        </CustomPaper>

        <CustomPaper style={{width:'90%'}}>
            <span className="second-header">Today Progress</span>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={12}
            >
                <Grid item xs={6} md={3} sx={{marginLeft:'40px', marginRight:'0px', marginTop:'10px'}}>
                    <div className="sub-gray-header" style={{margin: '10px auto'}}>Calories</div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img className="responsive-title-img" src="/img/Dashboard/calorie.png" alt="calorie" />
                        <div className="sub-header">{statisticDataList.totalCalorie} kCal</div>
                    </div>
                </Grid>

                <Grid item xs={6} md={8}>
                    <Grid container spacing={2} justifyContent="flex-end">
                        {gaugeChartDataList.length !== 0 ?gaugeChartDataList.map((chartData, index) => <Grid item> <GaugeChart title={chartData.type} value={chartData.percentage} level={chartData.level}  key={index}/></Grid>):null}
                    </Grid>
                </Grid>

            </Grid>

        </CustomPaper>


        <CustomPaper style={{width:'90%'}}>
            <PieChartComponent chartData={pieChartDataList} title="Total calorie intake"/>
        </CustomPaper>
    </div>
  );
}

export default HomePage;