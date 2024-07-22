import Axios from "./caller.service"

let getAreas = (houseId) => {
    return Axios.get(`/houses/${houseId}/areas`)
}

let createArea = (credentials, houseId) => {
    return Axios.post(`/houses/${houseId}/areas`, credentials);
}

let deleteArea = AreaId => {
    return Axios.delete(`/areas/${AreaId}`)
}

export const areaService = {
    getAreas,
    createArea,
    deleteArea
}