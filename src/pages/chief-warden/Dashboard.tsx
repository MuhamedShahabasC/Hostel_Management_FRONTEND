import { useEffect, useState } from "react";
import { complaintImg, noticeBoardImg, studentRisingHandImg } from "../../assets/icons/images";
import {
  noticeStatisticsAPI,
  paymentStatisticsAPI,
  yearlyRevenueAPI,
} from "../../apiRoutes/chiefWarden";
import { PieChart } from "../../components/PieChart";
import { LineChart } from "../../components/LineChart";

// Dashboard - Chief Warden
function Dashboard() {
  const [noticeStatistics, setNoticeStatistics] = useState<[number, number]>([0, 0]);
  const [paymentData, setPaymentData] = useState<{ paid: number; pending: number } | null>(null);
  const [yearlyRevenue, setYearlyRevenue] =
    useState<{ month: number; totalPayments: number; revenue: number }[]>();

  useEffect(() => {
    noticeStatisticsAPI().then(({ data: { data } }) => {
      setNoticeStatistics(data);
    });
    paymentStatisticsAPI().then(({ data: { data } }) => setPaymentData(data));
    yearlyRevenueAPI().then(({ data: { data } }) => setYearlyRevenue(data));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="flex flex-col md:flex-row gap-2 md:gap-10 text-white tracking-wider mb-10">
        <div className="bg-[#5F5E5C] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          <div className="flex flex-col">
            <span className="text-lg font-black">Attendance</span>
            <div className="flex items-end">
              <span className="text-2xl font-black">119</span>
              <span className="text-sm m-1">/ 200</span>
            </div>
          </div>
          <img className="h-16" src={studentRisingHandImg} alt="attendance" />
        </div>
        <div className="bg-[#E1B98B] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          <div className="flex flex-col">
            <span className="text-lg font-black">Complaints</span>
            <div className="flex items-end">
              <span className="text-2xl font-black">6</span>
              <span className="text-sm m-1">/ 11</span>
            </div>
          </div>
          <img className="h-16" src={complaintImg} alt="complaint" />
        </div>
        <div className="bg-[#ACC68A] rounded p-4 flex justify-between w-3/4 mx-auto md:w-1/3">
          <div className="flex flex-col">
            <span className="text-lg font-black">Notices</span>
            <div className="flex items-end">
              <span className="text-2xl font-black">{noticeStatistics[0]}</span>
              {/* <span className="text-sm m-1">/ {noticeStatistics[1]}</span> */}
            </div>
          </div>
          <img className="h-16" src={noticeBoardImg} alt="notices" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-2">
        {/* <Notices fetchHandler={getAllNotices} className="md:w-1/3" /> */}

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
