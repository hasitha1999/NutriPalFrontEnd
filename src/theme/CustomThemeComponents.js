import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const CustomButton = styled(Button)(({ theme }) => ({
    fontSize: '1.25rem',
    padding: '12px 24px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '8px 16px',
    },
}));

export const CustomPaper = styled(Paper) (({theme}) =>({
    padding : '15px 15px',
    margin : '20px auto',
    width : '80%',
    '& .main-header': {
        fontSize: '2rem',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    '& .second-header' : {
        fontSize: '1.25rem',
        fontWeight: 'bold'
    },
    '& .title-header' : {
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    '& .sub-header' : {
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center'
    },

}))

export const StackLayout = ({ parameter1,stylePack , titleClass='title-header', serving}) => {
    return (
        <Stack
            width= "100%"
            margin="2px auto"
            padding= "1px"
            direction= "row"
            justifyContent= "space-between"
            spacing={2}
            borderBottom = '0.2px dotted #747575'
        >
                <div><Typography className={titleClass}>{parameter1?.label} </Typography></div>
            <div>{(parameter1?.quantity / serving).toFixed(2)}{parameter1?.unit}</div>
        </Stack>
    );
};

export const WidgetTheme =  styled(Paper)(({theme}) =>({
    background:theme.palette.secondary.light,
    padding : '10px 10px',
    margin : '20px auto',
    width : '20%',
    '& .main-header': {
        fontSize: '1.5rem',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    '& .title-header' : {
        fontSize: '1rem',
        textAlign: 'center',
        fontWeight: 400
    },
    '& .responsive-img' : {
        width: '20%',
        height: 'auto',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'block'
    }

}))