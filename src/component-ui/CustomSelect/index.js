import { Select, styled } from "@mui/material";

export const CustomSelect = styled((props) => <Select {...props} />)(
  ({ theme }) => ({
    "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      opacity: "0.8",
    },
    "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      opacity: "1",
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[200],
    },
  })
);