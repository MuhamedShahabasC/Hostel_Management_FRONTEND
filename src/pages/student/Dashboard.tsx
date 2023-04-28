import { useEffect, useState } from "react";
import { fetchNoticesAPI, mealPlanAPI } from "../../apiRoutes/student";
import Notices from "../../components/Notices";
import { toast } from "react-toastify";
import { IMealPlanResponse } from "../../interfaces/student";
import { useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";
import MetroSpinner from "../../components/UI/MetroSpinner";

// Dashboard - Student
function Dashboard() {
  const [mealPlan, setMealPlan] = useState<IMealPlanResponse | null>(null);
  const student = useAppSelector<ICurrentUser | null>((state) => state?.currentUser);
  const [mealPlanLoading, setMealPlanLodaing] = useState<boolean>(true);

  useEffect(() => {
    mealPlanAPI()
      .then(({ data: { data } }) => setMealPlan(data))
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => toast.error(message)
      )
      .finally(() => setMealPlanLodaing(false));
  }, []);

  return (
    <div className="student-dashboard-container">
      <div className="md:w-1/3 mx-auto md:mx-0 border-b-2 pb-3 md:pb-0 md:border-none">
        <Notices fetchHandler={fetchNoticesAPI} />
      </div>
      <div className="flex flex-col mx-auto md:mx-0 text-center items-center p-5">
        <div className="w-2/3 md:w-32 mb-5 rounded-full border-1">
          <img
            className="rounded-full md:rounded-md"
            src={student?.currentUser?.profilePic}
            alt="student avatar"
          />
        </div>
        <div className="hidden md:block">
          {student?.currentUser?.name.split(" ").map((name) => (
            <h1 key={name} className="normal-case">
              {name}
            </h1>
          ))}
        </div>
        <h1 className="normal-case md:hidden">{student?.currentUser?.name}</h1>
      </div>
      <div className="md:w-[400px] mx-auto md:mx-0">
        <div className="flex flex-col bg-[#F1F1F1] rounded p-5 h-full">
          <h4 className="text-black pb-1 border-b border-[#B1B1B1] mb-7">Today's Meal</h4>
          {!mealPlanLoading ? (
            <>
              <div className="mb-7">
                <div className="flex justify-between font-bold text-black">
                  <h4>Breakfast</h4>
                  <h4>7 - 9 AM</h4>
                </div>
                <p className="text-sm mt-2 tracking-wide text-[#2B2B2B] mx-1">
                  {mealPlan?.breakfast}
                </p>
              </div>
              <div className="mb-7">
                <div className="flex justify-between font-bold text-black">
                  <h4>Lunch</h4>
                  <h4>12 : 30 - 1 : 30 PM</h4>
                </div>
                <p className="text-sm mt-2 tracking-wide text-[#2B2B2B] mx-1">{mealPlan?.lunch}</p>
              </div>
              <div className="mb-7">
                <div className="flex justify-between font-bold text-black">
                  <h4>Evening</h4>
                  <h4>4 : 30 - 5 : 30 PM</h4>
                </div>
                <p className="text-sm mt-2 tracking-wide text-[#2B2B2B] mx-1">
                  {mealPlan?.evening}
                </p>
              </div>
              <div className="mb-7">
                <div className="flex justify-between font-bold text-black">
                  <h4>Dinner</h4>
                  <h4>8 - 9 : 30 PM</h4>
                </div>
                <p className="text-sm mt-2 tracking-wide text-[#2B2B2B] mx-1">{mealPlan?.dinner}</p>
              </div>
            </>
          ) : (
            <MetroSpinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
