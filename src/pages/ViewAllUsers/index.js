import React, { useState } from "react";
import Table from "../../component-ui/Table";
import { getUsers } from "../../use-cases/get-users";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "nic",
    header: "NIC",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "height",
    header: "Height",
  }
  // {
  //   accessorKey: "totalBalance",
  //   header: "Total Balance",
  //   Cell: ({ cell }) => (
  //     '$ ' + cell.getValue()
  //   ),
  // },
];

const UserList = () => {
  let navigate = useNavigate();
  const [editingUser, setEditingUser] = useState(null);
  const [tableRefreshFlag, setTableRefreshFlag] = useState(false);

  const setEditingRow = (row) => {
    setEditingUser(row);
  };
  const routeChange = (value) => {
    navigate(value);
  };

  return (
    <div>
      <Grid xs={12} md={12}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center">
      <Button variant="contained" onClick={() => {
                routeChange(`/userDetails?isUpdate=false`);
              }}> + Add New User</Button></Grid>
      <Table
        fetchDataList={getUsers}
        headers={columns}
        rowIdField={"id"}
        setEditingRow={setEditingRow}
        handleStatus={true}
        tableRefreshFlag={tableRefreshFlag}
      />
    </div>
  );
};

export default UserList;
