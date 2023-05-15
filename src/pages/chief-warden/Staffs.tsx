import { useMemo, useEffect, useState, useCallback } from "react";
import Table, { TableColumn } from "../../components/Table";
import { editIcon, searchIcon } from "../../assets/icons/icons";
import {
  complaintStatByStaffAPI,
  fetchAllStaffsAPI,
  newStaffAPI,
} from "../../apiRoutes/chiefWarden";
import Modal from "../../components/UI/Modal";
import { IStaff } from "../../interfaces/staff";
import ModalDiv from "../../components/UI/ModalDiv";
import ModalRow from "../../components/UI/ModalRow";
import ModalRowDivider from "../../components/UI/ModalRowDivider";
import Button from "../../components/UI/Button";
import { Form, Formik } from "formik";
import Input from "../../components/Form/Input";
import LoadingButton from "../../components/UI/LoadingButton";
import PasswordInput from "../../components/Form/PasswordInput";
import SelectInput from "../../components/Form/SelectInput";
import { newStaffSchema } from "../../schema/staff";
import { toast } from "react-toastify";

// Staffs page
function Staffs() {
  const [staffsData, setStaffsData] = useState<IStaff[]>([]);
  const [staffData, setStaffData] = useState<IStaff | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [newStaffModal, setNewStaffModal] = useState<boolean>(false);
  const [complaintStat, setComplaintStat] = useState<{ count: number; total: number }>({
    count: 0,
    total: 0,
  });

  const fetchAllStaffs = useCallback((filter?: string, search?: string) => {
    setPending(true);
    fetchAllStaffsAPI(filter, search)
      .then(({ data: { data } }) => {
        setStaffsData(data);
      })
      .catch(() => setStaffsData([]))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    fetchAllStaffs();
    // eslint-disable-next-line
  }, []);

  const filterHandler = (value: string) => {
    setFilterBy(value);
    fetchAllStaffs(value, searchInput);
  };

  const searchHandler = () => {
    fetchAllStaffs(filterBy, searchInput);
    setSearchInput("");
  };

  const columns: TableColumn<IStaff>[] = useMemo(
    () => [
      {
        name: "Name",
        sortable: true,
        selector: (row) => row.name,
        grow: 2,
      },
      {
        name: "Role",
        sortable: true,
        selector: (row) => row.role.toUpperCase(),
      },
      {
        name: "Actions",
        cell: (row) => {
          return (
            <div className="flex gap-1">
              <button
                title="View Staff"
                onClick={() => {
                  setStaffData(row);
                  complaintStatByStaffAPI(row._id).then(({ data: { data } }) => {
                    setComplaintStat(data);
                    return setModalOpen(true);
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
      <option value="">Filter by department</option>
      <option value="">All Departments</option>
      <option value="warden">Warden</option>
      <option value="maintenance">Maintenance</option>
      <option value="chef">Chef</option>
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

  const staffRoleOptions = useMemo(
    () => [
      {
        text: "Maintenance",
        value: "maintenance",
      },
      {
        text: "Chef",
        value: "chef",
      },
      {
        text: "Warden",
        value: "warden",
      },
    ],
    []
  );

  const genderOptions = useMemo(
    () => [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ],
    []
  );

  return (
    <div className="parent-container">
      <h2>Staffs</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between pb-3">
        {filterElement}
        {searchElement}
      </div>
      <Table columns={columns} data={staffsData} pending={pending} />
      <Button
        className="max-w-max px-9 text-sm mx-auto mt-3"
        type="button"
        onClick={() => setNewStaffModal(true)}
      >
        New Staff
      </Button>
      <Modal isOpen={modalOpen} heading="Staff Details" closeHandler={setModalOpen}>
        <ModalDiv>
          <ModalRow label="Name" value={staffData?.name} />
          <ModalRow label="Email" value={staffData?.email} />
          <ModalRow label="Mobile" value={staffData?.mobile} />
          <ModalRowDivider />
          <ModalRow label="Role" value={staffData?.role.toUpperCase()} />
          <ModalRow label="Complaints" value={complaintStat?.total} />
          <ModalRow label="Resolved" value={complaintStat?.count} />
          <ModalRowDivider />
          <ModalRow label="Gender" value={staffData?.gender} className="capitalize" />
          <ModalRow label="Address">
            <span className="flex flex-col">
              <span>{staffData?.address?.building}</span>
              <span>{staffData?.address?.city}</span>
              <span>{staffData?.address?.pin}</span>
              <span>{staffData?.address?.state}</span>
              <span>{staffData?.address?.country}</span>
            </span>
          </ModalRow>
        </ModalDiv>
      </Modal>
      <Modal isOpen={newStaffModal} heading="New Staff" closeHandler={setNewStaffModal}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            mobile: "",
            role: "",
            gender: "",
            building: "",
            city: "",
            pin: "",
            state: "",
            country: "",
          }}
          validationSchema={newStaffSchema}
          onSubmit={(formData, { setSubmitting }) => {
            setSubmitting(true);
            const structuredData = {
              ...formData,
              address: {
                building: formData.building,
                city: formData.city,
                pin: formData.pin,
                state: formData.state,
                country: formData.country,
              },
            };
            newStaffAPI(structuredData)
              .then(() => {
                toast.success(`${formData?.name} added successfully`);
                setNewStaffModal(false);
                fetchAllStaffs();
              })
              .catch(() => toast.error("Error adding staff"));
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-center gap-4 px-1 mb-3 md:w-3/4 mx-auto">
              <Input
                type="email"
                placeholder="School Mail"
                className="md:col-span-full lg:col-span-1"
                name="email"
                edit
              />
              <Input type="text" placeholder="Name" name="name" edit />
              <SelectInput name="role" label="Role" options={staffRoleOptions} edit />
              <Input type="number" placeholder="Mobile" name="mobile" edit />
              <SelectInput name="gender" label="Gender" options={genderOptions} edit />
              <PasswordInput placeholder="Password" name="password" id="password" edit />
              <Input type="text" placeholder="Building Name/No." name="building" edit />
              <Input type="text" placeholder="City" name="city" edit />
              <Input type="number" placeholder="Pin Code" name="pin" edit />
              <Input type="text" placeholder="State" name="state" edit />
              <Input type="text" placeholder="Country" name="country" edit />
              {isSubmitting ? (
                <LoadingButton />
              ) : (
                <Button className="max-w-fit mx-auto" type="submit">
                  Submit
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default Staffs;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="flex flex-col md:px-4">
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Name: </span>
            <span>{staffData?.name}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Role: </span>
            <span className="font-black">{staffData?.role.toUpperCase()}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">School Mail: </span>
            <span>{staffData?.email}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Mobile: </span>
            <span>{staffData?.mobile}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Department: </span>
            <span className="capitalize">{staffData?.department}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Gender: </span>
            <span className="capitalize">{staffData?.gender}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Guardian: </span>
            <span>
              {staffData?.guardianName} , {staffData?.guardianMobile}
            </span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Address: </span>
            <span className="flex flex-col">
              <span>{staffData?.address?.building}</span>
              <span>{staffData?.address?.city}</span>
              <span>{staffData?.address?.pin}</span>
              <span>{staffData?.address?.state}</span>
              <span>{staffData?.address?.country}</span>
            </span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Blood Group: </span>
            <span>{staffData?.bloodGroup}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Remarks: </span>
            <span>{staffData?.remarks}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Meal Plan: </span>
            <span>{staffData?.mealPlan?.title}</span>
          </span>
          <span className="border-b mx-10 my-3 "></span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Paid Payment: </span>
            <span>₹ {staffData?.paidPayment}</span>
          </span>
          <span className="flex">
            <span className="w-1/3 md:w-1/4 left-0">Balance Payment: </span>
            <span>₹ {staffData?.balancePayment}</span>
          </span>
          <span className="border-b mx-10 my-3 "></span>
        </div> */
}
