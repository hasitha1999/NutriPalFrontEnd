import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../use-cases/get-user-details";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
}));

const Profile = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const ncdList = [
    "Cardiovascular disease",
    "Cancer",
    "Chronic respiratory disease",
    "Diabetes",
    "Arthritis",
    "Hypertension"
  ]
  const [profileInfo,setProfileInfo] = useState({weight:85,height:180,gender:1,activeLevel:2,goal:"Weight Loss",firstName:"Hasitha",lastName:"Lakmal",useId:"1560",email:"hasithalakmal@gmail.com",dob:"1999/06/17",allergies:["Peanuts", "Tree nuts", "Shellfish", "Fish", "Eggs", "Milk", "Wheat", "Soy", "Sesame", "Mustard", "Sulfites", "Corn", "Gluten", "Celery"],
ncd:["Diabetes","Arthritis"]});
  const routeChange = (value) => {
    navigate(value);
  };
  useEffect(() => {
    getUserDetails().then((res) => setUser(res.data))
  }, []);
  const findHelthyWeight =(tragetBMI)=>{
    return Math.round(tragetBMI * (user.height/100) ** 2)
  }
  const calculateWaterIntake = ()=>{
    return  Math.round(((user.weight * 2.2)/2)*29.574*100)/100
  }
  return (
    <div>
            <Typography variant="h5" sx={{marginLeft:"20px",marginTop:"10px"}} >
              Profile
            </Typography>
                <Grid
              container
              spacing={1}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid xs={11} md={6}>
        <Card
          sx={{
            m: 1,
            borderRadius: 3,
            border: "1px solid #000",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            mt:3
          }}
        >
          <CardContent align="center">
              <Avatar
                src="img/profile.webp"
                sx={{
                  height: 300,
                  m: 2,
                  width: 300,
                }}/>
                <Typography gutterBottom variant="h6">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color="text.secondary" variant="h6">
                  {user.gymID}
                </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              fullWidth
              variant="text"
              color="secondary"
              onClick={() => {
                routeChange(`/userDetails?isUpdate=true`);
              }}
            >
              Update profile info
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={11} md={5}>
        <Card
          sx={{
            m: 1,
            borderRadius: 3,
            border: "1px solid #000",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            mt:3,
            height:"485px"
          }}
        >
            <Typography variant="h5"sx={{ ml: 5}} >
              Profile Infomation 
            </Typography>
            <Divider />
          <CardContent sx={{ ml: 3,color: "#878787"}}>
            <Typography variant="h5" margin={1}>
              Age : {user?.dob ?(new Date().getFullYear() - user.dob?.split("/", 1)) + "Years": " No DOB" } 
            </Typography>
            <Divider />
            <Typography variant="h5" margin={1}>
              Email : {user.email} 
            </Typography>
            <Divider />
            <Typography variant="h5" margin={1}>
              DOB : {user?.dob} 
            </Typography>
            <Divider />
            <Typography variant="h5" margin={1}>
              Gender : {user.gender === 1 ? "Male" : "Female"} 
            </Typography>
            <Divider />
            <Typography variant="h5" margin={1}>
              Weight : {user.weight} kg
            </Typography>
            <Divider />
            <Typography variant="h5" margin={1}>
              Height : {user.height} cm
            </Typography>
            <Divider />
            <Typography variant="h5" margin={1}>
                Active Level : 
              </Typography>
            <Box sx={{ width: '50%' }}>
              <BorderLinearProgress color="secondary"  variant="determinate" value={100/user.activeLevel} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* <Stack spacing={1} direction="column" sx={{ m: 2, mb: 10 }}>
        <Button
          color="secondary"
          startIcon={<AssignmentIcon sx={{ mr: 2 }} />}
          size="large"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "20px",
          }}
          onClick={() => {
            routeChange(`/expensesRecord`);
          }}
        >
          Expenses Record
        </Button>
      </Stack> */}
      </Grid>
      <Grid
              container
              spacing={1}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
      
      <Grid xs={11} md={6}>
      <Card
          sx={{
            m: 1,
            borderRadius: 3,
            border: "1px solid #000",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5"sx={{ ml: 5}} >
              Personal Goals 
          </Typography>
          <Divider />
          <CardContent sx={{ ml: 3,color: "#878787"}}>
          <Typography variant="h5" margin={1}>
              Main Goal : {profileInfo.goal}
          </Typography>
            <Divider />
            <Typography
              variant="h3"
              margin={1}
            >
                {findHelthyWeight(18.5)}kg -  {findHelthyWeight(25)}kg
            </Typography>
            <Typography
              variant="h6"
              margin={1}
            >
              Healthy Weight Range
            </Typography>
          <Divider />
          <Typography
            variant="h3"
            margin={1}
          >
                {calculateWaterIntake()} ml
          </Typography>
          <Typography
            variant="h6"
            margin={1}
          >
            Target Water Intake
          </Typography>
          <Divider />
          </CardContent>

        </Card>

      </Grid>
      <Grid xs={11} md={5}>
      <Card
          sx={{
            m: 1,
            borderRadius: 3,
            border: "1px solid #000",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5"sx={{ ml: 5}} >
              Health Informations 
          </Typography>
          <Divider />
          <CardContent sx={{ ml: 3,color: "#878787"}}>
              <Typography variant="h5" >
              Food Allergy
              </Typography>
              <Divider />
              {profileInfo.allergies.map((allergy, index) => {
                return  allergy + " | "
              }  
              )}
              <br></br>
              <Typography variant="h5" >
                Noncommunicable Diseases  
              </Typography>
              <Divider />
              <FormGroup>

              <Grid container>
                {ncdList.map((disease,index)=>(
                    <Grid item xs={6} md={6}>
                      <FormControlLabel disabled control={<Checkbox checked={profileInfo.ncd.includes(disease)} />} label={disease} />
                    </Grid>
                ))}
                </Grid>
              </FormGroup>
          </CardContent>
          
        </Card>

      </Grid>
      
      </Grid>
    </div>
  );
};

export default Profile;
