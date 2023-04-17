import { useEffect } from "react";
import { admissionActions, fetchBlocksData } from "../../../store/admission";
import { useAppDispatch, useAppSelector } from "../../../App";
import { useNavigate } from "react-router-dom";

function Blocks() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const blocksData = useAppSelector(
    (state) => state.newAdmission?.hostel?.blocks
  );

  useEffect(() => {
    dispatch(fetchBlocksData());

    // eslint-disable-next-line
  }, []);

  const blocks = blocksData?.map((el: any) => (
    <div
      key={el._id}
      className="p-4 lg:w-auto mx-3 shadow-md rounded hover:shadow-xl hover:cursor-pointer"
      onClick={() => {
        dispatch(admissionActions.addBlock(el));
        navigate("/students/admission/rooms");
      }}
    >
      <span className="m-4 font-semibold text-primary hover:brightness-125">
        {el.name}
      </span>
    </div>
  ));

  return (
    <div className="admission-container justify-center md:w-8/12">
      <h2 className="text-lg font-extrabold mb-5">Choose a Block</h2>
      {blocksData && <div className="flex justify-around">{blocks}</div>}
    </div>
  );
}

export default Blocks;
