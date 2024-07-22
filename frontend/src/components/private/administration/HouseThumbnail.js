const HouseThumbnail = ({
	house: { id, name, userId, updatedAt, createdAt },
	deleteHouse,
	consultHouse,
}) => (
	<div>
		<div className="col-25">
			<p>{name} : </p>
		</div>
		<div className="col-75">
			<button onClick={() => consultHouse(id)} className="buttonList">
				Consulter
			</button>
			<button onClick={() => deleteHouse(id)} className="buttonList suppr">
				Supprimer
			</button>
		</div>
	</div>
);

export default HouseThumbnail;
