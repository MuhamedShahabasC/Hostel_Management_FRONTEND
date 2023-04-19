import { Media, TableColumn } from "react-data-table-component";
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../components/Table";
import { changeNoticeVisibility, deleteNotice, getAllNotices } from "../../apiRoutes/chiefWarden";
import { errorToast } from "../../helpers/toasts";
import Modal from "../../components/UI/Modal";
import { toast } from "react-toastify";
import { deleteIcon, disableIcon, editIcon, tickIcon, viewIcon } from "../../assets/icons/icons";
import NoticeForm from "../../components/Form/Notice";
import Button from "../../components/UI/Button";
import { customPopup } from "../../helpers/popup";
import { INotice } from "../../interfaces/chiefWarden";

// Notices Page - Chief Warden
function Notices() {
  const [allNotices, setAllNotices] = useState<INotice[] | []>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(true);
  const [modalData, setModalData] = useState<any>(null);
  const [formRole, setFormRole] = useState<"new" | "edit">("edit");

  const fetchNotices = useCallback(() => {
    getAllNotices()
      .then(({ data: { data } }) => setAllNotices(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    fetchNotices();
    // eslint-disable-next-line
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
        <span className="w-2/3">{new Date(modalData?.date!).toString()}</span>
      </div>
      <div className="text-center mt-5">
        <button
          title="Edit Notice"
          className="image-button"
          onClick={() => {
            setView(false);
            setModalData(modalData);
            setModalOpen(true);
            setFormRole("edit");
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 border-1">
            <h4>Edit Notice</h4>
            <img className="h-7" src={editIcon} alt="edit details" />
          </div>
        </button>
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
        grow: 2,
        cell: (row) => {
          return (
            <div className="flex gap-1">
              <button
                title="View Notice"
                onClick={() => {
                  setView(true);
                  setModalData(row);
                  setModalOpen(true);
                }}
              >
                <img className="image-button h-7" src={viewIcon} alt="view details" />
              </button>
              <button
                title="Change Visibility"
                onClick={async () =>
                  await changeNoticeVisibility(row._id, row)
                    .then(() => toast.success(`Notice updated`))
                    .then(fetchNotices)
                }
              >
                {row.visibility ? (
                  <img className="image-button h-7" src={tickIcon} alt="active notice" />
                ) : (
                  <img className="image-button h-7" src={disableIcon} alt="disabled notice" />
                )}
              </button>
              <button title="Delete Notice" onClick={async () => deleteNoticeHandler(row._id)}>
                <img className="image-button h-7" src={deleteIcon} alt="delete notice" />
              </button>
            </div>
          );
        },
        ignoreRowClick: true,
        button: true,
      },
    ],
    // eslint-disable-next-line
    []
  );

  const newNoticeHandler = (): void => {
    setFormRole("new");
    setModalData([]);
    setView(false);
    setModalOpen(true);
  };

  const deleteNoticeHandler = (_id: string): void => {
    customPopup
      .fire({
        title: "Confirm delete?",
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Delete`,
        showConfirmButton: false,
      })
      .then((result) => {
        if (result.isDenied)
          return deleteNotice(_id).then(({ data }) => {
            fetchNotices();
            toast.success(data?.message);
          });
      });
  };

  return (
    <div className="parent-container ">
      <h2>Notices</h2>
      <Table columns={columns} data={allNotices} pending={pending} />
      <Button
        className="max-w-max px-9 text-sm mx-auto mt-3"
        type="button"
        onClick={newNoticeHandler}
      >
        New Notice
      </Button>
      <Modal
        isOpen={modalOpen}
        heading={modalData?.title || "New Notice"}
        closeHandler={setModalOpen}
      >
        {modalData && view && modalElement}
        {modalData && !view && (
          <NoticeForm
            modalData={modalData}
            fetchAllNotices={fetchNotices}
            role={formRole}
            setModal={setModalOpen}
          />
        )}
      </Modal>
    </div>
  );
}

interface TableRow {
  _id: string;
  title: string;
  message: string;
  visibility: boolean;
}

export default Notices;
