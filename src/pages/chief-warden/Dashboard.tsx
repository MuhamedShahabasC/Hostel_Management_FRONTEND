import { useEffect, useState } from "react";
import { complaintImg, noticeBoardImg, studentRisingHandImg } from "../../assets/icons/images";
import {
  complaintsStatisticsAPI,
  noticeStatisticsAPI,
  occupancyStatisticsAPI,
  paymentStatisticsAPI,
  yearlyRevenueAPI,
} from "../../apiRoutes/chiefWarden";
import { PieChart } from "../../components/PieChart";
import { LineChart } from "../../components/LineChart";
import MetroSpinner from "../../components/UI/MetroSpinner";

// Dashboard - Chief Warden
function Dashboard() {
  const [loadingStat, setLoadingStat] = useState<boolean>(true);
  const [noticeStatistics, setNoticeStatistics] = useState<[number, number]>([0, 0]);
  const [paymentData, setPaymentData] = useState<{ paid: number; pending: number } | null>(null);
  const [hostelOccupancy, setHostelOccupancy] = useState<{
    occupancy: number;
    totalRooms: number;
    availableRooms: number;
  } | null>(null);
  const [complaintStat, setComplaintStat] = useState<{ count: number; total: number } | null>(null);
  const [yearlyRevenue, setYearlyRevenue] =
    useState<{ month: number; totalPayments: number; revenue: number }[]>();

  useEffect(() => {
    Promise.allSettled([
      noticeStatisticsAPI(),
      paymentStatisticsAPI(),
      yearlyRevenueAPI(),
      complaintsStatisticsAPI(),
      occupancyStatisticsAPI(),
    ])
      .then((results) => {
        results.forEach((result, i) => {
          if (!result) throw new Error();
          if (result.status === "fulfilled") {
            const {
              data: { data },
            } = result.value;
            if (i === 0) setNoticeStatistics(data);
            if (i === 1) setPaymentData(data);
            if (i === 2) setYearlyRevenue(data);
            if (i === 3) setComplaintStat(data);
            if (i === 4) setHostelOccupancy(data);
          } else {
            console.error("Error loading statistics");
          }
        });
      })
      .catch((error) => {
        console.error("Error loading statistics");
      })
      .finally(() => setLoadingStat(false));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="flex flex-col md:flex-row gap-2 md:gap-10 text-white tracking-wider mb-10">
        <div className="bg-[#5F5E5C] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          <div className="flex flex-col">
            <span className="text-lg font-black">Occupancy</span>
            {loadingStat ? (
              <MetroSpinner color="white" size={30} className="mx-0 mt-2" />
            ) : (
              <div className="flex items-end">
                <span className="text-2xl font-black">{hostelOccupancy?.occupancy || 0}</span>
                <span className="text-sm m-1"> / {hostelOccupancy?.availableRooms || 0}</span>
                <span className="text-sm m-1">/ {hostelOccupancy?.totalRooms || 0}</span>
              </div>
            )}
          </div>
          <img className="h-16" src={studentRisingHandImg} alt="attendance" />
        </div>
        <div className="bg-[#E1B98B] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          <div className="flex flex-col">
            <span className="text-lg font-black">Complaints</span>
            {loadingStat ? (
              <MetroSpinner color="white" size={30} className="mx-0 mt-2" />
            ) : (
              <div className="flex items-end">
                <span className="text-2xl font-black">{complaintStat?.count || 0}</span>
                <span className="text-sm m-1">/ {complaintStat?.total || 0}</span>
              </div>
            )}
          </div>
          <img className="h-16" src={complaintImg} alt="complaint" />
        </div>
        <div className="bg-[#ACC68A] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          <div className="flex flex-col">
            <span className="text-lg font-black">Notices</span>
            {loadingStat ? (
              <MetroSpinner color="white" size={30} className="mx-0 mt-2" />
            ) : (
              <div className="flex items-end">
                <span className="text-2xl font-black">{noticeStatistics[0] || 0}</span>
              </div>
            )}
          </div>
          <img className="h-16" src={noticeBoardImg} alt="notices" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-2">
        <LineChart
          className="md:w-2/3"
          data={[
            yearlyRevenue?.map((month) => month.revenue),
            yearlyRevenue?.map((month) => month.totalPayments),
          ]}
        />
        <PieChart className="md:w-1/3" data={[paymentData?.pending, paymentData?.paid]} />
      </div>
    </div>
  );
}

export default Dashboard;
