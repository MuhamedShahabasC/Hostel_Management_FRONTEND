import DataTable from "react-data-table-component";
import RotateSpinner from "./UI/RotateSpinner";
export type { TableColumn } from "react-data-table-component";
export { Media } from "react-data-table-component";

function Table({ columns, data, pending }: any) {
  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: "#f5f5f5",
      },
    },
  };
  return (
    <DataTable
      className="min-w-max"
      columns={columns}
      data={data}
      fixedHeader
      customStyles={tableCustomStyles}
      responsive
      highlightOnHover
      progressPending={pending}
      progressComponent={<RotateSpinner />}
      persistTableHead
      pagination
      noDataComponent={<p className="my-8 font-semibold">No data.</p>}
    ></DataTable>
  );
}

export default Table;
