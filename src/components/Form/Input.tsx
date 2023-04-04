import { Field, ErrorMessage } from "formik";

interface props {
  id: string;
  name: string;
  placeholder: string;
  type: string;
}

function Input({ id, name, placeholder, type }: props) {
  return (
    <div className="flex flex-col">
      <Field
        className="border-1 rounded-md px-4 py-2 shadow w-full focus:outline-none"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      <span className="m-1 text-sm text-red-800">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}

export default Input;
