import { useState, useEffect, useMemo } from "react";
import { allMealPlans, updateMealPlan } from "../../apiRoutes/staff";
import Table, { TableColumn, Media } from "../../components/Table";
import { errorToast } from "../../middleware/errorToast";
import Modal from "../../components/UI/Modal";
import Input from "../../components/Form/Input";
import { Form, Formik } from "formik";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { mealPlanSchema } from "../../schema/staff";

interface TableRow {
  _id: string;
  title: string;
  price: number;
  subscribers: number;
  active: number;
  actions: string;
}

function MealsChef() {
  const [allMeals, setAllMeals] = useState<any>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    allMealPlans()
      .then(({ data: { data } }) => setAllMeals(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setPending(false));
  }, []);

  const editForm = (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: modalData?.title,
        }}
        validationSchema={mealPlanSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setSubmitting(true);
          updateMealPlan(modalData._id, formData)
            .then(({ data }) => {
              console.log(data);
              toast.success(`${modalData.title} updated successfully`);
              setModal(false);
            })
            .catch(
              ({
                response: {
                  data: { message },
                },
              }) => setMessage(message)
            )
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col justify-center gap-4 px-1 mb-3">
            <Input
              type="title"
              placeholder="Title"
              name="title"
              id="title"
              value={values.title}
            />

            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button type="submit">Edit</Button>
            )}
          </Form>
        )}
      </Formik>
      {message && (
        <span className="text-center text-md font-semibold text-red-700">
          {message}
        </span>
      )}
    </>
  );

  const columns: TableColumn<TableRow>[] = useMemo(
    () => [
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Availability",
        selector: (row) => (row.active ? "In-Menu" : "Unavailable"),
        sortable: true,
        hide: Media.SM,
      },
      {
        name: "Price",
        selector: (row) => row.price,
        sortable: true,
        hide: Media.SM,
      },
      {
        name: "Students",
        selector: (row) => row.subscribers,
        sortable: true,
        hide: Media.SM,
      },
      {
        name: "Actions",
        grow: 2,
        cell: (row) => {
          return (
            <>
              <button
                className="border"
                onClick={() => {
                  setModalData(row);
                  setModal(true);
                }}
              >
                View
              </button>
              <button onClick={() => alert(row.active)}>Edit</button>
            </>
          );
        },
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );
  return (
    <div className="parent-container ">
      <h2>Meals Plan</h2>
      <Table columns={columns} data={allMeals} pending={pending} />
      <Modal isOpen={modalOpen} heading="Heading" closeHandler={setModal}>
        {modalData && editForm}
      </Modal>
    </div>
  );
}

export default MealsChef;
