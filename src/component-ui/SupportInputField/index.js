import React, { useState } from "react";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
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

  const handleAdd = () => {
    props.addItem(newItem, props.index);

    if (!props.item) {
      setNewItem({
        name: "",
        amount: "",
        unitType: "",
      });
    }
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
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          error={inputError && !newItem.name}
          helperText={inputError && !newItem.name ? "Required" : ""}
          disabled={!isEdit}
        />
      </Grid>

      <Grid item xs={6} sm={3} md={3}>
        <TextField
          fullWidth
          type="number"
          label="Amount"
          variant="outlined"
          value={newItem.amount}
          onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
          error={inputError && newItem.amount < 0}
          helperText={inputError && newItem.amount < 0 ? "Invalid value" : ""}
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
          onChange={(e) => setNewItem({ ...newItem, unitType: e.target.value })}
          disabled={!isEdit}
        >
          <MenuItem value={"g"}>g</MenuItem>
          <MenuItem value={"kg"}>kg</MenuItem>
          <MenuItem value={"cup"}>cup</MenuItem>
        </Select>
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