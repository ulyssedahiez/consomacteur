import React, { useEffect, useRef, useState } from 'react';
import ContainerSmall from '../../ContainerSmall';
import { houseService } from '../../../services/house.service';
import '../../../../css/administration.css';
import HouseThumbnail from './housethumbnail';
import { useNavigate } from 'react-router-dom';

export default function ListHouse() {
	const [houses, setHouses] = useState([]);
	const [inputError, setInputError] = useState(false);
	const nameHouse = useRef();
	const navigate = useNavigate();

	
	useEffect(() => {
		houseService.getHouses().then(houses => {
			setHouses(houses.data.houses);
		});
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		const body = {
			name: nameHouse.current.value,
		};
		houseService
			.createHouse(body)
			.then(house => {
				setHouses([...houses, house.data.house]);
				setInputError(false);
			})
			.catch(error => {
				console.log(error);
				setInputError(true);
			});
	}
	function consultHouse(id) {
		navigate(`/conn/admin/houses/${id}`)
	}

	function deleteHouse(id) {
		houseService
			.deleteHouse(id)
			.then(res => {
				setHouses(houses.filter(house => house.id !== id));
			})
			.catch(error => {
				console.log(error);
				setInputError(true);
			});
	}

	return (
		<ContainerSmall title="Liste Maisons">
			{houses.map((house) => {
				return (
					<HouseThumbnail
						house={house}
						consultHouse={consultHouse}
						deleteHouse={deleteHouse}
						key={house.id}
					/>
				);
			})}
			<div className="addHouse">
				<form onSubmit={event => handleSubmit(event)}>
					<div className="row">
						<div className="col-2">
							<input required type="text" id="name" ref={nameHouse} />
						</div>
						<div className="col-1">
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
	);
}
