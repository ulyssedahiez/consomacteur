import { Chart } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { chartDataMakerSupConso } from './dataMakerSupConso.js';

const LinechartHorizontal = ({ id }) => {
	const [chartData, setChartData] = useState(null);
	const [chartLabels, setChartLabels] = useState(null);
	const canvasRef = useRef(null);
	const chartRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await chartDataMakerSupConso.makeDatasensors(id);
			if (data) {
				let datasets = [];
				let labels;
				for (let i = 0; i < data.labels.length; i++) {
					data.data[i].reverse();
					datasets.push({
						label: data.labels[i],
						data: data.data[i],
						borderWidth: 1,
					});
					data.label[i].reverse();
					labels = data.label[i];
				}
				setChartData(datasets);
				setChartLabels(labels);
			}
		}
		fetchData();
	}, [id]);

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d'); // add a check for null

		if (chartRef.current) {
			chartRef.current.destroy();
		}

		if (chartData && ctx) {
			// add a check for ctx
			const dataChart = {
				labels: chartLabels,
				datasets: chartData,
			};

			chartRef.current = new Chart(ctx, {
				type: 'line',
				data: dataChart,
				options: {
					indexAxis: 'x',
					responsive: true,
					maintainAspectRatio: false,
					elements: {
						line: {
							borderWidth: 2,
						},
					},
					responsive: true,
					plugins: {
						legend: {
							position: 'right',
						},
						title: {
							display: true,
							text: 'Consommation énergétique par mois',
						},
					},
				},
			});
		}
	}, [chartData]);

	// if (!chartData) {
	// 	return <div>Loading...</div>;
	// }
	// console.log(datasets.labels);

	// return (
	// 	<div className="lineChart">
	// 		<canvas id="line-chart" ref={canvasRef} />
	// 	</div>
	// );

  let truc;

  if (chartData) {
    truc = <div className="lineChart">
        <canvas id="line-chart" ref={canvasRef} />
      </div>;
  } else {
    truc = <div>Loading...</div>;
  }


	return truc;
};

export default LinechartHorizontal;
