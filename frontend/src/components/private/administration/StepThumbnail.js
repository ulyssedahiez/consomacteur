import { NavLink } from 'react-router-dom';

const StepThumbnail = ({
	stepIndex,
	step: { id, sensorId, value, executionSecondDelay, unit, executedAt },
	deleteStep,
}) => {
	return (
		<div>
			<div className="col-25">
				<p>
					Etape {stepIndex} : le capteur {sensorId} consomme {value} {unit}{' '}
					après {executionSecondDelay} secondes. {executedAt && `Exécutée le : ${executedAt}`}
				</p>
			</div>
			<div className="col-75">
				<button onClick={() => deleteStep(id)} className="buttonList suppr">
					Supprimer
				</button>
			</div>
		</div>
	);
};

export default StepThumbnail;
