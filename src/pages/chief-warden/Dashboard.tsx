import { useEffect, useState } from "react";
import { complaintImg, noticeBoardImg, studentRisingHandImg } from "../../assets/icons/images";
import Notices from "../../components/Notices";
import { getAllNotices, noticeStatisticsAPI } from "../../apiRoutes/chiefWarden";

// Dashboard - Chief Warden
function Dashboard() {
  const [noticeStatistics, setNoticeStatistics] = useState<[number, number] | null>(null);

  useEffect(() => {
    noticeStatisticsAPI().then(({ data: { data } }) => {
      setNoticeStatistics(data);
    });
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
              <span className="text-2xl font-black">{noticeStatistics?.[0]}</span>
              <span className="text-sm m-1">/ {noticeStatistics?.[1]}</span>
            </div>
          </div>
          <img className="h-16" src={noticeBoardImg} alt="notices" />
        </div>
      </div>
      <div className="h-72 w-1/3 flex">
        <Notices fetchHandler={getAllNotices}/>
      </div>
    </div>
  );
}

export default Dashboard;
