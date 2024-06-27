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
import LineChartComponent from "../../component-ui/LineChartComponent";
import {getDailyLogDataListByMonth} from "../../use-cases/get-dailylog-data-list-by-month";
import OpacityIcon from "@mui/icons-material/Opacity";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';



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


    const [pieChartDataList, setPieChartDataList] = useState([]);
    const [gaugeChartDataList, setGaugeChartDataList] = useState([]);
    const [statisticDataList, setStatisticDataList] = useState({});
    const [lineChartXAxisData,setLineCharXAxistData] = useState([]);
    const [lineChartYAxisData,setLineCharYAxistData] = useState([])

    useEffect(()=>{
        getPieChartDataList()
        getGaugeChartDataList()
        statisticData()
        getChartDataByType()

    },[]);
    useEffect(() => {
        console.log("Updated lineChartXAxisData", lineChartXAxisData);
    }, [lineChartXAxisData]);

    useEffect(() => {
        console.log("Updated lineChartYAxisData", lineChartYAxisData);
    }, [lineChartYAxisData]);

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

    const getChartDataByType = () =>{

        getDailyLogDataListByMonth("Water").then((e)=>{

            let newDataPoints = [];
            let processedDataPoints = []
            newDataPoints = e.data;
            console.log("newDataPoints", newDataPoints)
            if (newDataPoints.length != 0){
               let xAxisData = newDataPoints.map(item => new Date(item.date))
               let yAxisData = newDataPoints.map(item =>item.userInputValue)
                    // processedDataPoints.push({
                    //     x : new Date(item.date),
                    //     y : item.userInputValue
                    // })
                    setLineCharXAxistData(xAxisData);
                    setLineCharYAxistData(yAxisData);

            }
            console.log("lineChartXAxisData",lineChartXAxisData)



        })


    }

  return (
    <div>
        <CustomPaper style={{ width: '90%', padding: '20px', borderRadius: '15px', background: 'linear-gradient(135deg, #5D87FF 0%, #9DAAFF 100%)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    <DashboardRoundedIcon sx={{ color: 'white', mr: 1 }} />
                    <Typography className="main-header" sx={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
                        Dashboard
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


        <CustomPaper style={{width:'90%'}}>
            <Stack direction="row">

                <Widget imgSrc="/img/Dashboard/water.png" mainTitle="BMR" value={`${statisticDataList.bmr?.toFixed(2)} kCal`} tooltipTitle="Basic Metabolic Rate" hasImage={true}></Widget>
                <Widget imgSrc="/img/Dashboard/weight.png" mainTitle="TDEE" value={statisticDataList.tdee?.toFixed(2)} tooltipTitle="Total Daily Energy Expenditure" hasImage={true}></Widget>
                <Widget imgSrc="/img/Dashboard/bmi.png" mainTitle="Water Intake" value={`${statisticDataList.waterIntake?.toFixed(2)/1000}L`} hasImage={true}></Widget>
                <Widget imgSrc="/img/Dashboard/calories.png" mainTitle="BMI" value={`${statisticDataList.bmi?.toFixed(2)}`}  tooltipTitle="Body Mass Index" hasImage={true}></Widget>

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
                        <img className="responsive-title-img" src="/img/Dashboard/calorie.png" alt="calorie"  style={{width:'50%', height: 'auto'}}/>
                        <div className="second-header">{statisticDataList.totalCalorie} kCal</div>
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
        <Stack direction="row" alignItems="center" >

            <div style={{width:'90%',height: '100%'}}>
                <PieChartComponent chartData={pieChartDataList} title="Total calorie intake"/>

            </div>
            <div>
                <LineChartComponent xAxisData={lineChartXAxisData} yAxisData={lineChartYAxisData}/>
            </div>
        </Stack>
        </CustomPaper>

    </div>
  );
}

export default HomePage;