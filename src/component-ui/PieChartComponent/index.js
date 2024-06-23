import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
    { id: 0, value: 10, label: 'series A' },
    { id: 1, value: 15, label: 'series B' },
    { id: 2, value: 20, label: 'series C' },
];
const PieChartComponent = (props) =>{

    // const [chartData, setChartData] = useState()
    // useEffect(() => {
    //     setChartData([...props.data])
    // }, []);
    return(
        <div>
            <Typography className="sub-header">{props.title}</Typography>
            <PieChart sx={{margin:'0 auto'}}
                series={[
                    {
                        data: props.chartData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 50,
                        outerRadius:100,

                    },
                ]}
                height={200}
            />

        </div>
    )
}
export default PieChartComponent;