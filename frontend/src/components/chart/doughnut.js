import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export const DoughnutChart = ({ data }) => {
	const chartContainer = useRef(null);
	const chartInstance = useRef(null);

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy();
		}
		chartInstance.current = new Chart(chartContainer.current, {
			type: 'doughnut',
			data: {
				labels: data.labels,
				datasets: [
					{
						data: data.data,
					},
				],
			},
			options: {
				responsive: true,
			},
		});
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [data]);
	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.update();
		}
	}, [data]);

	return <canvas ref={chartContainer} />;
};

export default DoughnutChart;
