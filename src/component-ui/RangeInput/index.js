import React from 'react'
import { CustomTextField } from '../CustomTextField/CustomTextField'
import { Grid, InputAdornment, Stack, Typography } from '@mui/material'

const RangeInput = (props) => {
  console.log(props.formErrorMessages);
  return (
    <> 
    
    <Grid container sx={{m:2}}>
        <Grid item lg={2}>
        <Typography sx={{m:2}}>{props.name}</Typography>
        </Grid>
        <Grid item lg={10}>
            <Stack direction="row"> 
        <CustomTextField
    name={props.name+"Min"}
    onChange={props.handleChange}
    defaultValue = "Min"
    value = {props.values[1]}
    required
    type="number"
    error={props.formErrorMessages[props.name+"Min"]?true:false}
    helperText={props.formErrorMessages[props.name+"Min"]}
    InputProps={{
        endAdornment : <InputAdornment position="end">g</InputAdornment>
      }}
  />
  <span style={{margin:"4px", marginTop:"15px"}}> - </span>
          <CustomTextField
    name={props.name+"Max"}
    onChange={props.handleChange}
    defaultValue = "Max"
    value = {props.values[0]}
    required
    type="number"
    error={props.formErrorMessages[props.name+"Max"]?true:false}
    helperText={props.formErrorMessages[props.name+"Max"]}
    InputProps={{
        endAdornment : <InputAdornment position="end">g</InputAdornment>
      }}
  />
  </Stack>
  </Grid>
  </Grid >
  </>
  )
}

export default RangeInput