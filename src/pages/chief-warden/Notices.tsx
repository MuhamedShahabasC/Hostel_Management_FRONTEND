import { Media, TableColumn } from "react-data-table-component";
import { useEffect, useMemo, useState } from "react";
import Table from "../../components/Table";
import { getAllNotices } from "../../apiRoutes/chiefWarden";
import { errorToast } from "../../middleware/errorToast";
import Modal from "../../components/UI/Modal";

interface TableRow {
  title: string;
  message: string;
  visibility: boolean;
}

function Notices() {
  const [pending, setPending] = useState<boolean>(true);
  const [allNotices, setAllNotices] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    getAllNotices()
      .then(({ data: { data } }) => setAllNotices(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setPending(false));
  }, []);

  const modalElement = (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="w-1/4 left-0">Title: </span>
        <span className="w-2/3">{modalData?.title}</span>
      </div>
      <div className="flex justify-between ">
        <span className="w-1/4 left-0">Message: </span>
        <span className="w-2/3">{modalData?.message}</span>
      </div>
      <div className="flex justify-between ">
        <span className="w-1/4 left-0">Date: </span>
        <span className="w-2/3">{(new Date(modalData?.date)).toString()}</span>
      </div>
      
    </div>
  );

  const columns: TableColumn<TableRow>[] = useMemo(
    () => [
      {
        name: "Title",
        sortable: true,
        selector: (row) => row.title,
      },
      {
        name: "Active",
        sortable: true,
        selector: (row) => (row.visibility ? "Visible" : "Hidden"),
        hide: Media.SM,
      },
      {
        name: "Actions",
        cell: (row) => {
          return (
            <>
              <button
                className="mx-2"
                onClick={() => {
                  setModalData(row);
                  setModalOpen(true);
                }}
              >
                View
              </button>
              <button onClick={() => alert("edit")}>Edit</button>
            </>
          );
        },
        ignoreRowClick: true,
        button: true,
      },
    ],
    []
  );
  return (
    <div className="parent-container ">
      <h2>Notices</h2>
      <Table columns={columns} data={allNotices} pending={pending} />
      <Modal
        isOpen={modalOpen}
        heading={modalData?.title}
        closeHandler={setModalOpen}
      >
        {modalData && modalElement}
      </Modal>
    </div>
  );
}

export default Notices;
