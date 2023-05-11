import { useMemo, useEffect, useState, useCallback } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import { editIcon, searchIcon } from "../../assets/icons/icons";
import Modal from "../../components/UI/Modal";
import { IBlock, IRoom } from "../../interfaces/block";
import { toast } from "react-toastify";
import { changeRoomAvailabilityAPI, fetchAllBlocksAPI, fetchBlockAPI } from "../../apiRoutes/staff";
import ModalRow from "../../components/UI/ModalRow";
import ModalRowDivider from "../../components/UI/ModalRowDivider";
import ModalDiv from "../../components/UI/ModalDiv";
import Button from "../../components/UI/Button";
import { customPopup } from "../../utils/popup";
import { AxiosError } from "axios";

// Maintenance page
function Maintenance() {
  const [allBlocksData, setAllBlocksData] = useState<IBlock[]>([]);
  const [blockData, setBlockData] = useState<IRoom[]>([]);
  const [filteredBlockData, setFilteredBlockData] = useState<IRoom[]>([]);
  const [roomData, setRoomData] = useState<IRoom | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");

  const fetchBlock = useCallback((filter: string = filterBy) => {
    setPending(true);
    fetchBlockAPI(filter)
      .then(
        ({
          data: {
            data: { rooms },
          },
        }) => {
          setBlockData(rooms);
          setFilteredBlockData(rooms);
        }
      )
      .catch(() => setBlockData([]))
      .finally(() => setPending(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchAllBlocksAPI()
      .then(({ data: { data } }) => {
        setAllBlocksData(data);
        setFilterBy(data[0].name);
        return fetchBlock(data[0].name);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => toast.error(message)
      );

    // eslint-disable-next-line
  }, []);

  const searchHandler = () => {
    setFilteredBlockData(
      blockData.filter(
        ({ code, student }) =>
          code.toLowerCase().includes(searchInput.toString().toLowerCase()) ||
          student?.name.toLowerCase().includes(searchInput.toString().toLowerCase())
      )
    );
    return setSearchInput("");
  };

  const columns: TableColumn<IRoom>[] = useMemo(
    () => [
      {
        name: "Room Code",
        sortable: true,
        selector: (row) => row.code,
      },
      {
        name: "Status",
        sortable: true,
        selector: (row) => (row.availability ? "Available" : "Unavailable"),
        hide: Media.SM,
      },
      {
        name: "Student",
        sortable: true,
        selector: (row) => (row?.student ? row.student?.name : "Unoccupied"),
        grow: 2,
      },
      {
        name: "Actions",
        cell: (row) => {
          return (
            <div className="flex gap-1">
              <button
                title="View Room"
                onClick={() => {
                  setRoomData(row);
                  setModalOpen(true);
                }}
              >
                <img className="image-button h-7" src={editIcon} alt="view details" />
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

  const filterElement = (
    <select
      onChange={({ target: { value } }) => {
        setFilterBy(value);
        fetchBlock(value);
      }}
      className="text-gray-400 text-sm rounded-md px-4 py-2 max-w-fit shadow focus:outline-none"
    >
      {allBlocksData?.map(({ name, _id }) => (
        <option key={_id} value={name}>
          {name}
        </option>
      ))}
    </select>
  );

  const searchElement = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return searchHandler();
      }}
      className="mx-1 my-2 md:m-0 "
    >
      <div className="flex rounded-md py-2 md:py-0 h-full px-4 text-sm shadow focus:outline-none">
        <input
          className="grow focus:outline-none"
          value={searchInput}
          onChange={({ target: { value } }) => setSearchInput(value)}
          placeholder="Search student / room"
          type="text"
        />
        <button type="submit">
          <img
            src={searchIcon}
            alt="search student"
            className="my-auto active:shadow-lg active:animate-ping h-5 w-5"
          />
        </button>
      </div>
    </form>
  );

  return (
    <div className="parent-container">
      <h2>Maintenance</h2>
      <div className="flex flex-col md:flex-row md:justify-between pb-3">
        {filterElement}
        {searchElement}
      </div>
      <h3 className="mx-auto my-2 font-bold text-base text-primary underline underline-offset-2">
        {filterBy ? filterBy : "Block"}
      </h3>
      <Table columns={columns} data={filteredBlockData} pending={pending} />
      <Modal isOpen={modalOpen} heading="Room Details" closeHandler={setModalOpen}>
        <ModalDiv>
          <ModalRow label="Block" value={filterBy} />
          <ModalRow label="Room Code" value={roomData?.code} />
          <ModalRow label="Room No." value={roomData?.number} />
          <ModalRowDivider />
          <ModalRow label="Occupancy" value={roomData?.student ? "Occupied" : "Unoccupied"} />
          {roomData?.student ? (
            <>
              <ModalRow label="Student Name" value={roomData?.student.name} />
              <ModalRow label="Student Email" value={roomData?.student.email} />
            </>
          ) : (
            <>
              <ModalRow
                label="Status"
                value={roomData?.availability ? "Available Room" : "Under maintenance"}
              />
              <Button
                type="button"
                className="mx-auto mt-3 px-5 md:w-1/3"
                onClick={() =>
                  customPopup
                    .fire({
                      html: `Change status of <h2>${roomData?.code}</h2>`,
                      icon: "warning",
                      showCancelButton: true,
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes",
                    })
                    .then(async (result) => {
                      try {
                        if (result.isConfirmed) {
                          const {
                            data: { message },
                          } = await changeRoomAvailabilityAPI(roomData?.code!);
                          setModalOpen(false);
                          toast.success(message);
                          return fetchBlock(filterBy);
                        }
                      } catch (error) {
                        if (error instanceof AxiosError)
                          toast.error(error?.response?.data?.message);
                      }
                    })
                }
              >
                Change Status
              </Button>
            </>
          )}
        </ModalDiv>
      </Modal>
    </div>
  );
}

export default Maintenance;
