import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  getAllergiesDetails,
  getUserDetails,
} from "../../use-cases/get-user-details";
import { useEffect, useState } from "react";
import { editUser } from "../../use-cases/edit-user";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { CustomTextField } from "../CustomTextField/CustomTextField";
import { CustomSelect } from "../CustomSelect/index";

const goalMap = {
  10: "Weight Loss",
  20: "Muscle Building (Bulking)",
  30: "Muscle Toning",
  40: "Increasing Strength",
  50: "Rehabilitation and Injury Recovery",
};

const DietaryPreferences = () => {
  const MySwal = withReactContent(Swal);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [originalUser, setOriginalUser] = useState({});
  const [allAllergies, setAllAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getUserDetails().then((res) => {
      setUser(res.data);
      setSelectedAllergies(res.data.allergy);
      setIsLoading(false);
    });
    getAllergiesDetails().then((res) => setAllAllergies(res.data));
  }, []);

  const handleEnableEdit = () => {
    setIsEdit(true);
    setOriginalUser(user);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setUser(originalUser);
  };

  const handleChange = (event) => {
    const isNum =
      event.target.name === "weight" ||
      event.target.name === "height" ||
      event.target.name === "activeLevel";
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: isNum
        ? parseInt(event.target.value)
        : event.target.value,
    }));
  };

  const save = () => {
    if (!user.gymID) {
      user.gymID = user.gymID;
    }

    setIsLoading(true);

    editUser(user)
      .then(() => {
        MySwal.fire(
          "success!",
          "Profile information update successful....!",
          "success"
        );
        setOriginalUser(user);
        setIsEdit(false);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        MySwal.fire("ERROR", "Please contact admin", "error");
      });
    console.log(user);
  };

  const findHelthyWeight = (tragetBMI) => {
    return Math.round(tragetBMI * (user.height / 100) ** 2);
  };
  const calculateWaterIntake = () => {
    return Math.round(((user.weight * 2.2) / 2) * 29.574 * 100) / 100;
  };

  return (
    <Card sx={{ p: 2 }} elevation={4}>
      {isLoading ? (
        <DietaryPreferencesSkeleton />
      ) : (
        <>
          <Box display="flex" alignItems={"center"}>
            <Typography variant="h4">Food Allergies</Typography>
          </Box>
          <Grid container spacing={2}>
            {allAllergies.map((allergy) => (
              <Grid item xs={3} key={allergy.allergyId + "allergycheckbox"}>
                <Box mt="10px">
                  <FormControl
                    fullWidth
                    style={{ marginTop: 2, marginBottom: 2 }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label={allergy.allergyName}
                      name={allergy.allergyId}
                      disabled={!isEdit}
                    />
                  </FormControl>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} mt={2}>
            <Grid item>
              {!isEdit ? (
                <Button variant="contained" onClick={handleEnableEdit}>
                  Edit
                </Button>
              ) : (
                <>
                  <Button variant="contained" onClick={save}>
                    Save
                  </Button>
                  <Button variant="text" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
};

export default DietaryPreferences;

const DietaryPreferencesSkeleton = () => {
  return (
    <>
      <Box>
        <Skeleton height={40} width={"25%"} />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Skeleton height={40} width={"25%"} />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={40} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
