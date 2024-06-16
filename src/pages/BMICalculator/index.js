import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Alert, Select, MenuItem, Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";



import Stack from "@mui/material/Stack";
import {CustomButton} from "../../theme/CustomThemeComponents"
import {CustomPaper} from "../../theme/CustomThemeComponents"
import {StackLayout} from  "../../theme/CustomThemeComponents"
import SupportInputField from "../../component-ui/SupportInputField";



const NutritionMeter = () => {
  const subStyles = {
    width :"100%",
    margin :"2px auto",
    padding : "1px",
    direction : "row",
    justifyContent : "space-between",
    spacing : 2,
    borderBottom : '0.2px dotted #747575'
  }
  const defaultItemsDisplayed = [
    {
      id: 1,
      name: "Apple",
      calories: 52,
      protein: 0.26,
      carbs: 14,
      fat: 1,
      quantity: 1,
    },
    {
      id: 2,
      name: "Banana",
      calories: 89,
      protein: 1.09,
      carbs: 23,
      fat: 5,
      quantity: 1,
    },
    {
      id: 3,
      name: "Grapes",
      calories: 40,
      protein: 0.2,
      carbs: 20,
      fat: 2,
      quantity: 1,
    },
    {
      id: 4,
      name: "Orange",
      calories: 35,
      protein: 0.15,
      carbs: 25,
      fat: 4,
      quantity: 1,
    },
  ];

  const [nutritionItems, setNutritionItems] = useState(defaultItemsDisplayed);
  const [newItem, setNewItem] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [editItem, setEditItem] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    const calculateTotalCalories = nutritionItems.reduce(
      (total, item) => total + parseFloat(item.calories) * item.quantity,
      0
    );

    setTotalCalories(calculateTotalCalories);

    if (calculateTotalCalories > 1000) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [nutritionItems]);

  const addNutritionItem = () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      setNutritionItems([
        ...nutritionItems,
        { ...newItem, id: Date.now(), quantity: 1 },
      ]);
      setNewItem({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const removeAllItems = () => {
    setNutritionItems([]);
  };

  const editItemFunction = (item) => {
    setEditItem(item.id);
    setNewItem({ ...item });
  };

  const updateItemFunction = () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      const updatedItems = nutritionItems.map((item) =>
        item.id === newItem.id ? newItem : item
      );
      setNutritionItems(updatedItems);
      setNewItem({
        name: "",
        grams: "",
        unitType: "",

      });
      setEditItem(null);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const deleteItemFunction = (id) => {
    const updatedItems = nutritionItems.filter((item) => item.id !== id);
    setNutritionItems(updatedItems);
  };

  const updateItemQuantity = (id, change) => {
    const updatedItems = nutritionItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + change, 1) }
        : item
    );
    setNutritionItems(updatedItems);
  };

  const totalProtein = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.protein) * item.quantity,
      0
    );
  };

  const totalCarbs = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.carbs) * item.quantity,
      0
    );
  };

  const totalFat = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.fat) * item.quantity,
      0
    );
  };
  const addItemToList = (newItem) => {
    setItemList((prevItemList) => [...prevItemList, newItem]);
    console.log("itemList", newItem)
  };

  const rows = [totalCalories, totalProtein(), totalCarbs(), totalFat()];
  return (
     <Box sx={{minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
            Nutrition Calculator
        </Typography>
        {showWarning && (
          <Alert severity="warning" icon={<FontAwesomeIcon icon={faTimes} />}>
            Total calories exceed recommended limit (1000 calories)!
          </Alert>
        )}
        {/*<Grid container spacing={2} mb={4}>*/}
        {/*  <Grid item xs={12} sm={6}>*/}
        {/*    <TextField*/}
        {/*      fullWidth*/}
        {/*      label="Item Name"*/}
        {/*      variant="outlined"*/}
        {/*      value={newItem.name}*/}
        {/*      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}*/}
        {/*      error={inputError && !newItem.name}*/}
        {/*      helperText={inputError && !newItem.name ? "Required" : ""}*/}
        {/*    />*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={6} sm={3}>*/}
        {/*    <TextField*/}
        {/*      fullWidth*/}
        {/*      type="number"*/}
        {/*      label="Amount"*/}
        {/*      variant="outlined"*/}
        {/*      value={newItem.protein}*/}
        {/*      onChange={(e) =>*/}
        {/*        setNewItem({ ...newItem, protein: e.target.value })*/}
        {/*      }*/}
        {/*      error={inputError && newItem.protein < 0}*/}
        {/*      helperText={*/}
        {/*        inputError && newItem.protein < 0 ? "Invalid value" : ""*/}
        {/*      }*/}
        {/*    />*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={6} sm={3}>*/}
        {/*    <Select*/}
        {/*        fullWidth*/}
        {/*        labelId="demo-simple-select-label"*/}
        {/*        id="demo-simple-select"*/}
        {/*        value={newItem.unitType}*/}
        {/*        label="Unit Type"*/}


        {/*    >*/}
        {/*      <MenuItem value={10}>grams</MenuItem>*/}
        {/*      <MenuItem value={20}>Twenty</MenuItem>*/}
        {/*      <MenuItem value={30}>Thirty</MenuItem>*/}
        {/*    </Select>*/}
        {/*  </Grid>*/}

        {/*</Grid>*/}
        {/*<SupportInputField addItem={addItemToList} />*/}
        <SupportInputField addItem={(value)=>addItemToList(value)} />
        {itemList.map((item,index) => (
            <div key={index}>
            <SupportInputField addItem={addItemToList} />
            </div>
        ))}



        {/*<Grid container spacing={2} mb={4}>*/}
          <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }}>
          {/*<Grid item xs={12} sm={6} container alignItems="center" rowSpacing={1}>*/}
          {/*    {editItem ? (*/}
          {/*      <CustomButton*/}

          {/*        variant="contained"*/}
          {/*        color="primary"*/}
          {/*        onClick={updateItemFunction}*/}
          {/*        fullWidth*/}
          {/*      >*/}
          {/*        Update Item*/}
          {/*      </CustomButton>*/}
          {/*    ) : (*/}
                <CustomButton
                  variant="contained"
                  color="success"
                  onClick={addNutritionItem}
                  fullWidth
                >
                  Search Item
                </CustomButton>
              {/*)}*/}
              <CustomButton
                variant="contained"
                color="error"
                onClick={removeAllItems}
                fullWidth
              >
                Clear All
              </CustomButton>
            {/*</Grid>*/}
          </Stack>
          {/*</Grid>*/}

        
        {/* <Box textAlign="center" mt={8} variant="outlined" style={{ padding: 20, borderRadius: 10, boxShadow: '2px 8px 16px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5">
            Total Calories: {totalCalories}{" "}
            <FontAwesomeIcon icon={faUtensils} size="lg" />
          </Typography>
          <Typography variant="h5">Total Protein: {totalProtein()}g</Typography>
          <Typography variant="h5">Total Carbs: {totalCarbs()}g</Typography>
          <Typography variant="h5">Total Fat: {totalFat()}g</Typography>
        </Box> */}
        <CustomPaper elevation={24}>
          <Typography className="main-header">Nutrition Facts</Typography>
         <hr style={{height: '5px', background: "linear-gradient(90deg, rgba(82,55,145,0.9304096638655462) 0%, rgba(110,9,121,1) 100%, rgba(132,0,255,1) 100%)", border: "0px"}}/>
          <Typography className="second-header">Amount Per Serving</Typography>
          <Divider/>
          <Stack justifyContent="space-between" style={{marginTop: "10px"}}>

            <StackLayout parameter1="Fat" parameter2="15.1 g" />
            <Stack justifyContent="space-evenly" alignItems="flex-end" direction="column" style={{width: '90%', marginLeft: 'auto', marginBottom: '5px'}}>
              {/* eslint-disable-next-line no-undef */}
              <StackLayout parameter1="Saturated Fat" parameter2="4.3 g" titleClass="sub-header"  stylePack={{subStyles}}/>
              <StackLayout parameter1="Trans Fat" parameter2="0.1 g" titleClass="sub-header"/>
            </Stack>

            <StackLayout parameter1="Cholesterol" parameter2="75 mg" />
            <StackLayout parameter1="Sodium" parameter2="70 mg" />

            <StackLayout parameter1="Total Carbohydrate " parameter2="0 g" />
            <Stack justifyContent="space-evenly" alignItems="flex-end" direction="column" style={{width: '90%', marginLeft: 'auto', marginBottom: '5px'}}>
              <StackLayout parameter1="Dietary Fiber" parameter2="0 g" titleClass="sub-header"/>
              <StackLayout parameter1="Total Sugars" parameter2="0 g" titleClass="sub-header"/>
            </Stack>

            <StackLayout parameter1="Protein " parameter2="18.6 g" />
            <StackLayout parameter1="Calcium" parameter2="11 mg" />
            <StackLayout parameter1="Iron" parameter2="0.9 mg" />
            <StackLayout parameter1="Potassium" parameter2="189 mg" />
          </Stack>

        </CustomPaper>

      </Container>
    </Box>
  );
};

export default NutritionMeter;
