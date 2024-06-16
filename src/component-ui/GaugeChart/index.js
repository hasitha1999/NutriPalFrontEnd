import React from "react";
import { Gauge } from '@mui/x-charts/GaugeChart';

const GaugeChart = (props) =>{
    const [presentageValue, setPresentageValue] = React.useState(0)
    const propValueCalculator = () =>{
        if (props.value != 0){
            


        }
    }
    return(
        <div>
            <div>{props.title}</div>
            <Gauge width={100} height={100} value={props.value} />
        </div>
    )
}

export default GaugeChart;