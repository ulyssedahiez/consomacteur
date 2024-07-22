import Axios from "./caller.service"

let getScenarios = ()=>{
    return Axios.get('/scenarios');
}

let createScenario = (credentials) => {
    return Axios.post(`/scenarios`, credentials);
}

let deleteScenario = id => {
    console.log(id)
    return Axios.delete(`/scenarios/${id}`)
}

const getScenario = id => {
    return Axios.get(`/scenarios/${id}`);
}

const startScenario = id => {
    return Axios.post(`/scenarios/${id}/actions/start`);
}

const pauseScenario = id => {
	return Axios.post(`/scenarios/${id}/actions/pause`);
};

const stopScenario = id => {
	return Axios.post(`/scenarios/${id}/actions/stop`);
};

export const ScenarioService = {
    getScenarios,
    createScenario,
    deleteScenario,
    getScenario,
    startScenario,
    pauseScenario,
    stopScenario,
}