// Row in modals
function ModalRow({ label, value }: Props) {
  return (
    <span className="flex items-center mb-1">
      <span className="w-1/3 md:w-1/4 left-0">{label}: </span>
      <span className="w-2/3 md:w-auto">{value}</span>
    </span>
  );
}

interface Props {
  label: string | undefined;
  value: any;
}

export default ModalRow;
