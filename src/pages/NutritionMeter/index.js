import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import { CustomButton } from "../../theme/CustomThemeComponents";
import { CustomPaper } from "../../theme/CustomThemeComponents";
import { StackLayout } from "../../theme/CustomThemeComponents";
import SupportInputField from "../../component-ui/SupportInputField";
import { getNutritionsAPIData } from "../../use-cases/get-api-nutritions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const NutritionMeter = () => {
  const MySwal = withReactContent(Swal);
  const subStyles = {
    width: "100%",
    margin: "2px auto",
    padding: "1px",
    direction: "row",
    justifyContent: "space-between",
    spacing: 2,
    borderBottom: "0.2px dotted #747575",
  };
  const [showWarning, setShowWarning] = useState(false);
  const [serving, setServing] = useState(1);
  const [totalNutrient, setTotalNutrient] = useState({});
  const [itemList, setItemList] = useState([]);
  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const addItemToList = (newItem, index) => {
    if (index) {
      setItemList((prevItemList) => {
        const updatedList = [...prevItemList];
        updatedList[index] = newItem;
        return updatedList;
      });
    } else {
      setItemList((prevItemList) => {
        return [...prevItemList, newItem];
      });
    }
  };

  const deleteItem = (index) => {
    setItemList((prev) => {
      const updatedList = [...prev];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  const searchItems = () => {

    if(!itemList.length) {
      MySwal.fire("ERROR", "Please add atleast one item", "error");
      return;
    }

    const data = [];
    itemList.forEach((item) => {
      const itemString = item.amount + " " + item.unitType + " " + item.name;
      data.push(itemString);
    });
    setIsLoading(true);
    getNutritionsAPIData({ ingr: data }).then((response) => {
      setApiResponse(response.data);
      setTotalNutrient(response.data.totalNutrients);
      setIsLoading(false)
    });
  };

  const getCurrentDateFormatted = ()=> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');

    return `${year}-${day}-${month}`;
}

  const handleReset = () => {
    setItemList([]);
    setApiResponse({});
    setTotalNutrient({});
  };

  return (
    <div>
      <CustomPaper style={{ width: "90%" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography className="main-header">Nutrition Meter</Typography>
          <Typography className="main-header">
            {getCurrentDateFormatted()}
          </Typography>
        </Stack>
      </CustomPaper>
      <CustomPaper style={{ width: "90%" }}>
        {showWarning && (
          <Alert severity="warning" icon={<FontAwesomeIcon icon={faTimes} />}>
            Total calories exceed recommended limit (1000 calories)!
          </Alert>
        )}
        {itemList.map((item, index) => (
          <div key={index}>
            <SupportInputField
              addItem={addItemToList}
              item={item}
              index={index}
              deleteItem={deleteItem}
            />
          </div>
        ))}
        <div>
          <SupportInputField addItem={addItemToList} lastItem={true} />
        </div>

        <Stack
          spacing={{ xs: 2, md: 12 }}
          justifyContent="center"
          alignItems="center"
          direction={{ xs: "column", md: "row" }}
        >
          <Button
            variant="contained"
            sx={{ ml: 2, width: "10vw", bgcolor: "gray" }}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={searchItems}
            sx={{ ml: 2, width: "10vw" }}
          >
            Search Item
          </Button>
        </Stack>
        {
          isLoading && (
            <Skeleton variant="rounded" height={300} style={{marginTop: '20px'}} />
          )
        }
        {!isLoading && Object.keys(totalNutrient).length > 0 ? (
          <CustomPaper elevation={3}>
            <Typography className="second-header">
              Amount Per Serving
              <span style={{ float: "inline-end" }}>
                {(apiResponse?.calories / serving).toFixed(2)} kCal
              </span>
            </Typography>
            <Divider />

            <Stack justifyContent="space-between" style={{ marginTop: "10px" }}>
              <StackLayout
                parameter1={totalNutrient["FAT"]}
                serving={serving}
              />
              <Stack
                justifyContent="space-evenly"
                alignItems="flex-end"
                direction="column"
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginBottom: "5px",
                }}
              >
                <StackLayout
                  parameter1={totalNutrient["FASAT"]}
                  titleClass="sub-header"
                  stylePack={{ subStyles }}
                  serving={serving}
                />
                <StackLayout
                  serving={serving}
                  parameter1={totalNutrient["FATRN"]}
                  titleClass="sub-header"
                />
              </Stack>

              <StackLayout
                serving={serving}
                parameter1={totalNutrient["CHOLE"]}
              />
              <StackLayout serving={serving} parameter1={totalNutrient["NA"]} />

              <StackLayout
                serving={serving}
                parameter1={totalNutrient["CHOCDF"]}
              />
              <Stack
                justifyContent="space-evenly"
                alignItems="flex-end"
                direction="column"
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginBottom: "5px",
                }}
              >
                <StackLayout
                  serving={serving}
                  parameter1={totalNutrient["SUGAR"]}
                  titleClass="sub-header"
                />
                <StackLayout
                  serving={serving}
                  parameter1={totalNutrient["FIBTG"]}
                  titleClass="sub-header"
                />
              </Stack>

              <StackLayout
                serving={serving}
                parameter1={totalNutrient["PROCNT"]}
              />
              <StackLayout serving={serving} parameter1={totalNutrient["CA"]} />
              <StackLayout serving={serving} parameter1={totalNutrient["FE"]} />
            </Stack>
          </CustomPaper>
        ) : (
          ""
        )}
      </CustomPaper>
    </div>
  );
};

export default NutritionMeter;