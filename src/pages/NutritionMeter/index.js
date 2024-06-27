import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Alert, Divider,
  Button,
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
import { getNutritionsAPIData } from "../../use-cases/get-api-nutritions";

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
  const [showWarning, setShowWarning] = useState(false);
  const [serving,setServing] = useState(1);
  const [totalNutrient,setTotalNutrient] = useState({});
  const [itemList, setItemList] = useState([])
  const [apiResponse,setApiResponse] = useState({})

  const addItemToList = (newItem) => {
    setItemList((prevItemList) => {
     let newState =  [...prevItemList]
     let recreatedItem = newItem.amount +" "+ newItem.unitType+" " + newItem.name;
     newState.push(recreatedItem);
     return newState;
    });
   
  };
  console.log("itemList", itemList)
  const removeAllItem = ()=>{

  }
  const searchItems = ()=>{
    getNutritionsAPIData({ingr:itemList}).then((response)=>{
      setApiResponse(response.data)
      setTotalNutrient(response.data.totalNutrients);
    })
  }
  const getCurrentDateFormatted = ()=> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');

    return `${year}-${day}-${month}`;
}
  return (
     <div>
        <CustomPaper style={{width:'90%'}}>
            <Stack direction="row" justifyContent="space-between">
                <Typography className="main-header">Nutrition Meter</Typography>
                <Typography className="main-header">{getCurrentDateFormatted()}</Typography>
            </Stack>
        </CustomPaper>
        <CustomPaper style={{width:'90%'}}>
        {showWarning && (
          <Alert severity="warning" icon={<FontAwesomeIcon icon={faTimes} />}>
            Total calories exceed recommended limit (1000 calories)!
          </Alert>
        )}
        <SupportInputField addItem={(value)=>addItemToList(value)} isNewRecord={true}/>
        {itemList.map((item,index) => (
            <div key={index}>
            <SupportInputField addItem={addItemToList} isNewRecord={false} />
            </div>
        ))}

          <Stack spacing={{ xs: 2, md: 12 }}  justifyContent="center" alignItems="center" direction={{ xs: 'column', md: 'row' }}>

          <Button variant="contained" onClick={searchItems} sx={{ml:2,width:"10vw",bgcolor:"gray"}}>
            Reset
            </Button>
            <Button variant="contained" onClick={searchItems} sx={{ml:2,width:"10vw"}} >
            Search Item
            </Button>
          </Stack>
          {Object.keys(totalNutrient).length > 0?
          <CustomPaper elevation={24}>
          <Typography className="second-header">Amount Per Serving<span style={{float:"inline-end"}}>{(apiResponse?.calories/serving).toFixed(2)} kCal</span></Typography>
          <Divider/>
          
          <Stack justifyContent="space-between" style={{marginTop: "10px"}}>

            <StackLayout parameter1={totalNutrient['FAT']} serving ={serving}/>
            <Stack justifyContent="space-evenly" alignItems="flex-end" direction="column" style={{width: '90%', marginLeft: 'auto', marginBottom: '5px'}}>
              <StackLayout parameter1={totalNutrient['FASAT']} titleClass="sub-header"  stylePack={{subStyles}} serving ={serving}/>
              <StackLayout serving ={serving} parameter1={totalNutrient['FATRN']} titleClass="sub-header"/>
            </Stack>

            <StackLayout serving ={serving} parameter1={totalNutrient['CHOLE']}/>
            <StackLayout serving ={serving} parameter1={totalNutrient['NA']} />

            <StackLayout serving ={serving} parameter1={totalNutrient['CHOCDF']}  />
            <Stack justifyContent="space-evenly" alignItems="flex-end" direction="column" style={{width: '90%', marginLeft: 'auto', marginBottom: '5px'}}>
              <StackLayout serving ={serving} parameter1={totalNutrient['SUGAR']} titleClass="sub-header"/>
              <StackLayout serving ={serving} parameter1={totalNutrient['FIBTG']} titleClass="sub-header"/>
            </Stack>

            <StackLayout serving ={serving} parameter1={totalNutrient['PROCNT']}  />
            <StackLayout serving ={serving} parameter1={totalNutrient['CA']}   />
            <StackLayout serving ={serving} parameter1={totalNutrient['FE']}  />
          </Stack>
          </CustomPaper> : ""}
        </CustomPaper>
    </div>
  );
};

export default NutritionMeter;
