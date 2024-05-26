import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { Box, Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#bfffde',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const RecipeCard = (props) =>{

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
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
                <Button size="small" color="success" variant="contained" onClick={handleOpen}>Read More</Button>
            </CardActions>
        </Card>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
          </Typography>
          <CardMedia
                sx={{ height: 140 }}
                image={props.image}
                title="green iguana"
            />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.description}
          </Typography>
        </Box>
      </Modal>

      </>
    );

}
export default RecipeCard;