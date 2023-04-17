import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../App";
import { customPopup } from "../../../helpers/popup";
import { admissionActions } from "../../../store/admission";

function Rooms() {
  const currentBlock = useAppSelector(
    (state) => state.newAdmission?.hostel?.selectedBlock?.rooms
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectRoomHandler = (_id: string, code: string) => {
    customPopup
      .fire({
        html: `Confirm room <h1>${code}</h1>`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(admissionActions.addRoom(_id));
          return customPopup.fire({
            title: `Confirm admission ?`,
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          });
        }
      })
      .then((result) => {
        if (result?.isConfirmed) {
          // Send data to backend
          return customPopup.fire({
            title: `Applied Successfully`,
            icon: "success",
            text: "Once admitted, the chief warden will contact you through your school email.",
            confirmButtonText: "Sure!",
            confirmButtonColor: "#00A300",
          });
        }
      })
      .then((result) => {
        if (result?.isConfirmed) {
          navigate("/staffs/login");
        }
      });
  };

  return (
    <div className="parent-container">
      <h2 className="text-lg font-extrabold mb-5">Select a Room</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 m-4">
        {currentBlock?.map((el: any) => (
          <div
            onClick={() => {
              if (!el.code.includes("1")) {
                selectRoomHandler(el._id, el.code);
              }
            }}
            key={el.code}
            className={`${
              el.code.includes("1") &&
              "bg-red-300 text-white hover:cursor-not-allowed"
            } font-semibold tracking-wider text-center m-3 shadow rounded py-3 hover:shadow-lg active:brightness-125 hover:cursor-pointer text-primary`}
          >
            <span>{el.code}</span>
          </div>
        ))}
      </div>
      <button
        className="text-primary text-sm font-bold mt-5 mb-2 max-w-fit mx-auto hover:brightness-150"
        type="button"
        onClick={() => {
          navigate("/students/admission/mealplans");
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default Rooms;
