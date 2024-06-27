import { Fastfood, Person, Shield } from "@mui/icons-material";
import {
  Box,
  LinearProgress,
  styled
} from "@mui/material";
import { useEffect, useState } from "react";
import ProfileInformation from "../../component-content/ProfileInformation";
import CustomTabs from "../../component-ui/CustomTabs";
import {
  getUserDetails,
} from "../../use-cases/get-user-details";
import DietaryPreferences from "../../component-ui/DietaryPreferences";
import Security from "../../component-ui/Security";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
}));

const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserDetails().then((res) => setUser(res.data));
  }, []);

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
      component: <DietaryPreferences />,
    },
    {
      label: (
        <Box sx={{ display: "flex" }}>
          <Shield sx={{ marginRight: 1 }} />
          Security
        </Box>
      ),
      component: <Security />,
    },
  ];

  return (
    <div>
      <CustomTabs tabValues={tabValues} />
    </div>
  );
};

export default Profile;