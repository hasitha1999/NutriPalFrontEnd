
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import UserDetails from "../pages/UserDetails";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserList from "../pages/ViewAllUsers";
import { Calculate, Dashboard, EventNote, ManageAccounts, Opacity, RamenDining, Restaurant,} from "@mui/icons-material";
import DailyLogs from "../pages/DailyLogs";
import WaterMgt from "../pages/WaterMgt";
import ResetPassword from "../pages/ResetPassword";
import RecipeGenarator from "../pages/RecipeGenarator";
import RecipeSearch from "../pages/RecipeSearch";
import NutritionMeter from "../pages/NutritionMeter";
import AddUser from "../pages/AddUser";
const routeConfig = [
  {
    id: 1,
    path: "/",
    element: <Login />,
    hideLayout: true,
    noAuth: true,
  },
  {
    id: 2,
    path: "/resetPassword",
    element: <ResetPassword />,
    hideLayout: true,
    noAuth: true,
  },

  {
    id: 4,
    path: "/home",
    element: <HomePage />,
    icon: <Dashboard fontSize="medium" />,
    label: "Dashboard",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },
  {
    id: 5,
    path: "/users",
    element: <UserList />,
    icon: <ManageAccounts fontSize="medium" />,
    menu: true,
    label: "User Management",
    roles: ["ADMIN"],   
    noAuth: false,
  },
 
  {
    id: 6,
    path: "/userDetails",
    element: <AddUser />,
    roles: ["ADMIN"],
    noAuth: false,
  },
  {
    id: 8,
    path: "/profile",
    element: <Profile />,
    icon: <AccountCircleIcon fontSize="medium" />,
    label: "Profile",
    menu: true,
    roles: ["USER", "ADMIN"],
    noAuth: false,
  },

  {
    id: 9,
    path: "/recipeGenarator",
    element: <RecipeGenarator />,
    icon: <Restaurant fontSize="medium" />,
    label: "Recipe Genarator",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },
  {
    id: 10,
    path: "/recipeSearch",
    element: <RecipeSearch />,
    roles: ["USER"],
    menu: true,
    icon: <RamenDining fontSize="medium" />,
    label: "Recipe Search",
    noAuth: false,
  },
  {
    id: 11,
    path: "/nutritionMeter",
    element: <NutritionMeter />,
    icon: <Calculate fontSize="medium" />,
    label: "Nutrition Meter",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },
  {

    id: 12,
    path: "/watermgt",
    element: <WaterMgt />,
    icon: <Opacity fontSize="medium" />,
    label: "Hydrate Me",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },
  {
    id: 13,
    path: "/dailylog",
    element: <DailyLogs />,
    icon: <EventNote fontSize="medium" />,
    label: "Daily Logs",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },

];

export default routeConfig;