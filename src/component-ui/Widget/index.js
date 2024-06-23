import React, { useState, useEffect } from "react";
import {WidgetTheme} from "../../theme/CustomThemeComponents"
import {Tooltip, Typography} from "@mui/material";

const Widget = (props) =>{

    return(

        <WidgetTheme>
            <div>
                <img src={props.imgSrc} alt="Example" className="responsive-img"/>
                <Tooltip title={props.tooltipTitle}>
                    <Typography className="main-header">{props.mainTitle}</Typography>
                </Tooltip>
                <Typography className="title-header">{props.value}</Typography>
            </div>
        </WidgetTheme>
    )


}
export default Widget