import { ReactNode } from "react";

// Row in modals
function ModalRow({ className, label, value, children }: Props) {
  return (
    <span className={`${className} flex items-center mb-1`}>
      <span className="w-1/3 md:w-1/4 left-0">{label} :</span>
      <span className="w-2/3">
        {value}
        {children}
      </span>
    </span>
  );
}

interface Props {
  className?: string;
  label: string | undefined;
  value?: string | ReactNode;
  children?: ReactNode;
}

export default ModalRow;
