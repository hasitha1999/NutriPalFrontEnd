import React, {useState} from "react";
import {Grid, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const SupportInputField = (props) =>{

    const [newItem, setNewItem] = useState({
        name: "",
        amount: "",
        unitType: "",

    });
    const [inputError, setInputError] = useState(false);

    return(
            <Grid container spacing={2} mb={4}  alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={6} md={3} >
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

                <Grid item xs={6} sm={3} md={3}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Amount"
                        variant="outlined"
                        value={newItem.amount}
                        onChange={(e) =>
                            setNewItem({ ...newItem, amount: e.target.value })
                        }
                        error={inputError && newItem.amount < 0}
                        helperText={
                            inputError && newItem.amount < 0 ? "Invalid value" : ""
                        }
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
                    >
                        <MenuItem value={"g"}>g</MenuItem>
                        <MenuItem value={"kg"}>kg</MenuItem>
                        <MenuItem value={"cup"}>cup</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={6} sm={3} md={3}>
                    <Button variant="outlined" onClick={()=> props.addItem(newItem)}>
                        Add Item
                    </Button>
                </Grid>

            </Grid>
    )
}

export default SupportInputField;