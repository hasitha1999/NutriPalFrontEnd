import React, { useEffect, useState } from "react";
import RecipeCard from "../../component-ui/RecipeCard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  getAllsavedRecepie,
  savedSearchRecepieApi,
  searchRecepieApi,
} from "../../use-cases/api-recepie";
import { CustomPaper } from "../../theme/CustomThemeComponents";
import { Divider, FormGroup, Skeleton, Stack } from "@mui/material";
import { getAllergiesDetails } from "../../use-cases/get-user-details";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RamenDiningIcon from '@mui/icons-material/RamenDining';

const RecipeSearch = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [isNotSearch, setIsNotSearch] = useState(false);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [allAllergies, setAllAllergies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    loadAllrecepie();
    getAllergiesDetails().then((res) => setAllAllergies(res.data));
  }, []);
  const handleChange = (event) => {
    setSearchData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const loadAllrecepie = () => {
    getAllsavedRecepie()
      .then((response) => {
        setSearchResult(response.data);
        setIsNotSearch(true);
        setIsLoading(false);
      })
      .catch((e) => {});
  };

  const searchRecepie = () => {
    setIsLoading(true);
    searchRecepieApi(searchData.searchItemName)
      .then((response) => {
        setIsLoading(false);
        if (response.data.count > 0) {
          setSearchResult(response.data.hits);
          setIsNotSearch(false);
        } else {
          MySwal.fire(
            "There Is No Data",
            "Please check the entered recipe and try again..",
            "error"
          );
        }
      })
      .catch((e) => {});
  };

  const getCurrentDateFormatted = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");

    return `${year}-${day}-${month}`;
  };
  const handleAllergyClick = (event) => {
    setSelectedAllergies((prev) => {
      let newState = [...prev];

      const index = newState.findIndex(
        (a) => a.allergyId == parseInt(event.target.value)
      );

      if (index === -1) {
        newState.push({
          allergyId: parseInt(event.target.value),
          allergyName: event.target.name,
        });
      } else {
        newState.splice(index, 1);
      }

      return newState;
    });
  };

  return (
    <div>
      <CustomPaper style={{ width: '90%', padding: '20px', borderRadius: '15px', background: 'linear-gradient(135deg, #5D87FF 0%, #9DAAFF 100%)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <RamenDiningIcon sx={{ color: 'white', mr: 1 }} />
            <Typography className="main-header" sx={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
              Recipe Search
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <EventNoteIcon sx={{ color: 'white', mr: 1 }} />
            <Typography className="main-header" sx={{ color: 'white', fontSize: '18px' }}>
              {getCurrentDateFormatted()}
            </Typography>
          </Box>
        </Stack>
      </CustomPaper>

      <CustomPaper style={{ width: "90%" }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={9}>
            <TextField
              sx={{
                color: "#000",
                width: "90%",
                marginLeft: "9%",
                marginTop: "5%",
              }}
              label="search a recepie"
              name="searchItemName"
              onChange={handleChange}
              value={searchData.searchItemName}
            />
          </Grid>
          <Grid
            xs={12}
            md={3}
            sx={{ marginTop: "4%", marginLeft: { xs: "9%", md: "0%" } }}
          >
            <Button
              variant="contained"
              onClick={searchRecepie}
              sx={{ marginLeft: "3px" }}
              disabled={isLoading}
            >
              Search
            </Button>
            {!isNotSearch ? (
              <IconButton
                aria-label="fingerprint"
                onClick={toggleDrawer(true)}
                size="large"
                disabled={isLoading}
              >
                <TuneSharpIcon fontSize="inherit" />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
        {!isLoading && (
          <Typography variant="h5" sx={{ margin: "40px" }}>
            {isNotSearch ? "Favourite Recipes" : "Search Result"}
          </Typography>
        )}
        <Box sx={{ flexGrow: 1, width: "90%", margin: "5px auto" }}>
          {isLoading ? (
            <RecipeSearchSkeleton />
          ) : (
            <Grid
              container
              spacing={{ xs: 2, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {console.log(searchResult)}
              {isNotSearch
                ? searchResult.map((item, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <RecipeCard
                        title={item.recipe.title}
                        image={item.recipe?.image}
                        itemData={JSON.parse(item.recipe?.itemData)}
                        recipeId={item.recipe.recipeId}
                        loadAllrecepie={loadAllrecepie}
                      />
                    </Grid>
                  ))
                : searchResult.map((item, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <RecipeCard
                        title={item.recipe.label}
                        image={item.recipe.image}
                        itemData={item.recipe}
                        recipeId={null}
                      />
                    </Grid>
                  ))}
            </Grid>
          )}
        </Box>
      </CustomPaper>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 350,
            padding: "50px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <Typography
              variant="h5"
              color={"GrayText"}
              gutterBottom
              sx={{ ml: 2 }}
            >
              Food Allergy
            </Typography>
            <Divider />
            <FormGroup>
              <Grid container>
                {allAllergies.map((allergy, index) => {
                  return (
                    <Grid item xs={6} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedAllergies.find(
                                (a) => a.allergyId == allergy.allergyId
                              ) !== undefined
                            }
                            onChange={handleAllergyClick}
                          />
                        }
                        label={allergy.allergyName}
                        name={allergy.allergyName}
                        value={allergy.allergyId}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </FormGroup>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="contained">Filter</Button>
            <Button variant="contained">Reset</Button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default RecipeSearch;

const RecipeSearchSkeleton = () => (
  <>
    <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton height={40} />
      </Grid>
    </Grid>
    <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
    </Grid>
  </>
);
