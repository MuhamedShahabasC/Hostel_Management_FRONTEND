import { useEffect, useRef, useState } from "react";
import { sendIcon } from "../../assets/icons/icons";
import { io, Socket } from "socket.io-client";
import { ICurrentUser } from "../../interfaces/auth";
import { useAppSelector } from "../../App";
import { IMessage } from "../../interfaces/chat";
import MetroSpinner from "../../components/UI/MetroSpinner";
import MessageChat from "../../components/MessageChat";
import moment from "moment";
import { fetchAllChatsAPI } from "../../apiRoutes/chiefWarden";

function Chat() {
  const socket = useRef<Socket | null>();
  const [message, setMessage] = useState<string>("");
  const chiefWarden = useAppSelector<ICurrentUser | null>((state) => state.currentUser);
  const [role, setRole] = useState<"student" | "staff">("student");
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);



  useEffect(() => {
    setLoading(true);
    fetchAllChatsAPI(role)
      .then(({ data: { data } }) => setAllMessages(data))
      .catch(() => setAllMessages([]))
      .finally(() => setLoading(false));
    socket.current = io("http://localhost:8000");
    socket.current.emit("join", {
      userName: "Chief Warden",
      userId: chiefWarden?.currentUser?._id,
      profilePic: chiefWarden?.currentUser.profilePic,
      role,
    });
    socket.current.on("getMessage", ({ userId, userName, role, message, date, profilePic }) =>
      setAllMessages((prevState) => [
        { userId, userName, role, message, date, profilePic },
        ...prevState,
      ])
    );
    // eslint-disable-next-line
  }, [role]);

  const chatMessageHandler = () => {
    socket.current?.emit("sendMessage", {
      userId: chiefWarden?.currentUser?._id,
      userName: "Chief Warden",
      role,
      message,
      date: Date.now(),
      profilePic: chiefWarden?.currentUser.profilePic,
    });
    return setMessage("");
  };

  return (
    <div className="parent-container md:relative">
      <h2>{role} Chat Room</h2>
      <select
        onChange={(e) => setRole(e.target.value as "student" | "staff")}
        className="text-gray-400 text-sm rounded-md px-4 py-2 max-w-fit mb-2 md:absolute md:top-10 mx-auto shadow focus:outline-none"
      >
        <option value="student">Student</option>
        <option value="staff">Staff</option>
      </select>
      <div className="bg-[#F5F5F5] h-96 rounded shadow-sm mb-3 py-2">
        <div className="h-80 flex flex-col-reverse overflow-y-auto ">
          {!loading ? (
            allMessages.map(({ date, message, profilePic, userName, userId }, i) => (
              <MessageChat
                key={`${date}${i}`}
                date={`${moment(date).format("LT")} ${moment(date).format("L")}`}
                message={message}
                profilePic={profilePic}
                userName={userName}
                self={userId === chiefWarden?.currentUser._id}
              />
            ))
          ) : (
            <MetroSpinner className="my-auto" size={40} color="skyblue" />
          )}
        </div>
        <div className="px-5 py-1">
          <div className="border-t-2 ">
            <div className="flex items-center mt-3 mx-auto w-2/3 bg-white px-3 rounded-full shadow-md">
              <input
                className="grow p-1 focus:outline-none text-sm"
                placeholder="Send a message..."
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <img
                className="h-5 m-1 active:animate-ping"
                src={sendIcon}
                onClick={chatMessageHandler}
                alt="send message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
