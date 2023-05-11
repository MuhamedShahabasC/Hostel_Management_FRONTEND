import { ReactNode } from "react";

function ModalDiv({ children }: Props) {
  return <div className="flex flex-col justify-center md:px-4">{children}</div>;
}

interface Props {
  children: ReactNode;
}

export default ModalDiv;
