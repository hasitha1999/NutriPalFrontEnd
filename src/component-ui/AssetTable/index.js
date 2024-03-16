import React, { useMemo ,useEffect,useState} from "react";
import MaterialReactTable from "material-react-table";
import { getRevenueDate } from "../../use-cases/get-revnue-date";

const AssetTable = (props) => {
  const [data,setData] = useState([]);
    const columns = useMemo(
      () => [
        {
          accessorKey: "dateTime",
          header: "Date",
          size: 80,
        },
        {
          accessorKey: "revenue",
          header: "Daily Revenue",
          size: 40,
        },
        // {
        //   accessorKey: "totalRevenue",
        //   header: "Total Revenue",
        //   size: 40,
        // },
      ],
      []
    );
    useEffect(()=>{
      getRevenueDate(props.timeStamp).then((res)=>setData(res.data))
    },[])

    // data.map((data)=>{
    //   data.dateTime = data.dateTime.substr(0, 19).replace("T", " ");
    //   console.log(data.dateTime);
    // })
    

return (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
    enableColumnFilters={false}
    enablePagination={false}
    enableSorting={false}
    enableBottomToolbar={false}
    enableTopToolbar={false}
    muiTableBodyRowProps={{ hover: false }}
  />
);
}
export default AssetTable;
