import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';

const Barchart = ({ data }) => {
	const canvasRef = useRef(null);
	const barChartRef = useRef(null);

	useEffect(() => {
		const dataChart = {
			labels: data.labels,
			datasets: [
				{
					label: 'consommation',
					data: data.data,
					backgroundColor: '#b3dee5',
					borderWidth: 1,
				},
			],
		};

		const ctx = canvasRef.current.getContext('2d');
		new Chart(ctx, {
			type: 'bar',
			data: dataChart,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Consommation énergétique par mois',
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

export default Barchart;
