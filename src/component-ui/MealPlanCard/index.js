import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react'

const MealPlanCard = (props) => {
  const watchMore = ()=> {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(props.itemData.Name)}`;
    window.open(youtubeSearchUrl, '_blank');
  }
  return (
    <div><Card sx={{ maxWidth: 345, background:'#bfffde' }}>
    <CardHeader
        sx={{textAlign:'center'}}
        title={props.itemData.label} 
    />
    <CardContent sx={{height:150, overflow:'hidden'}}>
      <Typography>Calories <span style={{float:"inline-end"}}>{props.itemData.Calories} kCal</span></Typography>
      <Typography>CarbohydrateContent <span style={{float:"inline-end"}}>{props.itemData.CarbohydrateContent} g</span></Typography>
      <Typography>CholesterolContent <span style={{float:"inline-end"}}>{props.itemData.CholesterolContent} mg</span></Typography>
      <Typography>FiberContent <span style={{float:"inline-end"}}>{props.itemData.FiberContent} g</span></Typography>
      <Typography>FatContent <span style={{float:"inline-end"}}>{props.itemData.FatContent} g</span></Typography>
          
    </CardContent>
    <CardActions sx={{justifyContent: 'flex-end' }}>
        <Button size="small" color="success" variant="contained" onClick={watchMore}>Watch more</Button>
    </CardActions>
</Card></div>
  )
}

export default MealPlanCard;