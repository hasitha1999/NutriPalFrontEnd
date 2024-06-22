import { Fastfood, Person, Shield } from "@mui/icons-material";
import {
  Box,
  LinearProgress,
  styled
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInformation from "../../component-content/ProfileInformation";
import CustomTabs from "../../component-ui/CustomTabs";
import {
  getNCDDetails,
  getUserDetails,
} from "../../use-cases/get-user-details";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
}));

const Profile = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [allNCD, setAllNCD] = useState([]);
  const routeChange = (value) => {
    navigate(value);
  };
  useEffect(() => {
    getUserDetails().then((res) => setUser(res.data));
    getNCDDetails().then((res) => setAllNCD(res.data));
  }, []);
  const findHelthyWeight = (tragetBMI) => {
    return Math.round(tragetBMI * (user.height / 100) ** 2);
  };
  const calculateWaterIntake = () => {
    return Math.round(((user.weight * 2.2) / 2) * 29.574 * 100) / 100;
  };

  const tabValues = [
    {
      label: (
        <Box sx={{ display: "flex" }}>
          <Person sx={{ marginRight: 1 }} />
          Profile Information
        </Box>
      ),
      component: <ProfileInformation />,
    },
    {
      label: (
        <Box sx={{ display: "flex" }}>
          <Fastfood sx={{ marginRight: 1 }} />
          Dietary Preferences
        </Box>
      ),
      component: <ProfileInformation />,
    },
    {
      label: (
        <Box sx={{ display: "flex" }}>
          <Shield sx={{ marginRight: 1 }} />
          Security
        </Box>
      ),
      component: <>Health Information'</>,
    },
  ];

  return (
    <div>
      <CustomTabs tabValues={tabValues} />
    </div>
  );
};

export default Profile;