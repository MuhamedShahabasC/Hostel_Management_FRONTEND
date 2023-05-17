import moment from "moment";
import { useMemo, useCallback, useEffect, useState } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import { searchIcon, viewIcon } from "../../assets/icons/icons";
import Modal from "../../components/UI/Modal";
import ModalRow from "../../components/UI/ModalRow";
import { fetchPaymentsAPI } from "../../apiRoutes/staff";
import { IPayment } from "../../interfaces/payment";
import Button from "../../components/UI/Button";

// Staff : Payments page for warden
function Payments() {
  const [allPayments, setAllPayments] = useState<IPayment[] | []>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [modalData, setModalData] = useState<IPayment | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchPayments = useCallback((search?: string) => {
    setPending(true);
    fetchPaymentsAPI(search)
      .then(({ data: { data } }) => setAllPayments(data))
      .catch(() => setAllPayments([]))
      .finally(() => setPending(false));
    // eslint-disable-next-line
  }, []);

  const searchHandler = () => {
    fetchPayments(searchInput);
    return setSearchInput("");
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  const columns: TableColumn<IPayment>[] = useMemo(
    () => [
      {
        name: "Student",
        sortable: true,
        selector: (row) => row.student?.name,
        grow: 3,
      },
      {
        name: "Ref ID",
        sortable: true,
        selector: (row) => row.refId,
        hide: Media.SM,
        grow: 2,
      },
      {
        name: "Amount",
        sortable: true,
        selector: (row) => row.amount,
        hide: Media.SM,
      },
      {
        name: "Actions",
        cell: (row) => (
          <button
            title="View payment"
            onClick={() => {
              setModalData(row);
              setModalOpen(true);
            }}
          >
            <img className="image-button h-7" src={viewIcon} alt="view details" />
          </button>
        ),
        ignoreRowClick: true,
        button: true,
      },
    ],
    // eslint-disable-next-line
    []
  );

  return (
    <div className="parent-container relative">
      <h2>Payments</h2>
      <div className="flex flex-col md:flex-row md:justify-between pb-3">
        <form
          className="mx-1 my-2 md:m-0"
          onSubmit={(e) => {
            e.preventDefault();
            return searchHandler();
          }}
        >
          <div className="flex rounded-md md:py-0 h-9 px-4 text-sm shadow focus:outline-none">
            <input
              className="grow focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search ref id"
              type="text"
            />
            <img
              src={searchIcon}
              alt="Search ref id"
              className="my-auto active:shadow-lg active:animate-ping h-5 w-5"
            />
          </div>
        </form>
        <Button
          className="text-sm w-1/3 md:w-auto mx-auto md:mx-0"
          type="button"
          onClick={() => {
            setSearchInput("");
            searchHandler();
          }}
        >
          All Payments
        </Button>
      </div>
      <Table columns={columns} data={allPayments} pending={pending} />
      <Modal isOpen={modalOpen} heading={"Payments"} closeHandler={setModalOpen}>
        <div className="flex flex-col justify-center md:px-4">
          <ModalRow value={modalData?.student?.name} label="Student" />
          <ModalRow value={modalData?.student?.email} label="Email" />
          <span className="border-b mx-10 my-3 "></span>
          <ModalRow value={`₹ ${modalData?.amount.toLocaleString("en-IN")}`} label="Amount" />
          <ModalRow value={modalData?.refId} label="Ref ID" />
          <ModalRow value={moment(modalData?.date).format("LLL")} label="Date" />
          <span className="border-b mx-10 my-3 "></span>
          <ModalRow
            value={`₹ ${modalData?.balancePayment.toLocaleString("en-IN")}`}
            label="Balance Amount"
          />
          <ModalRow
            value={`₹ ${modalData?.paidPayment.toLocaleString("en-IN")}`}
            label="Paid Amount"
          />
        </div>
      </Modal>
    </div>
  );
}

export default Payments;
