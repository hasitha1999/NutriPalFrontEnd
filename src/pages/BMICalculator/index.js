import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Alert,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUtensils,
  faPlus,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const NutritionMeter = () => {
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
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
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

  const rows = [totalCalories, totalProtein(), totalCarbs(), totalFat()];
  return (
    <Box sx={{minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
            Nutrition Meter
        </Typography>
        {showWarning && (
          <Alert severity="warning" icon={<FontAwesomeIcon icon={faTimes} />}>
            Total calories exceed recommended limit (1000 calories)!
          </Alert>
        )}
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Item Name"
              variant="outlined"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              error={inputError && !newItem.name}
              helperText={inputError && !newItem.name ? "Required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Calories"
              variant="outlined"
              value={newItem.calories}
              onChange={(e) =>
                setNewItem({ ...newItem, calories: e.target.value })
              }
              error={inputError && newItem.calories < 0}
              helperText={
                inputError && newItem.calories < 0 ? "Invalid value" : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Protein (g)"
              variant="outlined"
              value={newItem.protein}
              onChange={(e) =>
                setNewItem({ ...newItem, protein: e.target.value })
              }
              error={inputError && newItem.protein < 0}
              helperText={
                inputError && newItem.protein < 0 ? "Invalid value" : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Carbs (g)"
              variant="outlined"
              value={newItem.carbs}
              onChange={(e) =>
                setNewItem({ ...newItem, carbs: e.target.value })
              }
              error={inputError && newItem.carbs < 0}
              helperText={
                inputError && newItem.carbs < 0 ? "Invalid value" : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Fat (g)"
              variant="outlined"
              value={newItem.fat}
              onChange={(e) => setNewItem({ ...newItem, fat: e.target.value })}
              error={inputError && newItem.fat < 0}
              helperText={inputError && newItem.fat < 0 ? "Invalid value" : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} container alignItems="center" rowSpacing={1}>
            {editItem ? (
              <Button
                variant="contained"
                color="primary"
                onClick={updateItemFunction}
                fullWidth
              >
                Update Item
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={addNutritionItem}
                fullWidth
              >
                Add Item
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={removeAllItems}
              fullWidth
            >
              Clear All
            </Button>
          </Grid>
          </Grid>
        <Grid container spacing={2} rowSpacing={1}>
          {nutritionItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                variant="outlined"
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2">
                    Calories: {item.calories * item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Protein: {item.protein * item.quantity}g
                  </Typography>
                  <Typography variant="body2">
                    Carbs: {item.carbs * item.quantity}g
                  </Typography>
                  <Typography variant="body2">
                    Fat: {item.fat * item.quantity}g
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                  >
                    <IconButton
                      color="success"
                      onClick={() => updateItemQuantity(item.id, 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                    <Typography variant="body2">{item.quantity}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => updateItemQuantity(item.id, -1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </IconButton>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => editItemFunction(item)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteItemFunction(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* <Box textAlign="center" mt={8} variant="outlined" style={{ padding: 20, borderRadius: 10, boxShadow: '2px 8px 16px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5">
            Total Calories: {totalCalories}{" "}
            <FontAwesomeIcon icon={faUtensils} size="lg" />
          </Typography>
          <Typography variant="h5">Total Protein: {totalProtein()}g</Typography>
          <Typography variant="h5">Total Carbs: {totalCarbs()}g</Typography>
          <Typography variant="h5">Total Fat: {totalFat()}g</Typography>
        </Box> */}


      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Total Calories&nbsp;(g)</TableCell>
                  <TableCell align="right">Total Protein&nbsp;(g)</TableCell>
                  <TableCell align="right">Total Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Total Fat&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              <TableRow    
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right"> {totalCalories}</TableCell>  
                    <TableCell align="right">{totalProtein()}</TableCell>
                    <TableCell align="right">{totalCarbs()}</TableCell>
                    <TableCell align="right">{totalFat()}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
      </Container>
    </Box>
  );
};

export default NutritionMeter;
