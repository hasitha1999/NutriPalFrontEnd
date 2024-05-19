import React from "react";
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

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];

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




const MealPlannerComponent = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };


  return (
    <div>
        <Typography variant="h3" sx={{margin:'15px 0px 0px 20px'}}>Meal Planner</Typography>

        <div style={{display:'flex'}}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: '90%', margin: '15px auto', background: '#eee9f7', color: '#000' }}
            renderInput={(params) => <TextField sx={{color:'#000'}} {...params} label="Generate Meal Plan" />}
        />
        <IconButton  aria-label="fingerprint" color="secondary" onClick={toggleDrawer(true)}>
            <TuneSharpIcon />
        </IconButton>
        </div>

        <Box sx={{ flexGrow: 1, width: '90%', margin:'5px auto' }}>
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {dummyCardData.map((item,index)=>(
                    <Grid item xs={2} sm={4} md={3} key={index}>
                        <RecipeCard title={item.title} image='https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg' description={item.description}/>
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 350, padding:'50px 20px' }}>
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
            </Box>
        </Drawer>





    </div>
  );
}

export default MealPlannerComponent