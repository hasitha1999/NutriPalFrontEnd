
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import UserDetails from "../pages/UserDetails";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MealPlannerComponent from "../pages/MealPlannerComponent";
import UserList from "../pages/ViewAllUsers";
import { Calculate, Dashboard, EventNote, ManageAccounts, Opacity, RamenDining, Restaurant,} from "@mui/icons-material";
import DailyLogs from "../pages/DailyLogs";
import WaterMgt from "../pages/WaterMgt";
import BmiCalculator from "../pages/BMICalculator";
import ResetPassword from "../pages/ResetPassword";
const routeConfig = [
  {
    id: 1,
    path: "/login",
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
    icon: <Dashboard fontSize="large" />,
    label: "Dashboard",
    menu: true,
    roles: ["USER","ADMIN"],
    noAuth: false,
  },
  {
    id: 5,
    path: "/users",
    element: <UserList />,
    icon: <ManageAccounts fontSize="large" />,
    menu: true,
    label: "User Management",
    roles: ["ADMIN"],
    noAuth: false,
  },
 
  {
    id: 6,
    path: "/userDetails",
    element: <UserDetails />,
    roles: ["USER", "ADMIN"],
    noAuth: false,
  },
  {
    id: 8,
    path: "/profile",
    element: <Profile />,
    icon: <AccountCircleIcon fontSize="large" />,
    label: "Profile",
    menu: true,
    roles: ["USER", "ADMIN"],
    noAuth: false,
  },
  {
    id: 9,
    path: "/meal",
    element: <MealPlannerComponent />,
    roles: ["USER"],
    menu: true,
    icon: <RamenDining fontSize="large" />,
    label: "Meal Planner",
    noAuth: false,
  },
  {
    id: 10,
    path: "/recepieGenarator",
    element: <HomePage />,
    icon: <Restaurant fontSize="large" />,
    label: "Recepie Genarator",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },
  {
    id: 11,
    path: "/bmiCal",
    element: <BmiCalculator />,
    icon: <Calculate fontSize="large" />,
    label: "Nutrition Calculator",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },
  {

    id: 12,
    path: "/watermgt",
    element: <WaterMgt />,
    icon: <Opacity fontSize="large" />,
    label: "Water managment",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },
  {
    id: 13,
    path: "/dailylog",
    element: <DailyLogs />,
    icon: <EventNote fontSize="large" />,
    label: "Daily Logs",
    menu: true,
    roles: ["USER"],
    noAuth: false,
  },

];

export default routeConfig;