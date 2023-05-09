import { useMemo, useEffect, useState, useCallback } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import { editIcon, searchIcon } from "../../assets/icons/icons";
import Modal from "../../components/UI/Modal";
import { IStudent } from "../../interfaces/student";
import { fetchAllStudentsAPI, updateStudentPaymentAPI } from "../../apiRoutes/staff";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import ModalRow from "../../components/UI/ModalRow";
import moment from "moment";
import { monthlyPaymentSchema } from "../../schema/staff";

// Students page of warden
function Students() {
  const [studentsData, setStudentsData] = useState<IStudent[]>([]);
  const [studentData, setStudentData] = useState<IStudent | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [billAmount, setBillAmount] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");

  const filterHandler = (value: string) => {
    setFilterBy(value);
    fetchAllStudents(value, searchInput);
  };

  const searchHandler = () => {
    fetchAllStudents(filterBy, searchInput);
    setSearchInput("");
  };

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

  const columns: TableColumn<IStudent>[] = useMemo(
    () => [
      {
        name: "Name",
        sortable: true,
        selector: (row) => row.name,
        grow: 2,
      },
      {
        name: "Pending",
        sortable: true,
        selector: (row) => `₹ ${row.balancePayment}`,
      },
      {
        name: "Last Billed",
        sortable: true,
        selector: (row) => row.lastBilledMonth,
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
                  setBillAmount(row.balancePayment + row.mealPlan.price + 1500);
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
      onChange={(e) => filterHandler(e.target.value)}
      className="text-gray-400 text-sm rounded-md px-4 py-2 max-w-fit shadow focus:outline-none"
    >
      <option value="">Filter by status</option>
      <option value="">All Students</option>
      <option value="resident">Resident</option>
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
            <span className="w-1/3 md:w-1/4 left-0">Guardian: </span>
            <span>
              {studentData?.guardianName} , {studentData?.guardianMobile}
            </span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Block: </span>
            <span>{studentData?.block?.name}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Room: </span>
            <div className="flex">
              <span>{studentData?.room}</span>
            </div>
          </span>
          <span className="border-b mx-10 my-3 "></span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Meal Plan: </span>
            <span>
              {studentData?.mealPlan?.title} Plan : ₹ {studentData?.mealPlan?.price}/Month
            </span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Paid Payment: </span>
            <span>₹ {studentData?.paidPayment}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Balance Payment: </span>
            <span>₹ {studentData?.balancePayment}</span>
          </span>
          <span className="border-b mx-10 my-3 "></span>
          <ModalRow label="Last billed" value={studentData?.lastBilledMonth} />
          {studentData?.lastBilledMonth !== moment(Date.now()).format("MMM YYYY") && (
            <>
              <ModalRow label="Month" value={moment(Date.now()).format("MMM YYYY")} />
              <ModalRow
                label="Total Bill"
                value={`₹ ${billAmount} = ${studentData?.mealPlan?.price} (Meal Plan) + 1500 (Rent) + ${studentData?.balancePayment} (Balance amount)`}
              />
              <span className="flex">
                <span className="w-1/3 md:w-1/4 left-0">Additional: </span>
                <Formik
                  initialValues={{
                    additionalAmount: 0,
                  }}
                  validationSchema={monthlyPaymentSchema}
                  onSubmit={(formData, { setSubmitting }) => {
                    setErrorMessage(null);
                    setSubmitting(true);
                    updateStudentPaymentAPI(studentData?._id!, formData)
                      .then(() => {
                        fetchAllStudents();
                        setModalOpen(false);
                        toast.success(`${studentData?.name} payment updated`);
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
                  {({ isSubmitting, values }) => (
                    <Form className="text-sm flex gap-1 flex-col">
                      <Input
                        name="additionalAmount"
                        className="w-20"
                        placeholder="Enter amount ₹"
                        type="number"
                      />
                      <span className="text-lg font-semibold">
                        ₹ {billAmount + values.additionalAmount}
                      </span>
                      {isSubmitting ? (
                        <LoadingButton className="mx-auto" />
                      ) : (
                        <Button className="mx-auto" type="submit">
                          Send Bill
                        </Button>
                      )}
                    </Form>
                  )}
                </Formik>
                {errorMessage && (
                  <span className="text-center text-md font-semibold text-red-700">
                    {errorMessage}
                  </span>
                )}
              </span>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Students;
