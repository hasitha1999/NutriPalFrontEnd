import React, { useState } from "react";
import Table from "../../component-ui/Table";
import { getUsers } from "../../use-cases/get-users";
import EditUser from "../../component-ui/EditUser";
import { changeUserStatus } from "../../use-cases/change-user-status";

const columns = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
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
  const [editingUser, setEditingUser] = useState(null);
  const [tableRefreshFlag, setTableRefreshFlag] = useState(false);

  const setEditingRow = (row) => {
    setEditingUser(row);
  };

  const handleStatus = async (id) => {
    await changeUserStatus(id);
    setTableRefreshFlag((prev) => !prev);
  };

  return (
    <div>
      <Table
        fetchDataList={getUsers}
        headers={columns}
        rowIdField={"id"}
        setEditingRow={setEditingRow}
        handleStatus={handleStatus}
        tableRefreshFlag={tableRefreshFlag}
      />
      <EditUser
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        setTableRefreshFlag={setTableRefreshFlag}
      />
    </div>
  );
};

export default UserList;
