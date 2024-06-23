import { Button, styled } from "@mui/material";

const CustomButton = styled(Button)(({ theme, active }) => ({
  ...(active
    ? {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      }
    : {
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
      }),
}));

const TabButton = (props) => {
  return <CustomButton active={props.active}>{props.children}</CustomButton>;
};

export default TabButton;