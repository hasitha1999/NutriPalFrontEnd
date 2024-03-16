import EmailVerification from "../pages/EmailVerification";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import UserDetails from "../pages/UserDetails";
import NewRegistration from "../pages/NewRegistration";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ViewAllNotAccepted from "../pages/ViewAllNotAccepted";
import UserList from "../pages/ViewAllUsers";

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
    path: "/signup",
    element: <SignUp />,
    hideLayout: true,
    noAuth: true,
  },
  {
    id: 3,
    path: "/email-verification/:verificationToken",
    element: <EmailVerification />,
    hideLayout: true,
    noAuth: true,
  },
  {
    id: 4,
    path: "/home",
    element: <HomePage />,
    icon: <HomeIcon fontSize="large" />,
    label: "Home",
    menu: true,
    roles: ["USER", "ADMIN"],
    noAuth: true,
  },
  {
    id: 7,
    path: "/users",
    element: <UserList />,
    icon: <HomeIcon fontSize="large" />,
    menu: true,
    label: "Users",
    roles: ["ADMIN"],
    noAuth: true,
  },
 
  {
    id: 12,
    path: "/userDetails",
    element: <UserDetails />,
    roles: ["USER", "ADMIN"],
    noAuth: true,
  },
  {
    id: 23,
    path: "/newRegistration",
    element: <NewRegistration />,
    roles: ["USER"],
    noAuth: true,
  },
  {
    id: 29,
    path: "/profile",
    element: <Profile />,
    icon: <AccountCircleIcon fontSize="large" />,
    label: "Profile",
    menu: true,
    roles: ["USER", "ADMIN"],
    noAuth: true,
  },
  {
    id: 30,
    path: "/viewAllNotAccepted",
    element: <ViewAllNotAccepted />,
    roles: ["ADMIN"],
    menu: true,
    icon: <AccountCircleIcon fontSize="large" />,
    label: "Not Accepted",
    noAuth: true,
  },
];

export default routeConfig;