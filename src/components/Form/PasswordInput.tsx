import { ErrorMessage, Field } from "formik";
import { useState } from "react";

interface Props {
  id: string;
  name: string;
  placeholder: string;
}

const hide =
  "https://res.cloudinary.com/dqrnskj2b/image/upload/v1680583256/Hostel%20Management%20Project/UI/icons/viewPassword_tbzoeq.png";
const show =
  "https://res.cloudinary.com/dqrnskj2b/image/upload/v1680583256/Hostel%20Management%20Project/UI/icons/hidePassword_yrbwks.png";

function PasswordInput({ id, name, placeholder }: Props) {
  const [toggle, setToggle] = useState<"shown" | "hidden">("hidden");

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between relative items-center rounded-md px-4 py-2 shadow w-full">
        <Field
          className="outline-none w-4/5"
          // className="focus:outline-none grow"
          id={id}
          name={name}
          placeholder={placeholder}
          type={toggle === "hidden" ? "password" : "text"}
        />
        <img
          className="w-5 h-5"
          src={toggle === "hidden" ? hide : show}
          alt="showOrHidePassword"
          onClick={(): void => {
            setToggle((prevState) => {
              if (prevState === "hidden") return "shown";
              else return "hidden";
            });
          }}
        />
      </div>
      <span className="m-1 text-sm text-red-800">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}

export default PasswordInput;
