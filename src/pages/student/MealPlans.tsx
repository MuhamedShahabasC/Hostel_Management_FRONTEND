import MealPlan from "../../components/MealPlan";
import { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import SelectInput from "../../components/Form/SelectInput";
import LoadingButton from "../../components/UI/LoadingButton";
import Button from "../../components/UI/Button";
import { changeMealPlanSchema } from "../../schema/student";
import { fetchActiveMealPlans, mealPlanAPI, updateStudentAPI } from "../../apiRoutes/student";
import { toast } from "react-toastify";
import MetroSpinner from "../../components/UI/MetroSpinner";

// Student Meal plans
function MealPlans() {
  const [message, setMessage] = useState<string | null>(null);
  const [activePlans, setActivePlans] = useState<any>([]);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = useCallback(() => {
    fetchActiveMealPlans()
      .then(({ data: { data } }) => {
        setActivePlans(data);
        return mealPlanAPI();
      })
      .then(({ data: { data } }) => {
        setCurrentPlan(data);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => toast.error(message)
      )
      .finally(() => setLoading(false));
  }, []);

  const submitHandler = (formData: { mealPlan: string }) => {
    const updateMealPlan = updateStudentAPI(formData)
      .then(() => mealPlanAPI()) // change to loading all meals so that selected can be highlighted
      .then(({ data: { data } }) => {
        setCurrentPlan(data);
      });
    toast.promise(updateMealPlan, {
      pending: "Updating meal plan",
      success: "Meal plan updated",
      error: "Please try again",
    });
    return updateMealPlan;
  };

  const options = activePlans?.map((el: any) => {
    if (currentPlan?._id !== el._id) return { value: el._id, text: el.title };
    else return false;
  });

  return (
    <div className="mealPlans-container lg:w-2/3">
      <h1 className="text-center my-3 text-lg">Select a meal plan</h1>
      {!loading ? (
        <div className="flex flex-col md:flex-row lg:justify-around">
          {activePlans?.map((mealPlan: any, i: number) => (
            <MealPlan key={mealPlan._id} data={{ ...mealPlan, i }} />
          ))}
        </div>
      ) : (
        <MetroSpinner className="my-36" />
      )}
      <Formik
        initialValues={{
          mealPlan: "",
        }}
        validationSchema={changeMealPlanSchema}
        onSubmit={(formData, { setSubmitting }) => {
          setMessage(null);
          setSubmitting(true);
          submitHandler(formData)
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
          <Form className="flex mt-4 justify-center gap-4 px-1 mb-3">
            <SelectInput label="Choose a meal plan" name="mealPlan" options={options} />

            {isSubmitting ? (
              <LoadingButton className="px-4" />
            ) : (
              <div>
                <Button className="max-h-fit px-4" type="submit">
                  Save
                </Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {message && <span className="text-center text-md font-semibold text-red-700">{message}</span>}
    </div>
  );
}

export default MealPlans;
