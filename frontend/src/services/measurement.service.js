import Axios from './caller.service';

let getMeasurements = id => {
	return Axios.get(`/sensors/${id}/measurements`);
};

export const measurementService = {
	getMeasurements,
};
