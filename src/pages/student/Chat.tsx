import { sendIcon } from "../../assets/icons/icons";
import { defaultAvatarImg } from "../../assets/icons/images";

function Chat() {
  const filterHandler = (value: string) => {
    alert(value);
  };

  return (
    <div className="parent-container md:relative">
      <h2>Chat Room</h2>
      <select
        onChange={(e) => filterHandler(e.target.value)}
        className="text-gray-400 text-sm rounded-md px-4 py-2 max-w-fit mb-2 md:absolute md:top-10 mx-auto shadow focus:outline-none"
      >
        <option value="">Everyone</option>
        <option value="staff">Staff</option>
        <option value="student">Student</option>
      </select>
      <div className="bg-[#F5F5F5] h-80 rounded shadow-sm mb-3">
        <div className="h-64 flex flex-col justify-end">
          <div className="flex mx-3 mb-3 w-3/4 md:w-1/2">
            <img src={defaultAvatarImg} className="mt-2 w-8 h-8" alt="chat avatar" />
            <div className="text-xs flex flex-col justify-between bg-white shadow-lg py-2 px-4 m-1 max-h-max rounded-md ">
              <span className="font-semibold">Ayisha Mehak</span>
              <p className="text-primary my-1">Hi all, How about a LUDO game now?</p>
              <span className="font-medium ml-auto mt-1">16:00 2/2/2023</span>
            </div>
          </div>
          <div className="flex mx-3 mb-3 w-3/4 md:w-1/2">
            <img src={defaultAvatarImg} className="mt-2 w-8 h-8" alt="chat avatar" />
            <div className="text-xs flex flex-col justify-between bg-white shadow-lg py-2 px-4 m-1 max-h-max rounded-md ">
              <span className="font-semibold text-primary">Shahabas - Warden</span>
              <p className="text-primary my-1">The food will be 20 mins late.</p>
              <span className="font-medium ml-auto mt-1">16:00 2/2/2023</span>
            </div>
          </div>
        </div>
        <div className="px-5 py-2">
          <div className="border-t-2 ">
            <div className="flex items-center mt-3 mx-auto w-2/3 bg-white px-3 rounded-full shadow-md">
              <input
                className="grow p-1 focus:outline-none text-sm"
                placeholder="Send a message..."
                type="text"
              />
              <img className="h-5 m-1 active:animate-ping" src={sendIcon} alt="send message" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
