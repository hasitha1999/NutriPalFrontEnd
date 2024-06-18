import React from "react";
import {Typography} from "@mui/material";
import {Gauge} from "@mui/x-charts";


const GaugeChart = (props) =>{
    const [presentageValue, setPresentageValue] = React.useState(0)
    const propValueCalculator = () =>{
        if (props.value != 0){
            


        }
    }
    return(
        <div>
            <Typography className="sub-header">{props.title}</Typography>
            <Gauge width={180} height={180} value={props.value} />
        </div>
    )
}

export default GaugeChart;