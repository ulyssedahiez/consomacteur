import { sensorService } from '../../services/sensor.service';
import { measurementService } from '../../services/measurement.service';
import { houseService } from '../../services/house.service';
import { areaService } from '../../services/area.service';
let makeDataAllHouses = async () => {
	let res = { data: [], labels: [] };

	try {
		const houses = await houseService.getHouses();
		for (const house of houses.data.houses) {
			res.labels.push(house.name);
			
			const areas = await areaService.getAreas(house.id);
			const dataAreas = await chartDataMaker.makeDataHouse(areas.data.areas);

			res.data.push(dataAreas.data.reduce((acc, curr) => acc + curr, 0));
		}
	} catch (error) {
		console.log(error);
	}
	return res;
};

let makeDataHouse = async areas => {
	let res = { data: [], labels: [] };

	for (const area of areas) {
		res.labels.push(area.name);
		const datasensors = await chartDataMaker.makeDataConsoAllArea(area.id);
		const sum = datasensors.data.reduce((acc, curr) => acc + curr, 0);
		res.data.push(sum);
	}

	return res;
};

let makeDataConsoAllArea = async id => {
	let consoArea = 0;

	const data = await chartDataMaker.makeDatasensors(id);

	consoArea = data.data.reduce((acc, curr) => acc + curr, 0);

	return { data: [consoArea], labels: ['pièce'] };
};

let makeDatasensors = async id => {
	try {
		let sensors = [];
		let listNameSensors = [];
		let listNameConsoSensors = [];

		const res = await sensorService.getSensors(id);
		sensors.push(res.data.sensors);
		listNameSensors = res.data.sensors.map(obj => obj.name);

		for (const sensor of res.data.sensors) {
			const measurement = await measurementService.getMeasurements(sensor.id);
			const dataListmeasurement = measurement.data.measurements;
			if (dataListmeasurement.length > 0) {
				listNameConsoSensors.push(
					dataListmeasurement[dataListmeasurement.length - 1].value
				);
			} else {
				listNameConsoSensors.push(0);
			}
		}

		return { labels: listNameSensors, data: listNameConsoSensors };
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const chartDataMaker = {
	makeDataAllHouses,
	makeDataHouse,
	makeDatasensors,
	makeDataConsoAllArea,
};
