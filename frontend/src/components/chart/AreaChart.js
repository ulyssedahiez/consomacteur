import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';

const AreaChart = ({ data }) => {
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
					backgroundColor: ['#31525b', '#b3dee5', '#ffa101', '#fae6b1'],

					borderWidth: 1,
				},
			],
		};

		const ctx = canvasRef.current.getContext('2d');

		if (chartRef.current) {
			destroyChart();
		}

		chartRef.current = new Chart(ctx, {
			type: 'polarArea',
			data: dataChart,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'consommation énergétique par mois',
				},
			},
		});
	}, [data]);

	return (
		<div className="barChart">
			<canvas id="Area-chart" ref={canvasRef} />
		</div>
	);
};

export default AreaChart;
