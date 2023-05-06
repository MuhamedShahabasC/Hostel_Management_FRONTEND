import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { AxiosResponse } from "axios";
import MetroSpinner from "./UI/MetroSpinner";

// Notices for all Users
function Notices({ fetchHandler, className }: Props) {
  const [allNotices, setAllNotices] = useState<any>(null);

  const fetchNotices = useCallback(() => {
    fetchHandler()
      .then(({ data: { data } }) => setAllNotices(data))
      .catch(({ response: { data: messsage } }) => {
        toast.error(messsage);
        setAllNotices([]);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(
    () => fetchNotices(),
    // eslint-disable-next-line
    []
  );

  return (
    <div className={`flex flex-col w-full md:px-5 ${className}`}>
      <h4 className="pb-1 pl-2 border-b border-[#B1B1B1]">Notice Board</h4>
      <div className="flex flex-col divide-y pl-2 pt-2">
        {allNotices ? (
          allNotices
            ?.slice(0, 3)
            .map(({ title, date, message }: { title: string; date: string; message: string }) => (
              <div key={title} className="flex flex-col pt-1">
                <p className="text-primary text-sm">{title}</p>
                <p className="text-gray-800 text-xs">
                  {/* {message.length < 150 ? message : message.substring(0, 150).concat("...")} */}
                  {message}
                </p>
                <span className="font-medium ml-auto my-1 text-xs">
                  {moment(date).format("ll")}
                </span>
              </div>
            ))
        ) : (
          <MetroSpinner className="my-16"/>
        )}
      </div>
    </div>
  );
}

interface Props {
  fetchHandler(): Promise<AxiosResponse<any, any>>;
  className?: string;
}

export default Notices;
