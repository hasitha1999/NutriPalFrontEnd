import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { Box, Divider, Grid, Modal, Stack } from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from 'react';
import { useEffect } from 'react';
import { CustomPaper, StackLayout } from '../../theme/CustomThemeComponents';
import { Link } from 'react-router-dom';
import { saveRecepie } from '../../use-cases/api-recepie';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const subStyles = {
    width :"100%",
    margin :"2px auto",
    padding : "1px",
    direction : "row",
    justifyContent : "space-between",
    spacing : 2,
    borderBottom : '0.2px dotted #747575'
  }
  

const RecipeCard = (props) =>{
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [totalNutrient,setTotalNutrient] = useState(props.itemData.totalNutrients);
  const [serving,setServing] = useState(props.itemData.yield);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addToSave = () => {
    saveRecepie({recipieURI:props.itemData.uri}).then(()=>{MySwal.fire("success!", "Successfully saved", "success");}).catch((e)=>{
       MySwal.fire("ERROR", "Please contact admin", "error");
    });
  }
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
      window.open(youtubeSearchUrl, '_blank');
    }
  };

    return (
        <>
        <Card sx={{ maxWidth: 360, background:'#E8F7FF',minHeight:400 }}>
            <CardHeader
                sx={{textAlign:'center',minHeight: 100 }}
                title={props.title} 
            />
            <CardMedia
                sx={{ minHeight: 150 }}
                image={props.image}
                title="green iguana"
            />
            <CardContent sx={{minHeight:120, overflow:'hidden'}}>
                {props.itemData.digest.map((item,index)=>{
                  if(index < 4){
                      return <Typography>{item.label}<span style={{float:"inline-end"}}>{(item.total/serving).toFixed(2)}{item.unit}</span></Typography>
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
          <div>
          <Typography className="main-header" variant="h4">
          {props.title}
          </Typography>
          <CustomPaper elevation={24}>
          <Typography className="second-header">Amount Per Serving<span style={{float:"inline-end"}}>{(props.itemData.calories/serving).toFixed(2)} kCal</span></Typography>
          <Divider/>
          <Stack justifyContent="space-between" style={{marginTop: "10px"}}>

            <StackLayout parameter1={totalNutrient['FAT']} serving ={serving}/>
            <Stack justifyContent="space-evenly" alignItems="flex-end" direction="column" style={{width: '90%', marginLeft: 'auto', marginBottom: '5px'}}>
              <StackLayout parameter1={totalNutrient['FASAT']} titleClass="sub-header"  stylePack={{subStyles}} serving ={serving}/>
              <StackLayout serving ={serving} parameter1={totalNutrient['FATRN']} titleClass="sub-header"/>
            </Stack>

            <StackLayout serving ={serving} parameter1={totalNutrient['CHOLE']}/>
            <StackLayout serving ={serving} parameter1={totalNutrient['NA']} />

            <StackLayout serving ={serving} parameter1={totalNutrient['CHOCDF.net']}  />
            <Stack justifyContent="space-evenly" alignItems="flex-end" direction="column" style={{width: '90%', marginLeft: 'auto', marginBottom: '5px'}}>
              <StackLayout serving ={serving} parameter1={totalNutrient['SUGAR']} titleClass="sub-header"/>
              <StackLayout serving ={serving} parameter1={totalNutrient['FIBTG']} titleClass="sub-header"/>
            </Stack>

            <StackLayout serving ={serving} parameter1={totalNutrient['PROCNT']}  />
            <StackLayout serving ={serving} parameter1={totalNutrient['CA']}   />
            <StackLayout serving ={serving} parameter1={totalNutrient['FE']}  />
          </Stack>
          </CustomPaper>

          <Typography id="modal-modal-title" variant="h6" component="h2" >
            Recepie : <a  onClick={()=>{handleSearch(props.title)}}>Click here to watch recepie</a>
          </Typography>
          </div>
        </Box>
      </Modal>

      </>
    );

}
export default RecipeCard;