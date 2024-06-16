import React, { useState, useEffect } from "react";
import {WidgetTheme} from "../../theme/CustomThemeComponents"
import {Typography} from "@mui/material";

const Widget = (props) =>{

    return(
        <WidgetTheme>
            <div>

                <Typography className="main-header">{props.mainTitle}</Typography>
                <Typography className="title-header">{props.value}</Typography>
            </div>
        </WidgetTheme>
    )


}
export default Widget