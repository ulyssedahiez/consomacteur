import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContainerSmall from '../../ContainerSmall';
import { houseService } from '../../../services/house.service';
import { areaService } from '../../../services/area.service';
import CardLayout from '../../cardLayout';
import AreaContainer from './area';
import '../../../../css/CardLayout.css';

export default function House() {
	const { houseId } = useParams();
	const [house, setHouse] = useState({});
	const [areas, setAreas] = useState([]);
	const [inputError, setInputError] = useState(false);

	const nameNewArea = useRef();

	function handleSubmit(event) {
		event.preventDefault();
		const body = {
			name: nameNewArea.current.value,
		};
		areaService.createArea(body, houseId).then(newArea => {
			console.log('newArea', newArea);
			setAreas([...areas, newArea.data.area]);
		});
	}

	useEffect(() => {
		houseService
			.getHouse(houseId)
			.then(dataHouse => {
				setHouse(dataHouse.data.house);
				setInputError(false);
			})
			.catch(error => {
				setInputError(true);
			});

		areaService
			.getAreas(houseId)
			.then(areas => {
				console.log(areas.data.areas);
				setAreas(areas.data.areas);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	function deleteArea(id) {
		areaService
			.deleteArea(id)
			.then(res => {
				setAreas(areas.filter(area => area.id !== id));
			})
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<>
			<ContainerSmall title={`Maison : ${house.name}`}>
				<div className="addHouse">
					<form onSubmit={event => handleSubmit(event)}>
						<div className="row">
							<div className="col-25">
								<input required type="text" id="name" ref={nameNewArea} />
							</div>
							<div className="col-75">
								<button type="submit">ajouter</button>
							</div>
						</div>
					</form>
					{inputError && (
						<>
							<div className="layoutInputError">
								<div className="inputError">
									<p>Ce nom de maison existe peut être déjà.</p>
								</div>
							</div>
						</>
					)}
				</div>
			</ContainerSmall>

			<div className="cardLayout">
				{areas.map(area => {
					return (
						<AreaContainer area={area} deleteArea={deleteArea} key={area.id} />
					);
				})}
			</div>
		</>
	);
}
