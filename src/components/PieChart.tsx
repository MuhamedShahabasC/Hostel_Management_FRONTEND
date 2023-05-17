import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ className, data }: Props) {
  const dataPreset = {
    labels: ["Pending", "Paid"],
    datasets: [
      {
        label: " ₹",
        data: data || [40, 60],
        backgroundColor: ["rgba(255, 159, 64, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 159, 64, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={className}>
      <Pie data={dataPreset} />
    </div>
  );
}

interface Props {
  className?: string;
  data: [number | undefined, number | undefined];
}
