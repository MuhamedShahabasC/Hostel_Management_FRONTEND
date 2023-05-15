import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { blockedEye, openEye } from "../../assets/icons/icons";

function PasswordInput({ id, name, placeholder, edit }: Props) {
  const [toggle, setToggle] = useState<"shown" | "hidden">("hidden");

  return (
    <div className="flex flex-col w-full">
      {edit && (
        <label
          htmlFor={name}
          className="text-sm font-semibold mb-1 ml-1 tracking-widest text-primary"
        >
          {placeholder}
        </label>
      )}
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
          src={toggle === "hidden" ? openEye : blockedEye}
          alt="showOrHidePassword"
          onClick={(): void => {
            setToggle((prevState) => {
              if (prevState === "hidden") return "shown";
              else return "hidden";
            });
          }}
        />
      </div>
      <span className=" m-1 text-sm text-red-800">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}

interface Props {
  id: string;
  name: string;
  placeholder: string;
  edit?: boolean;
}

export default PasswordInput;
