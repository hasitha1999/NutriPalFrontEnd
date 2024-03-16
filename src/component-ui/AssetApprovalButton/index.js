import { Button } from "@mui/material";
import { acceptAsset } from "../../use-cases/accept-asset";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const AssetApprovalButton = ({ row, setTableRefreshFlag }) => {
const MySwal = withReactContent(Swal);
    const handleClick = () => {
        
        MySwal.fire({
          title: "Are you sure Accept?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            accept();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            MySwal.fire("Cancelled", "Accept is cancelled", "error");
          }
        });
    }
    const accept = ()=>{
      acceptAsset(row)
        .then(() => {
          setTableRefreshFlag((prev) => !prev);
          MySwal.fire("success!", "successfully Accepted...! ", "success");
        })
        .catch(() => {
          MySwal.fire("ERROR", "Somthing went wrong", "error");
        });
    }

  return (
    <Button
      variant="contained"
      color={row.paymentType.id === 1 ? "warning" : "success"}
      onClick={handleClick}
      fullWidth
    >
      Accept {row.paymentType.id === 1 ? "Withdrawal" : "Diposit"}
    </Button>
  );
};
