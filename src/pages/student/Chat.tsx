import { sendIcon } from "../../assets/icons/icons";
import { useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { defaultAvatarImg } from "../../assets/icons/images";
import { useAppSelector } from "../../App";
import { ICurrentUser } from "../../interfaces/auth";
import { IMessage } from "../../interfaces/chat";
import { fetchAllChatsAPI } from "../../apiRoutes/student";
import MessageChat from "../../components/MessageChat";
import MetroSpinner from "../../components/UI/MetroSpinner";
import moment from "moment";

// Student Chat
function Chat() {
  const socket = useRef<Socket | null>();
  const [message, setMessage] = useState<string>("");
  const student = useAppSelector<ICurrentUser | null>((state) => state.currentUser);
  const [allMessages, setAllMessages] = useState<IMessage[] | null>(null);

  useEffect(() => {
    fetchAllChatsAPI()
      .then(({ data: { data } }) => setAllMessages(data))
      .catch(() => setAllMessages(null));
    // .finally(() => setLoading(false))
    socket.current = io("http://localhost:8000");
    socket.current.emit("join", {
      userName: student?.currentUser?.name,
      userId: student?.currentUser?._id,
      profilePic: student?.currentUser.profilePic,
      role: "student",
    });
    // eslint-disable-next-line
  }, []);

  const chatMessageHandler = () => {
    socket.current?.emit("sendMessage", {
      userName: student?.currentUser?.name,
      userId: student?.currentUser?._id,
      profilePic: student?.currentUser.profilePic,
      role: "student",
      message,
      date: Date.now(),
    });
    return setMessage("");
  };

  socket.current?.on("getMessage", ({ userId, userName, role, message }) => {
    console.log(userId, userName, role, message);
  });

  return (
    <div className="parent-container">
      <h2>Student Chat Room</h2>
      <div className="bg-[#F5F5F5] h-96 rounded shadow-sm mb-3 py-2">
        <div className="h-80 flex flex-col-reverse overflow-y-auto ">
          {allMessages ? (
            allMessages.map(({ date, message, profilePic, userName, userId }) => (
              <MessageChat
                key={date}
                date={`${moment(date).format("LTS")} ${moment(date).format("L")}`}
                message={message}
                profilePic={profilePic}
                userName={userName}
                self={userId === student?.currentUser._id}
              />
            ))
          ) : (
            <MetroSpinner className="my-24" size={40} />
          )}
        </div>
        <div className="px-5 py-2">
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
