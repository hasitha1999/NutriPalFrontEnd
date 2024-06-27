import React, {useEffect, useState} from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

const LineChartComponent = (props)=>{
    return (
        <LineChart
            xAxis={[{ data: props.xAxisData, hideTooltip: true }]}
            series={[
                {
                    data: props.yAxisData,
                    area: true,
                },
            ]}
            width={500}
            height={300}
        />
    );
}

export default LineChartComponent;
