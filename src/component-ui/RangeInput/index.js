import React from 'react'
import { CustomTextField } from '../CustomTextField/CustomTextField'
import { Grid, InputAdornment, Stack, Typography } from '@mui/material'

const RangeInput = (props) => {
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