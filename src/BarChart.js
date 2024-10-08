import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChart = ({ data, searchTerm }) => {
  const labels = Object.keys(data); // 수협 이름
  const values = Object.values(data); // 판매 단가 합계

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`; // 투명도 0.6로 설정
  };

  const randomColor = getRandomColor();

  const chartData = {
    labels: labels,

    datasets: [
      {
        label: searchTerm
          ? `수협별 ${searchTerm} 판매 단가 평균`
          : "어종별 판매 단가 평균",
        data: values,
        backgroundColor: labels.map(() => randomColor), // 막대 색상 설정
        barThickness: 20, // 막대의 고정된 너비를 설정 (픽셀 단위)
        maxBarThickness: 20, // 막대의 최대 너비를 제한
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
