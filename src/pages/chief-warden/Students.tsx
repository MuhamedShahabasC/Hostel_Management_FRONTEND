import { useMemo, useEffect, useState } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import { editIcon, searchIcon } from "../../assets/icons/icons";
import { fetchAllStudents } from "../../apiRoutes/chiefWarden";
import Modal from "../../components/UI/Modal";
import StudentDetails from "../../components/Form/StudentDetails";

interface TableRow {
  name: string;
  status: "pending" | "resident" | "suspended" | "departed";
  room: string;
  email: string;
}

// Students page of Chief warden
function Students() {
  const [studentsData, setStudentsData] = useState<any[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    setPending(true);
    fetchAllStudents()
      .then(({ data: { data } }) => setStudentsData(data))
      .catch(({ response: { message } }) => alert(message))
      .finally(() => setPending(false));
  }, []);

  const columns: TableColumn<TableRow>[] = useMemo(
    () => [
      {
        name: "Name",
        sortable: true,
        selector: (row) => row.name,
      },
      {
        name: "Status",
        sortable: true,
        selector: (row) => row.status.toUpperCase(),
      },
      {
        name: "Room",
        sortable: true,
        selector: (row) => row.room,
        hide: Media.SM,
      },
      {
        name: "Actions",
        cell: (row) => {
          return (
            <div className="flex gap-1">
              <button
                title="View Student"
                onClick={() => {
                  setStudentData(row);
                  setModalOpen(true);
                }}
              >
                <img className="image-button h-7" src={editIcon} alt="view details" />
              </button>
              {/* <button
                title="Change Visibility"
                onClick={
                  async () => console.log(row.email)
                  // await changeNoticeVisibility(row.email, row)
                  //   .then(() => toast.success(`Notice updated`))
                  //   .then(fetchNotices)
                }
              >
                <img className="image-button h-7" src={tickIcon} alt="active notice" />
              </button>
              <button title="Delete Notice" onClick={async () => alert(row.email)}>
                <img className="image-button h-7" src={deleteIcon} alt="delete notice" />
              </button> */}
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

  const [searchInput, setSearchInput] = useState<string>("");

  const filterHandler = (filterBy: string) => {
    // setFilter
    console.log(filterBy);
  };
  const searchHandler = () => {
    // setSearch
    setSearchInput("");
  };

  const filterElement = (
    <select
      onChange={(e) => filterHandler(e.target.value)}
      className="text-gray-400 text-sm rounded-md px-4 py-2 max-w-fit shadow focus:outline-none"
    >
      <option value="noFilter">Filter by status</option>
      <option value="">All Students</option>
      <option value="pending">Pending</option>
      <option value="resident">Resident</option>
      <option value="suspended">Suspended</option>
      <option value="departed">Departed</option>
    </select>
  );

  const searchElement = (
    <div>
      <div className="flex rounded-md h-full px-4 text-sm shadow focus:outline-none">
        <input
          className="grow focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search"
          type="text"
        />
        <img
          src={searchIcon}
          alt="search student"
          onClick={searchHandler}
          className="my-auto active:shadow-lg active:animate-ping h-5 w-5"
        />
      </div>
    </div>
  );

  return (
    <div className="parent-container">
      <h2>Students</h2>
      <div className="flex flex-col md:flex-row md:justify-between pb-3">
        {filterElement}
        {searchElement}
      </div>
      <Table columns={columns} data={studentsData} pending={pending} />
      <Modal isOpen={modalOpen} heading="Student Details" closeHandler={setModalOpen}>
        {studentData && <StudentDetails studentData={studentData} />}
      </Modal>
    </div>
  );
}

export default Students;
