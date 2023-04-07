import { useState, useEffect, useMemo, useCallback } from "react";
import { allMealPlans, updateMealPlan } from "../../apiRoutes/staff";
import Table, { TableColumn, Media } from "../../components/Table";
import { errorToast } from "../../helpers/toasts";
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
  const [pending, setPending] = useState<boolean>(true);
  const [modalOpen, setModal] = useState<boolean>(false);
  const [allMeals, setAllMeals] = useState<any>([]);
  const [modalData, setModalData] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchAllMeals = useCallback(() => {
    allMealPlans()
      .then(({ data: { data } }) => setAllMeals(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    fetchAllMeals();
    // eslint-disable-next-line
  }, []);

  const editForm = (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: modalData?.title,
          price: modalData?.price,
          breakfast: modalData?.breakfast,
          lunch: modalData?.lunch,
          evening: modalData?.evening,
          dinner: modalData?.dinner,
        }}
        validationSchema={mealPlanSchema}
        onSubmit={(formData, { setSubmitting }) => {
          console.log(formData);
          setSubmitting(true);
          updateMealPlan(modalData._id, formData)
            .then(async ({ data }) => {
              console.log(data);
              await fetchAllMeals();
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
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center gap-4 px-1 mb-3">
            <Input
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              edit
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              id="price"
              edit
            />
            <Input
              type="text"
              placeholder="Breakfast"
              name="breakfast"
              id="breakfast"
              edit
            />
            <Input
              type="text"
              placeholder="Lunch"
              name="lunch"
              id="lunch"
              edit
            />
            <Input
              type="text"
              placeholder="Evening"
              name="evening"
              id="evening"
              edit
            />
            <Input
              type="text"
              placeholder="Dinner"
              name="dinner"
              id="dinner"
              edit
            />
            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button className="max-w-fit mx-auto" type="submit">
                Update Meal Plan
              </Button>
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
      <Modal
        isOpen={modalOpen}
        heading="Edit Meal Plan"
        closeHandler={setModal}
      >
        {modalData && editForm}
      </Modal>
    </div>
  );
}

export default MealsChef;
