import { Routes, Route } from 'react-router-dom';
import ALayout from './ALayout';

import ListScenarios from './listScenarios';
import ListHouse from './listHouse';
import Scenario from './Scenario';
import House from './house';
const AdministrationRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<ALayout />}>
				<Route
					path="/"
					element={
						<>
							<ListHouse />
							<ListScenarios />
						</>
					}
				/>
				<Route path="/scenarios/:scenarioId" element={<Scenario />} />
				<Route path="/houses/:houseId" element={<House />} />
				<Route path="/*" element={<Error />} />
			</Route>
		</Routes>
	);
};
export default AdministrationRouter;

