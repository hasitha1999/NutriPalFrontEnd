import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';


const RecipeCard = (props) =>{
    return (
        <Card sx={{ maxWidth: 345, background:'#bfffde' }}>
            <CardHeader
                sx={{textAlign:'center'}}
                title={props.title} // Title goes here
                // subheader="Green Iguana" // Subtitle or additional info
            />

            <CardMedia
                sx={{ height: 140 }}
                image={props.image}
                title="green iguana"
            />
            <CardContent sx={{height:120, overflow:'hidden'}}>

                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'flex-end' }}>
                <Button size="small" color="success" variant="contained">Add</Button>
                <Button size="small" color="success" variant="contained">Read More</Button>
            </CardActions>
        </Card>
    );

}
export default RecipeCard;