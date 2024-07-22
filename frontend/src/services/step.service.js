import Axios from './caller.service';

let getScenarioSteps = scenarioId => {
	return Axios.get(`/scenarios/${scenarioId}/steps`);
};

let createStep = (scenarioId, params) => {
	return Axios.post(`/scenarios/${scenarioId}/steps`, params);
};

let deleteStep = id => {
	return Axios.delete(`/steps/${id}`);
};

const getStep = id => {
	return Axios.get(`/steps/${id}`);
};

export const StepService = {
	getScenarioSteps,
	createStep,
	deleteStep,
	getStep,
};
