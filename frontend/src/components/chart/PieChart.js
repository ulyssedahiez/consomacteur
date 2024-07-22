import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';

const PieChart = ({ data }) => {
	const canvasRef = useRef(null);
	const barChartRef = useRef(null);
	const chartRef = useRef(null); // nouvelle référence pour le graphique

	function destroyChart() {
		chartRef.current.destroy();
	}

	useEffect(() => {
		const dataChart = {
			labels: data.labels,
			datasets: [
				{
					label: 'consommation',
					data: data.data,
					backgroundColor: [ '#31525b', '#b3dee5', '#ffa101', '#fae6b1'],

					borderWidth: 1,
				},
			],
		};

		const ctx = canvasRef.current.getContext('2d');

		if (chartRef.current) {
			destroyChart();
		}

		chartRef.current = new Chart(ctx, {
			type: 'doughnut',
			data: dataChart,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'cmmation énergétique par mois',
				},
			},
		});
	}, [data]);

	return (
		<div className="barChart">
			<canvas id="doughnut-chart" ref={canvasRef} />
		</div>
	);
};

export default PieChart;
