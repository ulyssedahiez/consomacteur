import Axios from './caller.service';
import { houseService } from './house.service';
import { areaService } from './area.service';

let getSensors = id => {
	return Axios.get(`areas/${id}/sensors`);
};

let createSensor = (credentials, areaId) => {
	return Axios.post(`/areas/${areaId}/sensors`, credentials);
}

let deleteSensor = (id) => {
	return Axios.delete(`/sensors/${id}`);
}

const getHousesAreasSensors = async () => {
	const houses = (await houseService.getHouses()).data.houses;

	await houses.forEach(async house => {
		house.areas = (await areaService.getAreas(house.id)).data.areas;

		await house.areas.forEach(async area => {
			area.sensors = (await sensorService.getSensors(area.id)).data.sensors;
		})
	});

	return {houses}
}

export const sensorService = {
	getSensors,
	createSensor, 
	deleteSensor,
	getHousesAreasSensors,
};
