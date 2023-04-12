import { useState } from "react";
import { addNewPlan, updateMealPlan } from "../../apiRoutes/staff";
import Input from "../../components/Form/Input";
import { Form, Formik } from "formik";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { mealPlanSchema } from "../../schema/staff";
import { IMealPlan } from "../../interfaces/chef";

function MealPlanForm({ modalData, role, fetchAllMeals, setModal }: FormRole) {
  const [message, setMessage] = useState<string | null>(null);

  const submitHandler = async (formData: IMealPlan, _id?: string) => {
    if (role === "edit" && _id) {
      return await updateMealPlan(_id, formData);
    } else if (role === "new") {
      return await addNewPlan(formData);
    }
  };

  return (
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
          setSubmitting(true);
          submitHandler(formData, modalData._id)
            .then(({ data: { message } }: any) => {
              fetchAllMeals();
              toast.success(message);
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
              edit
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              edit
            />
            <Input
              type="text"
              placeholder="Breakfast"
              name="breakfast"
              edit
            />
            <Input
              type="text"
              placeholder="Lunch"
              name="lunch"
              edit
            />
            <Input
              type="text"
              placeholder="Evening"
              name="evening"
              edit
            />
            <Input
              type="text"
              placeholder="Dinner"
              name="dinner"
              edit
            />
            {isSubmitting ? (
              <LoadingButton />
            ) : (
              <Button className="max-w-fit mx-auto" type="submit">
                Save Changes
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
}

export default MealPlanForm;

interface FormRole {
  modalData: IMealPlan;
  role: "edit" | "new";
  fetchAllMeals: () => any;
  setModal: (state: boolean) => void;
}
