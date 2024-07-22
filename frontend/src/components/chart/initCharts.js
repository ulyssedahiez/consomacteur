import Chart from 'chart.js/auto';
import dataConsommation from './../../../data/components/dataConsommation.json';
import dataConsommationByMonth from './../../../data/components/dataConsommationByMonth.json';
import dataIndicateur from './../../../data/components/dataIndicateur.json';

export const createDoughnutChart = canvasRef => {
	const myChartRef = canvasRef.current.getContext('2d');
	new Chart(myChartRef, {
		type: 'doughnut',
		data: dataConsommation,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			title: {
				display: true,
				text: 'Répartition de la consommation énergétique',
			},
		},
	});
};

export function createChartDoughnut(canvasRef, data) {
	const myChartRef = canvasRef.current.getContext('2d');

	new Chart(myChartRef, {
		type: 'doughnut',
		data: data,
		options: {
			//responsive: true,
			//maintainAspectRatio: false,
			title: {
				display: true,
				text: 'Répartition de la consommation énergétique',
			},
		},
	});
}

export const createBarChart = canvasRef => {
	const myChartRef = canvasRef.current.getContext('2d');

	new Chart(myChartRef, {
		type: 'bar',
		data: dataConsommationByMonth,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			title: {
				display: true,
				text: 'Consommation énergétique par mois',
			},
		},
	});
};

export const indicateur = canvasRef => {
	const myChartRef = canvasRef.current.getContext('2d');

	new Chart(myChartRef, {
		type: 'bar',
		data: dataIndicateur,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					display: false,
				},
				y: {
					suggestedMin: 0,
					suggestedMax: 100,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
			},
			tooltips: {
				callbacks: {
					label: context => {
						const value = context.dataset.data[context.dataIndex];
						if (value < 20) {
							return 'Très bien';
						} else if (value < 40) {
							return 'Bien';
						} else if (value < 60) {
							return 'Moyen';
						} else if (value < 80) {
							return 'Pas bien';
						} else {
							return 'Très pas bien';
						}
					},
				},
			},
		},
	});
};
