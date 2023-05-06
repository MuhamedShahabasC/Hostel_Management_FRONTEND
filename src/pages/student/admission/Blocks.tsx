import { useEffect } from "react";
import { admissionActions, fetchBlocksData } from "../../../store/admission";
import { useAppDispatch, useAppSelector } from "../../../App";
import { useNavigate } from "react-router-dom";
import { hostel1Img, hostel2Img } from "../../../assets/icons/images";
import MetroSpinner from "../../../components/UI/MetroSpinner";

function Blocks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const blocksData = useAppSelector((state) => state.newAdmission?.hostel?.blocks);

  useEffect(() => {
    dispatch(fetchBlocksData());
    // eslint-disable-next-line
  }, []);

  const blocks = blocksData?.map((el: any, i: number) => (
    <div
      key={el._id}
      className="p-4 my-2 lg:w-auto mx-3 shadow-md rounded hover:shadow-xl relative hover:cursor-pointer flex flex-col justify-center"
      onClick={() => {
        dispatch(admissionActions.addBlock(el));
        navigate("/students/admission/rooms");
      }}
    >
      <img
        className="w-36 m-2 hover:animate-pulse relative"
        src={i === 0 ? hostel1Img : hostel2Img}
        alt="blocks"
      />
      <span className="mt-4 text-center font-semibold text-primary hover:brightness-125">
        {el.name}
      </span>
    </div>
  ));

  return (
    <div className="admission-container justify-center md:w-8/12">
      <h2 className="text-lg font-extrabold mb-5">Choose a Block</h2>
      {blocksData ? (
        <div className="flex justify-around">{blocks}</div>
      ) : (
        <MetroSpinner size={50} color="grey" className="my-28" />
      )}
      <button
        className="text-primary text-sm font-bold mt-5 mb-2 max-w-fit mx-auto hover:brightness-150"
        type="button"
        onClick={() => {
          navigate("/students/admission/mealPlans");
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default Blocks;
