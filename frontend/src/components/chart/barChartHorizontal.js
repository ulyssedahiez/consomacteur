import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';

const BarchartHorizontal = ({ maxX, data }) => {
	const canvasRef = useRef(null);
	const barChartRef = useRef(null);
	const chartRef = useRef(null); // nouvelle référence pour le graphique

	useEffect(() => {
		const dataChart = {
			labels: data.labels,
			datasets: [
				{
					label: 'sensors',
					data: data.data,
					backgroundColor: '#ffa101',
					borderColor: '#ffa101',
					borderWidth: 1,
				},
			],
		};

		const ctx = canvasRef.current.getContext('2d');

		if (chartRef.current) {
			chartRef.current.destroy();
		}

		chartRef.current = new Chart(ctx, {
			type: 'bar',
			data: dataChart,
			options: {
				responsive: true,
				indexAxis: 'y',
				maintainAspectRatio: false,
				scales: {
					x: {
						beginAtZero: true,
						max: 30,
					},
				},
			},
		});
	}, [data]);

	return (
		<div className="barChart">
			<canvas id="bar-chart" ref={canvasRef} />
		</div>
	);
};

export default BarchartHorizontal;
