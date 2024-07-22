import { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScenarioService } from '../../../services/scenario.service';
import ContainerSmall from '../../ContainerSmall';
import { StepService } from '../../../services/step.service';
import ScenarioThumbnail from './ScenarioThumbnail';
import StepThumbnail from './StepThumbnail';
import { sensorService } from '../../../services/sensor.service';

export default function Scenario() {
	const { scenarioId } = useParams();

	const [scenario, setScenario] = useState({});
	const [steps, setSteps] = useState([]);
	const [scenarioStatusTitle, setScenarioStatusTitle] = useState('arrété');
	const [scenarioStatus, setScenarioStatus] = useState('stopped');
	const [sensors, setSensors] = useState([]);

	const valueRef = createRef();
	const sensorIdRef = createRef();
	const unitRef = createRef();
	const secondDelayRef = createRef();
	const typeRef = createRef();

	useEffect(() => {
		sensorService.getHousesAreasSensors().then((response) => {
			setSensors(response.houses);
			console.log(response.houses);
		}); 

		setScenarioInfos();	

		setInterval(() => {
			setScenarioInfos();
		}, 5000);
	}, []);

	const setScenarioInfos = () => {
		ScenarioService.getScenario(scenarioId)
			.then(response => response.data.scenario)
			.then(scenario => {
				setScenario(scenario);

				StepService.getScenarioSteps(scenario.id)
					.then(response => response.data.steps)
					.then(steps => {
						setSteps(steps);
					});
			});
	};

	useEffect(() => {
		setScenarioStatus(scenario.status);
	}, [scenario]);

	useEffect(() => {
		switch (scenarioStatus) {
			case 'stopped':
				setScenarioStatusTitle('arrété');
				break;
			case 'paused':
				setScenarioStatusTitle('en pause');
				break;
			case 'started':
				setScenarioStatusTitle('en cours');
				break;

			default:
				break;
		}
	}, [scenarioStatus]);

	const deleteStep = id => {
		StepService.deleteStep(id)
			.catch(() => {
				console.log("impossible de supprimer l'étape");
			})
			.then(() => {
				setSteps(steps.filter(step => id !== step.id));
			});
	};

	const handleSubmit = event => {
		event.preventDefault();
		const stepParams = {
			value: valueRef.current.value,
			sensorId: sensorIdRef.current.value,
			unit: unitRef.current.value,
			executionSecondDelay: secondDelayRef.current.value,
			type: typeRef.current.value,
		};

		StepService.createStep(scenarioId, stepParams)
			.catch(error => {
				console.log(error);
			})
			.then(response => response.data.step)
			.then(step => {
				setSteps([...steps, step]);
			});
	};

	const handleScenarioAction = action => {
		switch (action) {
			case 'start':
				ScenarioService.startScenario(scenarioId).then(response => {
					if (response.status === 200) setScenarioStatus('started');
					setScenarioInfos();
				});
				break;
			case 'stop':
				ScenarioService.stopScenario(scenarioId).then(response => {
					if (response.status === 200) setScenarioStatus('stopped');
					setScenarioInfos();
				});
				break;
			case 'pause':
				ScenarioService.pauseScenario(scenarioId).then(response => {
					if (response.status === 200) setScenarioStatus('paused');
					setScenarioInfos();
				});
				break;
			default:
				console.log('Action sur le scénario impossible');
				break;
		}
	};

	return (
		<ContainerSmall
			title={`Scénario : ${scenario.name} (${scenarioStatusTitle})`}
		>
			{scenarioStatus !== 'stopped' && `Démarré depuis ${scenario.startedAt}`}
			<button
				onClick={() => handleScenarioAction('start')}
				disabled={scenarioStatus === 'started'}
			>
				Démarrer
			</button>
			<button
				onClick={() => handleScenarioAction('pause')}
				disabled={scenarioStatus !== 'started'}
			>
				Pause
			</button>
			<button
				onClick={() => handleScenarioAction('stop')}
				disabled={scenarioStatus === 'stopped'}
			>
				Arrêter
			</button>
			{steps.map((step, stepIndex) => {
				return (
					<StepThumbnail
						step={step}
						stepIndex={stepIndex + 1}
						deleteStep={deleteStep}
						key={step.id}
					/>
				);
			})}
			<div className="addHouse">
				<form onSubmit={event => handleSubmit(event)}>
					<div className="row">
						<div className="col-25">
							<label htmlFor="step-sensorId">Sensor</label>
							<select
								required
								id="step-sensorId"
								ref={sensorIdRef}
								>
								{sensors?.map(house => {
									return (
										house.areas?.map(area => {{
											return (
												<optgroup label={`${house.name} - ${area.name}`}>
													{
														area.sensors?.map(sensor => 
															<option value={sensor.id}>{sensor.name}</option>
															)
													}
												</optgroup>
											)
										}})
									)
								})}
							</select>

							<label htmlFor="step-value">Valeur</label>
							<input
								required
								type="text"
								id="step-value"
								placeholder="3"
								ref={valueRef}
							/>

							<label htmlFor="step-unit">Unité</label>
							<input
								required
								type="text"
								id="step-unit"
								placeholder="kwh"
								ref={unitRef}
							/>

							<label htmlFor="step-secondDelay">Délai en secondes</label>
							<input
								required
								type="number"
								id="step-secondDelay"
								placeholder="60"
								ref={secondDelayRef}
							/>

							<label htmlFor="step-type">Type de mesure</label>
							<input
								required
								type="text"
								id="step-type"
								placeholder="consumption"
								ref={typeRef}
							/>
						</div>
						<div className="col-75">
							<button type="submit">ajouter</button>
						</div>
					</div>
				</form>
			</div>
		</ContainerSmall>
	);
}
