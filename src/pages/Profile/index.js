import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
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
import { getPackageUser } from "../../use-cases/get-package-user";


const Profile = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [packageUser, setPackageUser] = useState({});
  const routeChange = (value) => {
    navigate(value);
  };
  useEffect(() => {
    getUserDetails().then((res) => setUser(res.data));
    getPackageUser().then((res) => setPackageUser(res.data));
    console.log("TEST");
  }, []);
  console.log(packageUser.activePackage?.price);
  return (
    <div>
      <Card
        sx={{
          m: 1,
          borderRadius: 3,
          border: "1px solid #f2e22c",
          backgroundColor: "transparent",
        }}
      >
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 80,
                m: 3,
                width: 80,
              }}
            />
            <Box>
              <Typography gutterBottom variant="h6">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {user.id}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            fullWidth
            variant="text"
            color="secondary"
            onClick={() => {
              routeChange(`/userDetails`);
            }}
          >
            Update profile info
          </Button>
        </CardActions>
      </Card>
      <Card
        sx={{
          m: 1,
          borderRadius: 3,
          border: "1px solid #f2e22c",
          backgroundColor: "transparent",
        }}
      >
        <CardContent sx={{ ml: 5 }}>
          <Typography sx={{ fontSize: 18 }} color="Subtitle1">
            Your Package
          </Typography>
          <Typography variant="h5" color="Subtitle1">
            {packageUser.activePackage?.name} {packageUser.activePackage?.price}{" "}
            USDT
          </Typography>
        </CardContent>
        <CardContent sx={{ ml: 5 }}>
          <Typography sx={{ fontSize: 18 }} color="Subtitle1">
            Available balance (USDT)
          </Typography>
          <Typography variant="h5" color="Subtitle1">
            {user.totalBalance} USDT
          </Typography>
        </CardContent>
      </Card>

      <Stack spacing={1} direction="column" sx={{ m: 2, mb: 10 }}>
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
        <Button
          color="secondary"
          startIcon={<TrendingUpIcon sx={{ mr: 2 }} />}
          size="large"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "20px",
          }}
          onClick={() => {
            routeChange(`/activityIncome`);
          }}
        >
          Activity Income
        </Button>
        <Button
          color="secondary"
          size="large"
          startIcon={<CreditCardIcon sx={{ mr: 2 }} />}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "20px",
          }}
          onClick={() => {
            routeChange(`/cardManagement`);
          }}
        >
          Card Management
        </Button>
        <Button
          color="secondary"
          startIcon={<HeadsetMicIcon sx={{ mr: 2 }} />}
          size="large"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "20px",
          }}
          onClick={() => {
            routeChange(`/customerService`);
          }}
        >
          Customer Service
        </Button>
        <Button
          color="secondary"
          size="large"
          startIcon={<GroupsIcon sx={{ mr: 2 }} />}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "20px",
          }}
          onClick={() => {
            routeChange(`/aboutUs`);
          }}
        >
          About DTF Team
        </Button>
      </Stack>
    </div>
  );
};

export default Profile;
