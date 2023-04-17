import { viewIcon } from "../assets/icons/icons";

function MealPlan({
  data: { breakfast, dinner, evening, lunch, price, title, selected },
}: Props) {
  return (
    <div className="md:mx-4 my-4 p-4 rounded shadow-lg flex flex-col w-full">
      <div className="flex">
        <div className="text-center grow">
          <h3 className="text-lg text-primary font-bold">{title}</h3>
          <span className="text-md text-primary font-bold">₹ {price} / Month</span>
        </div>
        <img src={viewIcon} className="w-15 ml-4" alt="meal plan" />
      </div>
      <div className="flex flex-col bg-[#F7F7F7] rounded py-8 px-4 mt-6 shadow-md">
        <div className="mb-7">
          <div className="flex justify-between">
            <h4 className="font-bold text-black">Breakfast</h4>
            <h4 className="font-bold text-black">7 - 9 AM</h4>
          </div>
          <p>{breakfast}</p>
        </div>
        <div className="mb-7">
          <div className="flex justify-between">
            <h4 className="font-bold text-black">Lunch</h4>
            <h4 className="font-bold text-black">12 : 30 - 1 : 30 PM</h4>
          </div>
          <p>{lunch}</p>
        </div>
        <div className="mb-7">
          <div className="flex justify-between">
            <h4 className="font-bold text-black">Evening</h4>
            <h4 className="font-bold text-black">4 : 30 - 5 : 30 PM</h4>
          </div>
          <p>{evening}</p>
        </div>
        <div className="mb-7">
          <div className="flex justify-between">
            <h4 className="font-bold text-black">Dinner</h4>
            <h4 className="font-bold text-black">8 - 9 : 30 PM</h4>
          </div>
          <p>{dinner}</p>
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: {
    active?: boolean;
    breakfast: string;
    createdAt: string;
    dinner: string;
    evening: string;
    lunch: string;
    price: number;
    subscribers: number;
    title: string;
    updatedAt: string;
    _id: string;
    selected?: boolean;
  };
}

export default MealPlan;
