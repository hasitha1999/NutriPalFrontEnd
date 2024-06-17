import React, { useEffect, useState } from "react";
import RecipeCard from "../../component-ui/RecipeCard";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { getAllsavedRecepie, savedSearchRecepieApi, searchRecepieApi } from "../../use-cases/api-recepie";


const filterOptions = {
    items: [
        { id: 1, type: 'Diet', name: 'Vegetarian' },
        { id: 2, type: 'Diet', name: 'Vegan' },
        { id: 3, type: 'Diet', name: 'Low-Fat' },
        { id: 4, type: 'Diet', name: 'Keto' },
        { id: 5, type: 'Diet', name: 'Paleo' },
        { id: 6, type: 'Diet', name: 'Mediterranean' },
        { id: 7, type: 'Diet', name: 'Gluten-Free' },
        { id: 8, type: 'Diet', name: 'Low-Carb' },
        { id: 9, type: 'Allergies', name: 'Diary' },
        { id: 10, type: 'Allergies', name: 'Egg' },
    ],
    titles: ['Allergies','Diet'],
};




const RecepieGenarator = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchData,setSearchData] = useState({});
    const [searchResult,setSearchResult] = useState([]);
    const [uriList,setURIList] = useState();

    useEffect(()=>{
        loadAllrecepie();
    },[])

    useEffect(()=>{
        setURIList(searchResult);
    },[searchResult])


 
    const handleChange = (event) => {
        setSearchData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      };
    const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };

    const loadAllrecepie = ()=>{
        getAllsavedRecepie().then((response)=>{
            
            let makelist = [];
            response.data.map((uri)=>{
                savedSearchRecepieApi(uri.recipieURI).then((response)=>{
                    makelist.push(response.data.hits[0]);
                    setSearchResult((prv) => makelist);
                }).catch((e)=>{
                    alert(e)
                });   
            })
        }).catch((e)=>{
        });
    }


    const searchRecepie = () => {
        searchRecepieApi(searchData.searchItemName).then((response)=>{
            setSearchResult(response.data.hits);
        }).catch((e)=>{
        });
    };
   


  return (
    <div>
        <Typography variant="h3" sx={{margin:'15px 0px 0px 20px'}}>Recepie Genarator</Typography>

        <Grid container spacing={3}>
         <Grid xs={12} md={9}>
         <TextField 
         sx={{color:'#000', width: '90%',marginLeft:'9%',marginTop:'5%'}}   
         label="search a recepie" 
         name="searchItemName"
         onChange={handleChange}
         value={searchData.searchItemName}/>
         </Grid><Grid xs={12} md={3} sx={{marginTop:'4%',marginLeft:{xs:"9%",md:'0%'}}}>
            <Button variant="contained" onClick={searchRecepie} sx={{bgcolor:'green',marginLeft:"3px"}}>Search</Button>
            <IconButton  aria-label="fingerprint" color="secondary" onClick={toggleDrawer(true)}>
                <TuneSharpIcon />
            </IconButton>
        </Grid>
        </Grid>

        <Box sx={{ flexGrow: 1, width: '90%', margin:'5px auto' }}>
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {console.log(searchResult)}
                {searchResult.map((item,index)=>(
                    <Grid item xs={2} sm={4} md={3} key={index}>
                        <RecipeCard title={item.recipe.label} image={item.recipe.image} itemData={item.recipe}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 350, padding:'50px 20px', display: 'flex',flexDirection: 'column',justifyContent: 'space-between', height:'100%'}}>
                <div>
                {filterOptions.titles.map((title,index) => (
                    <div key={index}>
                        <Typography variant="h5" sx={{ marginTop: '40px' }}>{title}</Typography>
                        <Grid container columnSpacing={{ xs: 3, sm: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                            {filterOptions.items
                                .filter(item => item.type === title)
                                .map((item, itemNo) => (
                                    <Grid item xs={2} sm={4} md={4} key={itemNo}>
                                        <FormControlLabel control={<Checkbox />} label={item.name} />
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                ))}
                </div>
                <div style={{display:'flex', justifyContent: 'space-around'}}>
                    <Button variant="contained" >
                        Filter
                    </Button>
                    <Button variant="contained" >
                        Reset
                    </Button>
                </div>
            </Box>
        </Drawer>





    </div>
  );
}

export default RecepieGenarator