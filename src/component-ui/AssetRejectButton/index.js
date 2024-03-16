import { Button } from "@mui/material";
import { rejectAsset } from "../../use-cases/reject-asset";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const AssetRejectButton = ({ row, setTableRefreshFlag }) => {
const MySwal = withReactContent(Swal);

    const handleClick = () => {
      MySwal.fire({
        title: "Are you sure Reject?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          reject();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire("Cancelled", "Rejection is cancelled", "error");
        }
      });
     
    }
    const reject = ()=>{
        rejectAsset(row)
          .then(() => {
            setTableRefreshFlag((prev) => !prev);
            MySwal.fire(
              "success!",
              "Rejection is successful..",
              "success"
            );
          })
          .catch(() => {
            MySwal.fire("ERROR", "Somthing went wrong", "error");
          });
    }

  return (
    <Button
      variant="contained"
      color={'error'}
      onClick={handleClick}
      fullWidth
    >
      Reject {row.paymentType.id === 1 ? "Withdrawal" : "Diposit"}
    </Button>
  );
};
