import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { Box, Grid, Modal } from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from 'react';
import { useEffect } from 'react';
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
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [content,setContent] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addToSave = () => {
    // editUser(user).then(()=>{MySwal.fire("success!", "Successfully saved", "success");}).catch((e)=>{
    //    MySwal.fire("ERROR", "Please contact admin", "error");
    // });
  }

  // useEffect(()=>{contentBuilder()},[])

  // const contentBuilder =() =>{
  //   for (let index = 0; index < 5; index++) {
  //       setContent((prevState) => ({
  //           ...prevState,
  //           [props.itemData.digest[index].label]: props.itemData.digest[index].label,
  //         }));
      
  //   }
  // }

    return (
        <>
        <Card sx={{ maxWidth: 345, background:'#bfffde' }}>
            <CardHeader
                sx={{textAlign:'center'}}
                title={props.title} 
            />
            <CardMedia
                sx={{ height: 140 }}
                image={props.image}
                title="green iguana"
            />
            <CardContent sx={{height:120, overflow:'hidden'}}>
                {props.itemData.recipe.digest.map((item,index)=>{
                  if(index < 4){
                      return <Typography>{item.label}______________________{(item.total).toFixed(2)}{item.unit}</Typography>
                  }
                })}
            </CardContent>
            <CardActions sx={{justifyContent: 'flex-end' }}>
                <Button size="small" color="success" variant="contained" onClick={addToSave}>Add</Button>
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