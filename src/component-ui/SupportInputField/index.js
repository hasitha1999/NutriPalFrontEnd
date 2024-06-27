import React, { useState } from "react";
import {
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Add, Delete } from "@mui/icons-material";

const SupportInputField = (props) => {
  const [newItem, setNewItem] = useState({
    name: props.item ? props.item.name : "",
    amount: props.item ? props.item.amount : "",
    unitType: props.item ? props.item.unitType : "",
  });
  const [inputError, setInputError] = useState(false);
  const [isEdit, setIsEdit] = useState(props.item === undefined);
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    unitType: "",
  });

  const handleAdd = () => {
    let isValid = true;
    const errorObject = {
      name: "",
      amount: "",
      unitType: "",
    };

    if (newItem.name.trim() === "") {
      errorObject.name = "Cannot be Empty!";
      isValid = false;
    }

    if (newItem.amount.trim() === "") {
      errorObject.amount = "Cannot be Empty!";
      isValid = false;
    }

    if (newItem.unitType.trim() === "") {
      errorObject.unitType = "Cannot be Empty!";
      isValid = false;
    }

    if (!isValid) {
      setErrors(errorObject);
      return;
    }

    props.addItem(newItem, props.index);

    if (!props.item) {
      setNewItem({
        name: "",
        amount: "",
        unitType: "",
      });
    }
  };

  const handleChange = (event) => {
    setNewItem((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [event.target.name]: "",
    }));
  };

  return (
    <Grid
      container
      spacing={2}
      mb={4}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Item Name"
          variant="outlined"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name}
          disabled={!isEdit}
        />
      </Grid>

      <Grid item xs={6} sm={3} md={3}>
        <TextField
          fullWidth
          type="number"
          label="Amount"
          variant="outlined"
          name="amount"
          value={newItem.amount}
          onChange={handleChange}
          error={errors.amount}
          helperText={errors.amount}
          disabled={!isEdit}
        />
      </Grid>
      <Grid item xs={6} sm={3} md={3}>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newItem.unitType}
          label="Unit Type"
          name="unitType"
          onChange={handleChange}
          disabled={!isEdit}
          error={errors.unitType}
        >
          <MenuItem value={"g"}>g</MenuItem>
          <MenuItem value={"kg"}>kg</MenuItem>
          <MenuItem value={"cup"}>cup</MenuItem>
        </Select>
        <FormHelperText error={errors.unitType}>
          {errors.unitType}
        </FormHelperText>
      </Grid>

      <Grid item xs={6} sm={3} md={3}>
        {props.lastItem ? (
          <Button variant="outlined" onClick={handleAdd}>
            <Add />
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => props.deleteItem(props.index)}
            color="error"
          >
            <Delete />
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default SupportInputField;
