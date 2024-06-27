import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { Box, Divider, Grid, IconButton, Modal, Paper, Stack, Tooltip, styled } from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect } from 'react';
import { CustomPaper, StackLayout } from '../../theme/CustomThemeComponents';
import { Link } from 'react-router-dom';
import { recipeMarkAsEat, removeRecipe, saveRecepie } from '../../use-cases/api-recepie';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DeleteIcon from '@mui/icons-material/Delete';
import { FavoriteBorder } from '@mui/icons-material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#fff',
    border: '1px solid #000',
    borderRadius : "10px",
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
  const CustomButton = styled((props) => <Button {...props} />)(
    ({ theme }) => ({
        backgroundColor:theme.palette.grey[500]
    })
  );
const RecipeCard = (props) =>{
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [totalNutrient,setTotalNutrient] = useState(props.itemData.totalNutrients);
  const [serving,setServing] = useState(props.itemData.yield);
  const [digest,setDigest] = useState(props.itemData.digest.slice(0, 3))
  const [calories,setCalories] = useState(0);
  console.log(props);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(()=>{
    caloriesCal(digest);
  },[])
  const addToSave = () => {
    let recipe = {image:props.image,title:props.title,itemData:JSON.stringify({digest:digest,calories:props.itemData.calories,yield:props.itemData.yield,totalNutrients:props.itemData.totalNutrients})}
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!"
    }).then((result) => {
      if (result.isConfirmed) {
        saveRecepie(recipe).then(()=>{MySwal.fire("success!", "Successfully saved", "success");
          window.location.reload();
        }).catch((e)=>{
          MySwal.fire("ERROR", "Please contact admin", "error");
       });
      }
    });

  }
  const RemoveFromSave = ()=>{
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeRecipe({recipeId:props.recipeId}).then(()=>{
          props.loadAllrecepie();
          MySwal.fire("success!", "Successfully removed", "success");}
        ).catch((e)=>{
          MySwal.fire("ERROR", "Please contact admin", "error");
       });
      }
    });
  }
  const markAsEat=()=>{
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,I'm Eat it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let eatNutriant = {}
        {digest.map((item,index)=>{
          if(item.label == "Fat"){
            eatNutriant["fat"]=(item.total/serving).toFixed(2)
          }else if (item.label == "Carbs"){
            eatNutriant["carbs"]=(item.total/serving).toFixed(2)
          }else if(item.label == "Protein"){
            eatNutriant["protein"]=(item.total/serving).toFixed(2)
          } 
      })}
      eatNutriant["calorie"]=(calories/serving).toFixed(2)
        recipeMarkAsEat(eatNutriant).then(()=>{MySwal.fire("success!", "Successfully saved", "success");}).catch((e)=>{
          MySwal.fire("ERROR", "Please contact admin", "error");
       });
    
      }
    });
    
  }
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
      window.open(youtubeSearchUrl, '_blank');
    }
  };

  const caloriesCal = (digest) =>{
    let calCount = 0
    digest.map((item,index)=>{
    if(item.label == "Fat"){
      calCount = (item.total) * 9
    }else{
      calCount = (item.total) * 4
    }
    setCalories((prev)=>prev + calCount);
      })
  }

    return (
        <>
        <Card elevation={2} sx={{backgroundImage:`url(${props.image})`,minHeight:300,backgroundRepeat: "no-repeat",backgroundSize: "cover"}}>
          <div style={{backgroundColor:"rgba(255, 255, 255, 0.7)",minHeight:300,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <CardHeader
                sx={{textAlign:'center',minHeight: 80 }}
                title={props.title} 
            />
            <CardContent sx={{minHeight:80, overflow:'hidden'}}>
            <Typography>Calories<span style={{float:"inline-end"}}>{(calories).toFixed(2)}kCal</span></Typography>
                {digest.map((item,index)=>{
                    return <Typography>{item.label}<span style={{float:"inline-end"}}>{(item.total).toFixed(2)}{item.unit}</span></Typography>
                  
                })}
            <Typography>serving <span style={{float:"inline-end"}}>{serving}</span></Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'flex-end'}}>

              {props.itemData.digest.length > 4 ?<Tooltip title="Add to favorite" placement="bottom">
                <IconButton  onClick={addToSave} color="black">
                <FavoriteBorder />
                </IconButton>
              </Tooltip>:
              <Tooltip title="Remove from favorite" placement="bottom">
                <IconButton  onClick={RemoveFromSave} color="error">
                    <FavoriteIcon/>
                </IconButton>
              </Tooltip>}
              <Tooltip title="Mark as Eat" placement="bottom">
                <IconButton color="black" onClick={markAsEat}><LocalDiningIcon/></IconButton></Tooltip>
                <Tooltip title="Read More" placement="bottom">
                <IconButton color="black" onClick={handleOpen}><ReadMoreIcon/></IconButton></Tooltip>
            </CardActions>
          </div>
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
          <Typography className="second-header"  style={{marginTop: "15px"}}>Amount Per Serving<span style={{float:"inline-end"}}>{(calories/serving).toFixed(2)} kCal</span></Typography>
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

          <Typography id="modal-modal-title" variant="h6" component="h2"  style={{marginTop: "10px"}} >
            Recepie : <a  onClick={()=>{handleSearch(props.title)}}>Click here to watch recepie</a>
          </Typography>
          </div>
        </Box>
      </Modal>

      </>
    );

}
export default RecipeCard;