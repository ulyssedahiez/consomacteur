import { NavLink } from 'react-router-dom';

const ScenarioThumbnail = ({
	scenario: { id, name, userId, updatedAt, createdAt },
	consultScenario,
	deleteScenario
}) => (
	<div>
		<div className="col-25">
			<p>{name} : </p>
		</div>
		<div className="col-75">
			
			<button onClick={() => consultScenario(id)} className="buttonList">
				Consulter
			</button>
			<button onClick={() => deleteScenario(id)} className="buttonList suppr">
				Supprimer
			</button>
		</div>
	</div>
);

export default ScenarioThumbnail;
