// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MobileStepper from "@mui/material/MobileStepper";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
// import { Button } from "@mui/material";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: "Slide1",
//     imgPath: "/img/slide1.jpeg",
//   },
//   {
//     label: "Slide2",
//     imgPath: "/img/slide2.jpeg",
//   },
//   {
//     label: "Slide3",
//     imgPath: "/img/slide3.jpeg",
//   },
//   {
//     label: "Slide4",
//     imgPath: "/img/slide4.jpeg",
//   },
//   {
//     label: "Slide5",
//     imgPath: "/img/slide5.jpeg",
//   },
//   {
//     label: "Slide6",
//     imgPath: "/img/slide6.jpeg",
//   },
// ];

// const AutomaticSlider = () => {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = images.length;

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };
//   return (
//     <Box sx={{ m: 2 }}>
//       <AutoPlaySwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//       >
//         {images.map((step, index) => (
//           <div key={step.label}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <Box
//                 component="img"
//                 sx={{
//                   height: 200,
//                   display: "block",
//                   overflow: "hidden",
//                   width: "100%",
//                 }}
//                 src={step.imgPath}
//                 alt={step.label}
//               />
//             ) : null}
//           </div>
//         ))}
//       </AutoPlaySwipeableViews>
//       <Box>
//         <MobileStepper
//           steps={maxSteps}
//           position="absolute"
//           activeStep={activeStep}
//           backButton={<Button></Button>}
//           nextButton={<Button></Button>}
//           sx={{ display: "flex", justifyContent: "space-between" }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AutomaticSlider;
