import moment from "moment";
import { useMemo, useCallback, useEffect, useState } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import {
  fetchAllComplaintsAPI,
  fetchStaffsByDeptAPI,
  updateComplaintAPI,
} from "../../apiRoutes/chiefWarden";
import { IComplaint, StaffDepartment } from "../../interfaces/complaint";
import { viewIcon } from "../../assets/icons/icons";
import Modal from "../../components/UI/Modal";
import ModalRow from "../../components/UI/ModalRow";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { Form, Formik } from "formik";
import SelectInput from "../../components/Form/SelectInput";
import { updateComplaintSchema } from "../../schema/complaint";
import { IStaff } from "../../interfaces/staff";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input";

// Complaints Page - Chief warden
function Complaints() {
  const [allComplaints, setAllComplaints] = useState<IComplaint[] | []>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [modalData, setModalData] = useState<IComplaint | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [staffsByDept, setStaffsByDept] = useState<any>([]);

  const fetchComplaints = useCallback((filterBy?: string) => {
    setPending(true);
    fetchAllComplaintsAPI(filterBy)
      .then(({ data: { data } }) => setAllComplaints(data))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line
  }, []);

  const columns: TableColumn<IComplaint>[] = useMemo(
    () => [
      {
        name: "Complaint ID",
        sortable: true,
        selector: (row) => row._id,
        grow: 2,
      },
      {
        name: "Status",
        sortable: true,
        selector: (row) => row.status.toUpperCase(),
        hide: Media.SM,
      },
      {
        name: "Date",
        sortable: true,
        selector: (row) => moment(row.createdAt).format("L"),
        hide: Media.SM,
      },
      {
        name: "Actions",
        cell: (row) => (
          <button
            title="View complaint"
            onClick={() => {
              setModalData(row);
              if (!row.staff) fetchStaffsByDept(row.department).then(() => setModalOpen(true));
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

  const fetchStaffsByDept = useCallback(async (department: StaffDepartment) => {
    const {
      data: { data },
    } = await fetchStaffsByDeptAPI(department);
    const staffOptions = data.map(({ _id, name }: IStaff) => {
      return {
        text: name,
        value: _id,
      };
    });
    return setStaffsByDept(staffOptions);

    // eslint-disable-next-line
  }, []);

  const complaintStatusOptions = useMemo(
    () => [
      {
        text: "REJECTED",
        value: "rejected",
      },
      {
        text: "ISSUED",
        value: "issued",
      },
      {
        text: "RESOLVED",
        value: "resolved",
      },
    ],
    []
  );

  return (
    <div className="parent-container relative">
      <h2>Complaints</h2>
      <select
        onChange={(e) => fetchComplaints(e.target.value)}
        className="text-gray-400 text-sm rounded-md mb-3 md:mb-0 mx-auto md:absolute top-10 px-4 py-2 max-w-fit shadow focus:outline-none"
      >
        <option value="">Filter by status</option>
        <option value="">All Complaints</option>
        <option value="resolved">Resolved</option>
        <option value="initiated">Initiated</option>
        <option value="issued">Issued</option>
        <option value="approval">Approval</option>
        <option value="rejected">Rejected</option>
      </select>
      <Table columns={columns} data={allComplaints} pending={pending} />
      <Modal isOpen={modalOpen} heading={"Complaint"} closeHandler={setModalOpen}>
        <div className="flex flex-col justify-center md:px-4">
          <ModalRow value={modalData?.student.name} label="Student" />
          <ModalRow value={modalData?.student.email} label="Email" />
          <ModalRow value={modalData?.message} label="Message" />
          <ModalRow value={moment(modalData?.createdAt).format("LLL")} label="Date" />
          <span className="border-b mx-10 my-3 "></span>
          <Formik
            initialValues={{
              staff: modalData?.staff?._id || "",
              status: "",
              oldStatus: modalData?.status || "",
              remarks: modalData?.remarks || "",
            }}
            validationSchema={updateComplaintSchema}
            onSubmit={(formData, { setSubmitting }) => {
              setErrorMessage(null);
              setSubmitting(true);
              updateComplaintAPI(modalData?._id!, formData)
                .then(() => {
                  fetchComplaints();
                  setModalOpen(false);
                  toast.success(`Complaint updated`);
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
              <div className="text-sm">
                <Form>
                  <div className="flex flex-col justify-center mb-3">
                    <ModalRow value={modalData?.department.toUpperCase()} label="Department" />
                    <ModalRow
                      value={
                        modalData?.staff ? (
                          modalData?.staff.name
                        ) : (
                          <SelectInput label="Not assigned" name="staff" options={staffsByDept} />
                        )
                      }
                      label="Staff"
                    />
                    <span className="border-b mx-10 my-3 "></span>
                    <ModalRow value={modalData?.status.toUpperCase()} label="Status" />
                    <ModalRow value={moment(modalData?.updatedAt).format("LLL")} label="Date" />
                    {(modalData?.status === "initiated" ||
                      modalData?.status === "issued" ||
                      modalData?.status === "approval") && (
                      <ModalRow
                        value={
                          <SelectInput
                            label="Select Status"
                            name="status"
                            options={complaintStatusOptions.filter(
                              (option) => option.value !== modalData?.status
                            )}
                          />
                        }
                        label="Update"
                      />
                    )}
                    {modalData?.status === "initiated" ||
                    modalData?.status === "issued" ||
                    modalData?.status === "approval" ? (
                      <ModalRow
                        value={
                          <Input
                            name="remarks"
                            placeholder="Remarks by chief warden"
                            type="text"
                            className="mt-3 md:w-96"
                          />
                        }
                        label="Remarks"
                      />
                    ) : (
                      <ModalRow value={modalData?.remarks} label="Remarks" />
                    )}
                    {(modalData?.status === "initiated" ||
                      modalData?.status === "issued" ||
                      modalData?.status === "approval") && (
                      <div className="text-center mt-5">
                        {isSubmitting ? (
                          <LoadingButton className="mx-auto px-10" />
                        ) : (
                          <Button className="mx-auto" type="submit">
                            Update complaint
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Form>
                {errorMessage && (
                  <span className="text-center text-md font-semibold text-red-700">
                    {errorMessage} !
                  </span>
                )}
              </div>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}

export default Complaints;
