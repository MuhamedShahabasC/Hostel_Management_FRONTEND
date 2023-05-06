import moment from "moment";
import { useMemo, useCallback, useEffect, useState } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import { IComplaint } from "../../interfaces/complaint";
import { viewIcon } from "../../assets/icons/icons";
import Modal from "../../components/UI/Modal";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { Form, Formik } from "formik";
import { newComplaintSchema } from "../../schema/complaint";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input";
import { fetchComplaintsAPI, postNewComplaintAPI } from "../../apiRoutes/student";
import SelectInput from "../../components/Form/SelectInput";
import ModalRow from "../../components/UI/ModalRow";

// Complaints Page - Student
function Complaints() {
  const [allComplaints, setAllComplaints] = useState<IComplaint[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [viewComplaint, setViewComplaint] = useState<IComplaint | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newComplaint, setNewComplaint] = useState<boolean>(false);

  const fetchComplaints = useCallback((filterBy?: string) => {
    setPending(true);
    fetchComplaintsAPI(filterBy)
      .then(({ data: { data } }) => setAllComplaints(data))
      .catch(() => setAllComplaints([]))
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
        selector: (row) => row._id.slice(10),
        grow: 2,
      },
      {
        name: "Staff",
        sortable: true,
        selector: (row) => row.staff?.name || "Unassigned",
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
              setViewComplaint(row);
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

  const newComplaintHandler = () => {
    setModalOpen(false);
    return setNewComplaint(true);
  };

  const departmentOptions = useMemo(
    () => [
      {
        value: "maintenance",
        text: "Maintenance",
      },
      {
        value: "chef",
        text: "Chef",
      },
      {
        value: "warden",
        text: "Warden",
      },
    ],
    []
  );

  return (
    <div className="parent-container md:relative">
      <h2>Complaints</h2>
      <select
        onChange={(e) => fetchComplaints(e.target.value)}
        className="text-gray-400 text-sm rounded-md absolute top-10 px-4 py-2 max-w-fit shadow focus:outline-none"
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
      <Modal isOpen={modalOpen} heading="Complaint Details" closeHandler={setModalOpen}>
        <div className="flex flex-col justify-center md:px-4">
          <ModalRow label="Complaint ID" value={viewComplaint?._id} />
          <ModalRow label="Message" value={viewComplaint?.message} />
          <ModalRow label="Raised On" value={moment(viewComplaint?.createdAt).format("LLL")} />
          <span className="border-b mx-10 my-3 "></span>
          <ModalRow label="Staff" value={viewComplaint?.staff?.name || "Not assigned"} />
          {viewComplaint?.staff && (
            <ModalRow label="Staff Email" value={viewComplaint?.staff?.email} />
          )}
          <span className="border-b mx-10 my-3 "></span>
          <ModalRow label="Status" value={viewComplaint?.status.toUpperCase()} />
          <ModalRow label="Updated On" value={moment(viewComplaint?.updatedAt).format("LLL")} />
          {(viewComplaint?.status === "resolved" || viewComplaint?.status === "rejected") && (
            <ModalRow label="Remarks" value={viewComplaint?.remarks} />
          )}
        </div>
      </Modal>
      <Button
        className="max-w-max px-9 text-sm mx-auto mt-3"
        type="button"
        onClick={newComplaintHandler}
      >
        New Complaint
      </Button>
      {newComplaint && (
        <Modal isOpen={newComplaint} heading={"New Complaint"} closeHandler={setNewComplaint}>
          <Formik
            initialValues={{
              department: "" as "maintenance" | "chef" | "warden",
              message: "",
            }}
            validationSchema={newComplaintSchema}
            onSubmit={(formData, { setSubmitting }) => {
              setErrorMessage(null);
              setSubmitting(true);
              postNewComplaintAPI(formData)
                .then(() => {
                  fetchComplaints();
                  setNewComplaint(false);
                  toast.success(`Complaint submitted`);
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
              <Form className="flex flex-col justify-center gap-4 px-1 mb-3">
                <ModalRow
                  label="Department"
                  value={
                    <SelectInput
                      options={departmentOptions}
                      label="Choose a department"
                      name="department"
                    />
                  }
                />
                <ModalRow
                  label="Message"
                  value={<Input type="text" placeholder="Enter your complaint..." name="message" />}
                />
                {isSubmitting ? (
                  <LoadingButton />
                ) : (
                  <Button className="max-w-fit mt-4 mx-auto px-6" type="submit">
                    Raise complaint
                  </Button>
                )}
                {errorMessage && (
                  <span className="text-center text-md font-semibold text-red-700">
                    {errorMessage} !
                  </span>
                )}
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
}

export default Complaints;
