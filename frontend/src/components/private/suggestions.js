// import React, { useEffect, useRef, useState } from 'react';
// import ContainerSmall from '../ContainerSmall';
// import { areaService } from '../../services/area.service';
// import '../../../css/administration.css';
// import { houseService } from '../../services/house.service';
// import { sensorService } from '../../services/sensor.service';
// import { measurementService } from '../../services/measurement.service';
// // import ChartDoughnut from 'chart.js/auto';
// import { json } from 'react-router-dom';
// import { DoughnutChart } from '../chart/doughnut';

// export default function Suggestions() {
// 	const [chartData, setChartData] = useState({ labels: [], data: [] });

// 	const [houses, setHouses] = useState([]);
// 	const [measurements, setMeasurements] = useState([]);
// 	const [selectedHouse, setSelectedHouse] = useState(null);

// 	const [houseAreas, setHouseAreas] = useState([]);

// 	useEffect(() => {
// 		houseService.getHouses().then(houses => {
// 			setHouses(houses.data.houses);
// 		});
// 	}, []);

// 	// useEffect(() => {
// 	// 	createDoughnutChart(doughnutChartRef);
// 	// }, [pieData]);

// 	function getAreas(id) {
// 		areaService.getAreas(id).then(areas => {
// 			setHouseAreas(areas.data.areas);
// 			const measurementPromises = areas.data.areas.map(area => {
// 				return getMeasurement(area.id).then(measurement => {
// 					return { areaId: area.id, value: measurement };
// 				});
// 			});
// 			Promise.all(measurementPromises).then(measurements => {
// 				setMeasurements(measurements);
// 			});
// 		});
// 	}

// 	function getMeasurement(id) {
// 		let total = 0;
// 		return new Promise(resolve => {
// 			sensorService.getSensors(id).then(sensors => {
// 				const measurementPromises = sensors.data.sensors.map(sensor => {
// 					return measurementService
// 						.getMeasurements(sensor.id)
// 						.then(measurements => {
// 							if (measurements.data.measurements.length !== 0) {
// 								const sortedMeasurements = measurements.data.measurements.sort(
// 									(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
// 								);
// 								const latestMeasurement = sortedMeasurements[0];
// 								total += latestMeasurement.value;
// 								return total.toFixed(2);
// 							} else {
// 								return 0;
// 							}
// 						});
// 				});
// 				Promise.all(measurementPromises).then(values => {
// 					console.log(values);
// 					values.sort((a, b) => b - a);
// 					resolve(values[0]);
// 				});
// 			});
// 		});
// 	}
// 	function handleChartUpdate() {
// 		const chartLabels = houseAreas.map(area => area.name);
// 		const chartData = houseAreas.map(area => {
// 			return measurements.find(m => m.areaId === area.id)?.value ?? 0;
// 		});
// 		setChartData({ labels: chartLabels, data: chartData });
// 	}
// 	function handleHouseClick(house) {
// 		setSelectedHouse(house);
// 		getAreas(house.id);
// 		const chartLabels = houseAreas.map(area => area.name);
// 		const chartData = houseAreas.map(area => {
// 			return measurements.find(m => m.areaId === area.id)?.value ?? 0;
// 		});
// 		setChartData({ labels: chartLabels, data: chartData });
// 	}

// 	return (
// 		<ContainerSmall title="Liste Maisons">
// 			<div>
// 				{houses.map(house => (
// 					<button
// 						className="buttonList"
// 						key={house.id}
// 						onClick={() => handleHouseClick(house)}
// 					>
// 						{house.name}
// 					</button>
// 				))}
// 			</div>
// 			<DoughnutChart data={chartData} onUpdate={handleChartUpdate} />

// 			<div className="areas">
// 				{/* {houseAreas.map(area => (
// 					<div key={area.id}>
// 						{area.name}:{' '}
// 						{measurements.find(m => m.areaId === area.id)?.value ?? 0} kW
// 					</div>
// 				))} */}
// 			</div>
// 			<div className="addHouse">
// 				<form onSubmit={event => handleSubmit(event)}>
// 					<div className="row"></div>
// 				</form>
// 			</div>
// 		</ContainerSmall>
// 	);
// }

// import React, { useEffect, useRef, useState } from 'react';
// import ContainerSmall from '../ContainerSmall';
// import { areaService } from '../../services/area.service';
// import '../../../css/administration.css';
// import { houseService } from '../../services/house.service';
// import { sensorService } from '../../services/sensor.service';
// import { measurementService } from '../../services/measurement.service';
// // import ChartDoughnut from 'chart.js/auto';
// import { json, unstable_HistoryRouter } from 'react-router-dom';
// import { DoughnutChart } from '../chart/doughnut';
// import { BarChart } from '../chart/bar';

// export default function Suggestions() {
// 	const [chartData, setChartData] = useState({
// 		label: [],
// 		labels: [],
// 		data: [],
// 	});

// 	const [houses, setHouses] = useState([]);
// 	const [measurements, setMeasurements] = useState([]);
// 	const [selectedHouse, setSelectedHouse] = useState(null);

// 	const [houseAreas, setHouseAreas] = useState([]);

// 	useEffect(() => {
// 		houseService.getHouses().then(houses => {
// 			setHouses(houses.data.houses);
// 		});
// 	}, []);

// 	// useEffect(() => {
// 	// 	createDoughnutChart(doughnutChartRef);
// 	// }, [pieData]);

// 	function getAreas(id) {
// 		areaService.getAreas(id).then(areas => {
// 			setHouseAreas(areas.data.areas);
// 			const measurementPromises = areas.data.areas.map(area => {
// 				return getMeasurement(area.id).then(measurement => {
// 					return { areaId: area.id, value: measurement };
// 				});
// 			});
// 			Promise.all(measurementPromises).then(measurements => {
// 				setMeasurements(measurements);
// 			});
// 		});
// 	}

// 	function getMeasurement(id) {
// 		let total = 0;
// 		let tabfinalConso = [];
// 		let tabfinalSensor = [];
// 		let tabfinalDate = [];
// 		let tabFinal = { label: [], labels: [], data: [] };
// 		return new Promise(resolve => {
// 			sensorService.getSensors(id).then(sensors => {
// 				//console.log(sensors);
// 				const measurementPromises = sensors.data.sensors.map(sensor => {
// 					return measurementService
// 						.getMeasurements(sensor.id)
// 						.then(measurements => {
// 							if (measurements.data.measurements.length !== 0) {
// 								const sortedMeasurements = measurements.data.measurements.sort(
// 									(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
// 								);
// 								if (sortedMeasurements[1] === undefined) {
// 									sortedMeasurements[1] = sortedMeasurements[0];
// 								}
// 								if (sortedMeasurements[0].value > sortedMeasurements[1].value) {
// 									tabfinalSensor.push(sensor.name);
// 									tabfinalConso.push(sortedMeasurements[0].value);
// 									tabfinalConso.push(sortedMeasurements[1].value);
// 									tabfinalDate.push(sortedMeasurements[0].timestamp);
// 									tabfinalDate.push(sortedMeasurements[1].timestamp);
// 								}
// 								const latestMeasurement = sortedMeasurements[0];
// 								total += latestMeasurement.value;
// 								return total.toFixed(2);
// 							} else {
// 								return 0;
// 							}
// 						});
// 				});
// 				Promise.all(measurementPromises).then(values => {
// 					tabFinal = {
// 						label: tabfinalDate,
// 						labels: tabfinalSensor,
// 						data: tabfinalConso,
// 					};
// 					resolve(tabFinal);
// 				});
// 			});
// 		});
// 	}
// 	// function handleChartUpdate() {
// 	// 	const chartLabels = houseAreas.map(area => area.name);
// 	// 	const chartData = houseAreas.map(area => {
// 	// 		return measurements.find(m => m.areaId === area.id)?.value ?? 0;
// 	// 	});
// 	// 	setChartData(labels, { labels: chartLabels, data: chartData });
// 	// }

// 	function handleHouseClick(house) {
// 		setSelectedHouse(house);
// 		getAreas(house.id);
// 		let tab = [];
// 		let tabFinal = [];

// 		let tab1 = [];
// 		let tabFinal1 = [];

// 		const chartLabels = houseAreas.map(area => {
// 			if (
// 				measurements.find(m => m.areaId === area.id)?.value.labels[0] ===
// 				undefined
// 			) {
// 				return;
// 			}
// 			return measurements.find(m => m.areaId === area.id)?.value.labels[0];
// 		});

// 		const chartData = houseAreas.map(area => {
// 			tab = measurements.find(m => m.areaId === area.id)?.value.data;
// 			tabFinal[0] = tab[0];
// 			tabFinal[1] = tab[1];
// 			return tabFinal;
// 		});

// 		const chartLabel = houseAreas.map(area => {
// 			tab = measurements.find(m => m.areaId === area.id)?.value.label;
// 			tabFinal1[0] = tab1[0];
// 			tabFinal1[1] = tab1[1];
// 			return tabFinal1;
// 		});

// 		setChartData({ label: chartLabel, labels: chartLabels, data: chartData });
// 	}

// 	return (
// 		<ContainerSmall title="Liste Maisons">
// 			<div>
// 				{houses.map(house => (
// 					<button
// 						className="buttonList"
// 						key={house.id}
// 						onClick={() => handleHouseClick(house)}
// 					>
// 						{house.name}
// 					</button>
// 				))}
// 			</div>
// 			<BarChart data={chartData} />

// 			<div className="areas">
// 				{/* {houseAreas.map(area => (
// 					<div key={area.id}>
// 						{area.name}:{' '}
// 						{measurements.find(m => m.areaId === area.id)?.value ?? 0} kW
// 					</div>
// 				))} */}
// 			</div>
// 			<div className="addHouse">
// 				<form onSubmit={event => handleSubmit(event)}>
// 					<div className="row"></div>
// 				</form>
// 			</div>
// 		</ContainerSmall>
// 	);
// }

import { useEffect, useState } from 'react';
import { houseService } from '../../services/house.service';
import '../../../css/places.css';
import { useNavigate, useParams } from 'react-router-dom';
import { areaService } from '../../services/area.service';
import AreaPlaceDashboard from './AreaDashboard';

export default function suggestions() {
	const [housesList, setHousesList] = useState([]);
	const [areas, setAreas] = useState([]);
	const { houseId } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		// console.log(houseId);

		if (houseId) {
			areaService.getAreas(houseId).then(resAreas => {
				setAreas(resAreas.data.areas);
			});
		}

		houseService
			.getHouses()
			.then(houses => {
				setHousesList(houses.data.houses);
			})
			.catch(error => {
				// console.log(error);
			});
	}, []);

	function consultHouse(id) {
		navigate(`/conn/suggestions/${id}`);
		location.reload();
	}

	return (
		<>
			<div className="container">
				<h1 className="titleForm">Liste des Maisons</h1>
				<div className="buttonsHouses">
					{housesList.map(house => {
						return (
							<div key={house.id}>
								<button
									onClick={() => consultHouse(house.id)}
									className="buttonList house"
								>
									{house.name}
								</button>
							</div>
						);
					})}
				</div>
			</div>
			<AreaPlaceDashboard areas={areas} />
		</>
	);
}
