import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DoNotDisturb, Edit, PanToolAlt } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Table = ({
  fetchDataList,
  headers,
  rowIdField,
  handleStatus,
  setEditingRow,
  tableRefreshFlag,
  rowActions
}) => {
  //data and fetching state
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [statusChangeRowId, setStatusChangeRowId] = useState(null);

  const fetchData = async () => {
    console.log(globalFilter);
    setIsLoading(true);

    try {
      const data = await fetchDataList(
        pagination.pageIndex,
        pagination.pageSize,
        globalFilter || ""
      );
      setData(data.data.data);
      setRowCount(data.data.count);
      setIsError(false);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    tableRefreshFlag,
  ]);

  const setStateChangeRow = (rowId, isActive) => {
    setStatusChangeRowId({ rowId, isActive });
  };

  const handleStatusChange = () => {
    handleStatus && handleStatus(statusChangeRowId.rowId).then();
    setStatusChangeRowId(null);
  };

  return (
    <>
      <Box>
        <MaterialReactTable
          columns={headers}
          data={data}
          getRowId={(row) => row[rowIdField]}
          enableColumnActions={false}
          enableColumnFilters={false}
          enableSorting={false}
          manualPagination
          manualSorting
          manualFiltering
          muiToolbarAlertBannerProps={
            isError
              ? {
                  color: "error",
                  children: "Data Loading Error",
                }
              : undefined
          }
          muiLinearProgressProps={() => ({
            sx: {
              display: "none", //hide bottom progress bar
            },
          })}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          rowCount={rowCount}
          state={{
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
          }}
          enableEditing={setEditingRow !== undefined || handleStatus !== undefined || rowActions !== undefined}
          // enableEditing
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              {setEditingRow && (
                <Tooltip arrow placement="left" title={"Edit"}>
                  <IconButton onClick={() => setEditingRow(row.original)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
              {handleStatus && (
                <Tooltip
                  arrow
                  placement="left"
                  title={row.original.isActive ? "Disable" : "Enable"}
                >
                  <IconButton
                    onClick={() =>
                      setStateChangeRow(
                        row.original[rowIdField],
                        row.original.isActive
                      )
                    }
                  >
                    {row.original.isActive ? <DoNotDisturb /> : <PanToolAlt />}
                  </IconButton>
                </Tooltip>
              )}
              {rowActions && rowActions(row.original)}
            </Box>
          )}
        />
      </Box>
      <Dialog
        open={statusChangeRowId != null}
        onClose={() => setStatusChangeRowId(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to{" "}
          {statusChangeRowId?.isActive ? "deactivate" : "activate"} user?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setStatusChangeRowId(null)}>No</Button>
          <Button onClick={handleStatusChange} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Table;
