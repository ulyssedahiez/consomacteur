import LinechartHorizontal from '../chart/LineChart';

const AreaPlaceDashboard = ({ areas }) => {

	return (
		<div className="listAreas">
			{areas.map((area, i) => {
				return (
					<div key={i}>
						<div className="container">
							<h1 className="titleForm">{area.name}</h1>
							<LinechartHorizontal id={area.id} />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AreaPlaceDashboard;
