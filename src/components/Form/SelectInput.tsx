import { ErrorMessage, Field } from "formik";

function SelectInput({ name, options, className, label, edit }: Props) {
  return (
    <div>
      {edit && label && (
        <label
          htmlFor={name}
          className="text-sm font-semibold mb-1 ml-1 tracking-widest text-primary"
        >
          {label}
        </label>
      )}
      <div className={`${className}`}>
        <Field
          as="select"
          name={name}
          id={name}
          className={`${className} text-gray-400 rounded-md px-4 py-2 shadow focus:outline-none w-full`}
        >
          [
          {
            <option key="default" value="">
              {label}
            </option>
          }
          , ...
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
          ]
        </Field>
        <span className="m-1 text-sm text-red-800">
          <ErrorMessage name={name} />
        </span>
      </div>
    </div>
  );
}

interface Props {
  options: { value: string; text: string }[];
  name: string;
  className?: string;
  label: string;
  edit?: boolean;
}

export default SelectInput;
