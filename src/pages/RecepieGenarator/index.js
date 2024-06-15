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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {CheckCircle} from "@mui/icons-material";
import { getAllsavedRecepie, savedSearchRecepieApi, searchRecepieApi } from "../../use-cases/api-recepie";

let dummyCardData = [
    {
        title: 'pizza',
        description:
            'Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients such as anchovies, mushrooms, onions, olives, pineapple, meat, etc., which is then baked at a high temperature, traditionally in a wood-fired oven.',
        image: 'https://www.seriouseats.com/thmb/e4sA_9qtrgBpy34K4nl8NrC2eMs=/1500x1125/smart/filters:no_upscale()/2019_07_15_FoodLab_VersatilePizzaDough_VickyWasik_3-efc28cb1b2bf4342ad0c9d71a82fe11b.jpg'
    },
    {
        title: 'sushi',
        description:
            'Sushi is a Japanese dish consisting of small balls or rolls of vinegar-flavored cold-cooked rice served with a garnish of raw fish, vegetables, or egg.',
        image: 'https://www.thespruceeats.com/thmb/qQXsEdkWsGGid6wINPHmOy0ZoGA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/sushi-rolls-462998198-587673105f9b584db3a44ae3.jpg'
    },
    {
        title: 'burger',
        description:
            'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be pan-fried, grilled, smoked, or flame-broiled.',
        image: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/burger-and-fries.jpg'
    },
    {
        title: 'ice cream',
        description:
            'Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It is usually made from dairy products, such as milk and cream, and often combined with fruits or other ingredients and flavors.',
        image: 'https://www.thespruceeats.com/thmb/pDnOuNq4T9fmOxIsqM6s8c3-AQs=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/homemade-vanilla-ice-cream-recipe-1945754-hero-01-79503e69f24f4760a4b42a7f9a5e5f54.jpg'
    }
];

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
                    setSearchResult(makelist);
                }).catch((e)=>{
                    alert(e)
                });   
            })
        }).catch((e)=>{
            alert(e)
        });
    }


    const searchRecepie = () => {
        searchRecepieApi(searchData.searchItemName).then((response)=>{
            setSearchResult(response.data.hits);
        }).catch((e)=>{
            alert(e)
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