import { Routes, Route } from 'react-router-dom';

import Dashboard from './dashbooard';
import Places from './places';
import Profili from './profili';
import Suggestions from './suggestions';
import PLayout from './PLayout';

import AdministrationRouter from './administration/administrationRouter';

import Error from '../../../utils/error';

const PrivateRouter = () => {
	return (
		<Routes>
			<Route element={<PLayout />}>
				<Route index element={<Dashboard />} />

				<Route path="/admin/*" element={<AdministrationRouter />} />

				<Route path="dashboard" element={<Dashboard />} />
				<Route path="places" element={<Places />} />
				<Route path="places/:houseId" element={<Places />} />
				<Route path="dashboard/:houseId" element={<Dashboard />} />
				<Route path="profile" element={<Profili />} />
				<Route path="suggestions" element={<Suggestions />} />

				<Route path="*" element={<Error />} />
			</Route>
		</Routes>
	);
};
export default PrivateRouter;
