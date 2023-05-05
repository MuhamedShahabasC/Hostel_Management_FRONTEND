import { MetroSpinner as Spinner } from "react-spinners-kit";

function MetroSpinner({ className,color = 'grey' }: Props) {
  return (
    <div className={`mx-auto ${className}`}>
      <Spinner color={color} size={40} />
    </div>
  );
}

interface Props {
  className?: string;
  color?: string;
}

export default MetroSpinner;
