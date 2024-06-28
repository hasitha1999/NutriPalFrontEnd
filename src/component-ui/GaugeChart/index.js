import React from "react";
import {Typography} from "@mui/material";
import {Gauge, gaugeClasses } from "@mui/x-charts";


const GaugeChart = (props, width = 120, height = 120) =>{

    console.log(props.level)

    const getGaugeColor = (value) => {
        if (value === "inProgress") {
            return "#5d87ff"

        } else if (value === "archived") {
            return "#13deb9"

        } else if(value === "limitExceed"){
            return "#ffb024"

        }else if (value === "overLimit") {
            return "#fa896b"


        } else {
            return "#2196f3"
        }
    };


    return(
        <div>
            <Typography className="sub-header">{props.title}</Typography>
            <Gauge width={props.width} height={props.height} value={props.value} text={`${Math.round(props.value)}%`}  sx={(theme) => ({
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: getGaugeColor(props.level),
                }
            })} />
        </div>
    )
}

export default GaugeChart;