import { useEffect, useState, useCallback } from "react";
import { fetchAllNotices } from "../apiRoutes/chiefWarden";
import { toast } from "react-toastify";
import moment from "moment";

// Notices for all Users
function Notices() {
  const [allNotices, setAllNotices] = useState<any>([]);

  const fetchNotices = useCallback(() => {
    fetchAllNotices()
      .then(({ data: { data } }) => setAllNotices(data))
      .catch(({ response: { data: messsage } }) => {
        toast.error(messsage);
        setAllNotices([]);
      });
  }, []);

  useEffect(
    () => fetchNotices(),
    // eslint-disable-next-line
    []
  );

  return (
    <div className="flex flex-col w-full md:px-5">
      <h4 className="pb-1 pl-2 border-b border-[#B1B1B1]">Notice Board</h4>
      <div className="flex flex-col divide-y pl-2 pt-2">
        {allNotices
          ?.slice(0, 3)
          .map(({ title, date, message }: { title: string; date: string; message: string }) => (
            <div key={title} className="flex flex-col pt-1">
              <p className="text-primary text-sm">{title}</p>
              <p className="text-gray-800 text-xs">{message.substring(0, 50).concat("...")}</p>
              <span className="font-medium ml-auto my-1 text-xs">{moment(date).format("ll")}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Notices;
