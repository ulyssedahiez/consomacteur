import { useEffect, useRef, useState } from 'react';
import { sensorService } from '../../../services/sensor.service';
import { areaService } from '../../../services/area.service';

const AreaContainer = ({
	area: { id, name, updatedAt, createdAt, houseId, parentAreaId },
	deleteArea,
}) => {
	const [sensors, setSensors] = useState([]);
	const nameNewSensor = useRef();
	useEffect(() => {
		sensorService
			.getSensors(id)
			.then(res => {
				setSensors(res.data.sensors);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	function deleteSensor(idSensor) {
		sensorService
			.deleteSensor(idSensor)
			.then(res => {
				setSensors(sensors.filter(sensor => sensor.id !== idSensor));
			})
			.catch(error => {
				console.log(error);
			});
	}

	function handleSubmit(event) {
		event.preventDefault();
		const body = {
			name: nameNewSensor.current.value,
		};
		sensorService
			.createSensor(body, id)
			.then(res => {
				setSensors([...sensors, res.data.sensor]);
			})
			.catch(err => {});
	}

	return (
		<div className="card area">
			<div className="titleCard">
				<a>{`pièce : ${name}`}</a>
			</div>
			<p>Sensors : </p>
			<div className="sensorsContainer">
				{sensors.map(sensor => {
					return (
						<div className="sensorContainer" key={sensor.id}>
							<div className="col-1">
								<p>{sensor.name} : </p>
							</div>
							<div className="col-2">
								<button
									onClick={() => deleteSensor(sensor.id)}
									className="buttonList suppr"
								>
									Supprimer
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="addSensor">
				<form onSubmit={event => handleSubmit(event)}>
					<div className="row">
						<div className="col-1">
							<input required type="text" id="name" ref={nameNewSensor} />
						</div>
						<div className="col-2">
							<button type="submit">ajouter sensor</button>
						</div>
					</div>
				</form>
			</div>

			<button onClick={() => deleteArea(id)} className="buttonList suppr">
				Supprimer pièce
			</button>
		</div>
	);
};

export default AreaContainer;
