import { useMemo, useEffect, useState, useCallback } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import { disableOutineIcon, editIcon, searchIcon, tickIcon } from "../../assets/icons/icons";
import {
  checkRoomAvailability,
  fetchAllStudentsAPI,
  fetchAvailableRooms,
  updateSingleStudentAPI,
} from "../../apiRoutes/chiefWarden";
import Modal from "../../components/UI/Modal";
import { IRoom } from "../../interfaces/block";
import { Form, Formik } from "formik";
import SelectInput from "../../components/Form/SelectInput";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { IStudent } from "../../interfaces/student";
import { updateStudentSchema } from "../../schema/student";

// Students page of Chief warden
function Students() {
  const [studentsData, setStudentsData] = useState<IStudent[]>([]);
  const [studentData, setStudentData] = useState<IStudent | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [availableRooms, setAvailableRooms] = useState<{ value: string; text: string }[]>([
    { value: "", text: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [roomAvailability, setRoomAvailability] = useState<"available" | "unavailable" | null>(
    null
  );

  const fetchAllStudents = useCallback((filter?: string, search?: string) => {
    setPending(true);
    fetchAllStudentsAPI(filter, search)
      .then(({ data: { data } }) => {
        setStudentsData(data);
      })
      .catch(() => setStudentsData([]))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    fetchAllStudents();
    // eslint-disable-next-line
  }, []);

  const filterHandler = (value: string) => {
    setFilterBy(value);
    fetchAllStudents(value, searchInput);
  };

  const searchHandler = () => {
    fetchAllStudents(filterBy, searchInput);
    setSearchInput("");
  };

  const columns: TableColumn<IStudent>[] = useMemo(
    () => [
      {
        name: "Name",
        sortable: true,
        selector: (row) => row.name,
        grow: 2,
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
                  checkRoomAvailability(row.room)
                    .then(({ data: { message } }) => {
                      setRoomAvailability(message);
                    })
                    .catch(() => setRoomAvailability("unavailable"))
                    .finally(() => {
                      fetchAvailableRooms(row?.block?._id!)
                        .then(({ data: { data } }) => {
                          setAvailableRooms(
                            data.map((room: IRoom) => {
                              return { value: room.code, text: room.code };
                            })
                          );
                        })
                        .catch(({ response: { data: message } }) => toast.error(message))
                        .finally(() => setModalOpen(true));
                    });
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
      onChange={(e) => filterHandler(e.target.value)}
      className="text-gray-400 text-sm rounded-md px-4 py-2 max-w-fit shadow focus:outline-none"
    >
      <option value="">Filter by status</option>
      <option value="">All Students</option>
      <option value="pending">Pending</option>
      <option value="resident">Resident</option>
      <option value="rejected">Rejected</option>
      <option value="departed">Departed</option>
    </select>
  );

  const searchElement = (
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
          placeholder="Search staff"
          type="text"
        />
        <img
          src={searchIcon}
          alt="Search staff"
          className="my-auto active:shadow-lg active:animate-ping h-5 w-5"
        />
      </div>
    </form>
  );

  const studentStatusOptions = useMemo(
    () => [
      {
        text: "PENDING",
        value: "pending",
      },
      {
        text: "RESIDENT",
        value: "resident",
      },
      {
        text: "REJECTED",
        value: "rejected",
      },
      {
        text: "DEPARTED",
        value: "departed",
      },
    ],
    []
  );

  return (
    <div className="parent-container">
      <h2>Students</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between pb-3">
        {filterElement}
        {searchElement}
      </div>
      <Table columns={columns} data={studentsData} pending={pending} />
      <Modal isOpen={modalOpen} heading="Student Details" closeHandler={setModalOpen}>
        <div className="flex flex-col md:px-4">
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Name: </span>
            <span>{studentData?.name}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Status: </span>
            <span className="font-black">{studentData?.status.toUpperCase()}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">School Mail: </span>
            <span>{studentData?.email}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Mobile: </span>
            <span>{studentData?.mobile}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Department: </span>
            <span className="capitalize">{studentData?.department}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Gender: </span>
            <span className="capitalize">{studentData?.gender}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Guardian: </span>
            <span>
              {studentData?.guardianName} , {studentData?.guardianMobile}
            </span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Address: </span>
            <span className="flex flex-col">
              <span>{studentData?.address?.building}</span>
              <span>{studentData?.address?.city}</span>
              <span>{studentData?.address?.pin}</span>
              <span>{studentData?.address?.state}</span>
              <span>{studentData?.address?.country}</span>
            </span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Blood Group: </span>
            <span>{studentData?.bloodGroup}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Remarks: </span>
            <span>{studentData?.remarks}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Meal Plan: </span>
            <span>{studentData?.mealPlan?.title}</span>
          </span>
          <span className="border-b mx-10 my-3 "></span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Paid Payment: </span>
            <span>₹ {studentData?.paidPayment}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Balance Payment: </span>
            <span>₹ {studentData?.balancePayment}</span>
          </span>
          <span className="border-b mx-10 my-3 "></span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Block: </span>
            <span>{studentData?.block?.name}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Room: </span>
            <div className="flex">
              <span>{studentData?.room}</span>
              {studentData?.status === "pending" && (
                <div className="ml-3 flex items-center">
                  <span
                    className={` ${
                      roomAvailability === `available` ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    Room is {roomAvailability}
                  </span>
                  {roomAvailability === `available` ? (
                    <img className="ml-1 w-5" src={tickIcon} alt="room is available" />
                  ) : (
                    <img className="ml-1 w-5" src={disableOutineIcon} alt="room is unavailable" />
                  )}
                </div>
              )}
            </div>
          </span>
          {(studentData?.status === "pending" || studentData?.status === "resident") && (
            <>
              <span className="border-b mx-10 my-3 "></span>
              <span className="flex">
                <span className="w-1/3 md:w-1/4 left-0">Update: </span>
                <Formik
                  initialValues={{
                    room: studentData?.room,
                    status: studentData?.status,
                    oldRoom: studentData?.room,
                    oldStatus: studentData?.status,
                  }}
                  validationSchema={updateStudentSchema}
                  onSubmit={(formData, { setSubmitting }) => {
                    setErrorMessage(null);
                    setSubmitting(true);
                    const student = {
                      email: studentData?.email,
                      name: studentData?.name,
                      mealPlan: studentData?.mealPlan?._id,
                    };
                    updateSingleStudentAPI(studentData?._id!, { ...formData, student })
                      .then(() => {
                        fetchAllStudents();
                        setModalOpen(false);
                        toast.success(`${studentData?.name} updated`);
                      })
                      .catch(
                        ({
                          response: {
                            data: { message },
                          },
                        }) => {
                          setErrorMessage(message);
                        }
                      )
                      .finally(() => setSubmitting(false));
                  }}
                >
                  {({ isSubmitting }) => (
                    <>
                      <Form className="text-sm">
                        <div className="flex flex-col md:flex-row justify-center gap-4 px-1 mb-3">
                          <SelectInput
                            label="Select Room"
                            name="room"
                            options={availableRooms}
                            defaultValue={studentData?.room}
                            edit
                          />
                          <SelectInput
                            label="Select Status"
                            name="status"
                            options={studentStatusOptions.filter(({ value }) => {
                              if (studentData?.status === "pending") {
                                if (value === "rejected" || value === "resident") return true;
                                else return false;
                              } else {
                                if (studentData?.status === "resident") {
                                  if (value === "departed") return true;
                                  else return false;
                                } else {
                                  return false;
                                }
                              }
                            })}
                            defaultValue={studentData?.status.toUpperCase()}
                            edit
                          />
                        </div>
                        {isSubmitting ? (
                          <LoadingButton className="mx-auto" />
                        ) : (
                          <Button className="mx-auto" type="submit">
                            Update changes
                          </Button>
                        )}
                      </Form>
                      {errorMessage && (
                        <span className="text-center text-md font-semibold text-red-700">
                          {errorMessage}
                        </span>
                      )}
                    </>
                  )}
                </Formik>
              </span>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Students;
