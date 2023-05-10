import moment from "moment";
import { useMemo, useCallback, useEffect, useState } from "react";
import Table, { Media, TableColumn } from "../../components/Table";
import { viewIcon } from "../../assets/icons/icons";
import Modal from "../../components/UI/Modal";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input";
import {
  currentStudentAPI,
  fetchPaymentsAPI,
  initiatePaymentAPI,
  successfulPaymentAPI,
} from "../../apiRoutes/student";
import ModalRow from "../../components/UI/ModalRow";
import { loadScriptRazorPay } from "../../config/razorPay";
import { IPayment, RazorpayResponse } from "../../interfaces/payment";
import { useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";
import { newPaymentSchema } from "../../schema/student";

// Payments page for student
function Payments() {
  const [allPayments, setAllPayments] = useState<IPayment[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [viewPayment, setViewPayment] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newPayment, setNewPayment] = useState<boolean>(false);
  const [studentDocument, setStudentDocument] = useState<any>();
  const student = useAppSelector<ICurrentUser | null>((state) => state.currentUser);

  const fetchPayments = useCallback(() => {
    setPending(true);
    fetchPaymentsAPI()
      .then(({ data: { data } }) => setAllPayments(data))
      .catch(() => setAllPayments([]))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    fetchPayments();
    currentStudentAPI()
      .then(({ data: { data } }) => setStudentDocument(data))
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => toast.error(message)
      );
    // eslint-disable-next-line
  }, []);

  const columns: TableColumn<IPayment>[] = useMemo(
    () => [
      {
        name: "Reference ID",
        sortable: true,
        selector: (row) => row.refId,
        grow: 2,
      },
      {
        name: "Date",
        sortable: true,
        selector: (row) => moment(row.date).format("L"),
        hide: Media.SM,
      },
      {
        name: "Amount",
        sortable: true,
        selector: (row) => row.amount.toLocaleString("en-IN"),
      },
      {
        name: "Actions",
        cell: (row) => (
          <button
            title="View payment"
            onClick={() => {
              setPayment(row);
              setViewPayment(true);
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

  const paymentHandler = async (paymentAmount: number) => {
    try {
      await loadScriptRazorPay("https://checkout.razorpay.com/v1/checkout.js");
      const {
        data: { data },
      } = await initiatePaymentAPI(paymentAmount);
      const options = {
        key: process.env.REACT_APP_RAZORPAY_API_ID,
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: "School Hostel",
        handler: async function (response: RazorpayResponse) {
          const paymentData = {
            orderCreationId: data.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            amount: data.amount.toString(),
          };
          const {
            data: { message },
          } = await successfulPaymentAPI(paymentData);
          toast.success(message);
          setNewPayment(false);
          return fetchPayments();
        },
        prefill: {
          name: student?.currentUser.name,
          email: student?.currentUser.email,
          phone_number: student?.currentUser.mobile,
        },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className="parent-container">
      <h2>Payments</h2>
      <Table columns={columns} data={allPayments} pending={pending} />
      <Modal isOpen={viewPayment} heading="Payment Details" closeHandler={setViewPayment}>
        <div className="flex flex-col justify-center md:px-4">
          <ModalRow label="Reference ID" value={payment?.refId} />
          <ModalRow label="Date" value={moment(payment?.date).format("LLL")} />
          <span className="border-b mx-10 my-3 "></span>
          <ModalRow label="Amount" value={payment?.amount.toLocaleString("en-IN")} />
          <span className="border-b mx-10 my-3 "></span>
          <ModalRow label="Paid Amount" value={payment?.paidPayment.toLocaleString("en-IN")} />
          <ModalRow
            label="Balance Payment"
            value={payment?.balancePayment.toLocaleString("en-IN")}
          />
        </div>
      </Modal>
      <Button
        className="max-w-max px-9 text-sm mx-auto mt-3"
        type="button"
        onClick={() => {
          setViewPayment(false);
          return setNewPayment(true);
        }}
      >
        New Payment
      </Button>
      {newPayment && (
        <Modal isOpen={newPayment} heading={"New Payment"} closeHandler={setNewPayment}>
          <Formik
            initialValues={{
              amount: 0,
            }}
            validationSchema={newPaymentSchema}
            onSubmit={async ({ amount }, { setSubmitting }) => {
              setErrorMessage(null);
              setSubmitting(true);
              await paymentHandler(amount);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col justify-center gap-2 px-1 mb-3">
                <ModalRow label="Balance Amount" value={`₹ ${studentDocument?.balancePayment}`} />
                <ModalRow label="Paid Amount" value={`₹ ${studentDocument?.paidPayment}`} />
                <ModalRow label="Last billed On" value={studentDocument?.lastBilledMonth} />
                <span className="border-b mx-10 my-3 "></span>
                <span className="flex items-center">
                  <span className="w-1/3 md:w-1/4 left-0">Amount: </span>
                  <Input name="amount" placeholder="Enter an amount ₹" type="number" />
                </span>
                {isSubmitting ? (
                  <LoadingButton />
                ) : (
                  <Button className="max-w-fit mt-4 mx-auto px-6" type="submit">
                    Pay
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

export default Payments;
