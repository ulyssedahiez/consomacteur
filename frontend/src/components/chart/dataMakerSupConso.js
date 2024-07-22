import { sensorService } from '../../services/sensor.service';
import { measurementService } from '../../services/measurement.service';

let makeDataConsoAllAreasbyHouse = async id => {
	return chartDataMakerSupConso.makeDatasensors(id);
};

let makeDatasensors = async id => {
	try {
		let sensors = [];
		let listNameSensors = [];
		let listNameConsoSensors = [];
		let tempListNameConsoSensors = [];
		let tempListDateConsoSensors = [];
		let listDateConsoSensors = [];

		const res = await sensorService.getSensors(id);
		sensors.push(res.data.sensors);

		for (const sensor of res.data.sensors) {
			const measurement = await measurementService.getMeasurements(sensor.id);
			const dataListmeasurement = measurement.data.measurements;

			dataListmeasurement.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

			if (
				dataListmeasurement[0] == undefined ||
				dataListmeasurement[1] == undefined
			) {
			} else if (dataListmeasurement[0].value > dataListmeasurement[1].value) {
				listNameSensors.push(sensor.name);
				for (const data of dataListmeasurement) {
					tempListNameConsoSensors.push(data.value);
					let date = new Date(data.timestamp);
					tempListDateConsoSensors.push(date.toLocaleString("fr"));
				}
				listNameConsoSensors.push(tempListNameConsoSensors);
				tempListNameConsoSensors = [];
				listDateConsoSensors.push(tempListDateConsoSensors);
				tempListDateConsoSensors = [];
			}
			listDateConsoSensors.reverse();
		}
		return {
			labels: listNameSensors,
			data: listNameConsoSensors,
			label: listDateConsoSensors,
		};
	} catch (error) {
		console.log(error);
		return null;
	}
};
export const chartDataMakerSupConso = {
	makeDatasensors,
	makeDataConsoAllAreasbyHouse,
};
