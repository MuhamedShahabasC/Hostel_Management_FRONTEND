import { useEffect, useState } from "react";
import { complaintImg, noticeBoardImg, studentRisingHandImg } from "../../assets/icons/images";
import Notices from "../../components/Notices";
import { fetchDashboardAPI, fetchNoticesAPI } from "../../apiRoutes/staff";
import { toast } from "react-toastify";
import MetroSpinner from "../../components/UI/MetroSpinner";
import { useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";

// Dashboard - Chief Warden
function Dashboard() {
  const [dashboardCards, setdashboardCards] = useState<DashboardCard | null>(null);
  const [loadingCard, setLoadingCard] = useState<boolean>(true);
  const staff = useAppSelector<ICurrentUser | null>((state) => state?.currentUser);

  useEffect(() => {
    fetchDashboardAPI()
      .then(({ data: { data } }) => {
        setdashboardCards(data);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => toast.error(message)
      )
      .finally(() => setLoadingCard(false));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="flex flex-col md:flex-row gap-2 md:gap-10 text-white tracking-wider mb-10">
        <div className="bg-[#9B4094] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          {!loadingCard ? (
            <div className="flex flex-col">
              <span className="text-lg font-black">{dashboardCards?.[0].title}</span>
              <div className="flex items-end">
                <span className="text-2xl font-black">{dashboardCards?.[0].count}</span>
                <span className="text-sm m-1">/ {dashboardCards?.[0].total}</span>
              </div>
            </div>
          ) : (
            <MetroSpinner color="white" className="m-3" />
          )}
          <img className="h-16" src={studentRisingHandImg} alt="attendance" />
        </div>
        <div className="bg-[#FFC88F] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          {!loadingCard ? (
            <div className="flex flex-col">
              <span className="text-lg font-black">{dashboardCards?.[1].title}</span>
              <div className="flex items-end">
                <span className="text-2xl font-black">{dashboardCards?.[1].count}</span>
                <span className="text-sm m-1">/ {dashboardCards?.[1].total}</span>
              </div>
            </div>
          ) : (
            <MetroSpinner color="white" className="m-3" />
          )}
          <img className="h-16" src={complaintImg} alt="complaint" />
        </div>
        <div className="bg-[#FC485B] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          {!loadingCard ? (
            <div className="flex flex-col">
              <span className="text-lg font-black">{dashboardCards?.[2].title}</span>
              <div className="flex items-end">
                <span className="text-2xl font-black">{dashboardCards?.[2].count}</span>
                <span className="text-sm m-1">/ {dashboardCards?.[2].total}</span>
              </div>
            </div>
          ) : (
            <MetroSpinner color="white" className="m-3" />
          )}
          <img className="h-16" src={noticeBoardImg} alt="notices" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="grow flex flex-col mx-auto md:mx-0 text-center items-center p-5">
          <div className="w-1/2 md:w-32 mb-5 rounded-full border-1">
            <img
              className="rounded-full p-1"
              src={staff?.currentUser?.profilePic}
              alt="student avatar"
            />
          </div>
          <div className="hidden md:block">
            {staff?.currentUser?.name.split(" ").map((name) => (
              <h1 key={name} className="normal-case">
                {name}
              </h1>
            ))}
          </div>
          <h3 className="hidden md:block">{staff?.currentUser?.email}</h3>
          <h1 className="normal-case md:hidden">{staff?.currentUser?.name}</h1>
          <h3 className="normal-case md:hidden">{staff?.currentUser?.email}</h3>
        </div>
        <Notices fetchHandler={fetchNoticesAPI} className="md:w-2/3" />
      </div>
    </div>
  );
}

type DashboardCard = [
  { title: string; count: number; total: number },
  { title: string; count: number; total: number },
  { title: string; count: number; total: number }
];

export default Dashboard;
