import React from 'react'
import { Box } from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const HomePage = () => {
  const role = sessionStorage.getItem("ROLE");
  const MySwal = withReactContent(Swal);
//   const first = sessionStorage.getItem("firstTime");
// console.log(first);
//   if (first) {
//     sessionStorage.setItem("firstTime", false);
//   } else {
//     sessionStorage.setItem("firstTime", true);
//   }
//  console.log(first)
//   if (role == "ADMIN" && !first ) {
//     MySwal.fire(
//       "Disclaimer!",
//       "By accessing this application, you agree not to use it for any illegal purpose. Unauthorized use or distribution of this application may be subject to legal consequences. The developer team will not be held responsible for any issues that may arise after the release of this application.",
//       "warning"
//     );
//   } else {
//     MySwal.fire("WELCOME", "", "");
//   }
  return (
    <div>
      <Box sx={{align:"center"}}>
      </Box>
    </div>
  );
}

export default HomePage;