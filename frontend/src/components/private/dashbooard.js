import { useEffect, useState } from 'react';
import { houseService } from '../../services/house.service';
import '../../../css/places.css';
import { useNavigate, useParams } from 'react-router-dom';
import { areaService } from '../../services/area.service';
import AreaPlaceDashboard from './AreaDashboard';
import AutoRefresh from '../../_helpers/AutoRefresh';

export default function dashboard() {
	const [housesList, setHousesList] = useState([]);
	const [areas, setAreas] = useState([]);
	const { houseId } = useParams();
	const navigate = useNavigate();
	const [refreshCount, setRefreshCount] = useState(0);
	useEffect(() => {
		async function getData() {
			if (houseId) {
				const resAreas = await areaService.getAreas(houseId);
				setAreas(resAreas.data.areas);
			}
			houseService
				.getHouses()
				.then(houses => {
					setHousesList(houses.data.houses);
				})
				.catch(error => {
					console.log(error);
				});
		}
		getData();
	}, [refreshCount]);

	function consultHouse(id) {
		navigate(`/conn/dashboard/${id}`);
		location.reload();
	}

	function triggerRefresh() {
		setRefreshCount(count => count + 1);
	}

	return (
		<>
			<AutoRefresh intervalTime={15000} refreshFunction={triggerRefresh} />
			<div className="container">
				<h1 className="titleForm">Liste des Maisons</h1>
				<div className="buttonsHouses">
					{housesList.map(house => {
						let active = house.id == houseId ? 'active' : '';
						return (
							<div key={house.id}>
								<button
									id={house.id}
									onClick={() => consultHouse(house.id)}
									className={`buttonList house ${active}`}
								>
									{house.name}
								</button>
							</div>
						);
					})}
				</div>
			</div>
			<AreaPlaceDashboard areas={areas} />
		</>
	);
}
