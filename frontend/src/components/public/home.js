import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../css/home.css';

export default class Home extends React.Component {
	render() {
		return (
			<div className="container">
				<div>
					<h1 className="titleForm">Acceuil </h1>
					<div className="offerContainer">
						<h2 className="titleHome">Bienvenue sur Consommacteur</h2>
						<div id="textPresentation">
							<p>
								Bienvenue sur Consommacteur, le site de gestion de la
								consommation d'énergie ! Nous sommes convaincus que chacun peut
								agir pour préserver notre planète. C'est pourquoi nous avons
								créé une plateforme simple et intuitive pour vous aider à mieux
								comprendre et maîtriser votre consommation d'énergie.
							</p>
							<div className="image"></div>
							<br />
							<p>
								Notre solution repose sur des capteurs que vous pouvez installer
								chez vous, dans vos maisons et vos pièces. Ces capteurs envoient
								des données en temps réel sur notre site, ce qui vous permet de
								visualiser votre consommation d'énergie en direct. Vous pouvez
								ainsi suivre l'évolution de votre consommation, identifier les
								équipements les plus gourmands en énergie, et prendre les
								mesures nécessaires pour réduire votre consommation.
							</p>
							<br />
							<p>
								Sur Consommacteur, vous pouvez créer des maisons et des pièces,
								et y ajouter vos capteurs en quelques clics. Vous pouvez
								également consulter des statistiques détaillées sur votre
								consommation d'énergie, et comparer votre consommation à celle
								d'autres utilisateurs ayant des équipements similaires.
							</p>
							<br />
							<p>
								Notre objectif est de rendre la gestion de votre consommation
								d'énergie facile et accessible à tous. Nous espérons ainsi
								contribuer à la lutte contre le changement climatique, et
								préserver notre planète pour les générations futures.
							</p>
							<br />
							<p>
								Rejoignez-nous dès maintenant sur Consommacteur, et devenez un
								acteur de la transition énergétique !
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// import React, { useState, useEffect } from 'react';

// export default function dashbooard() {
// 	const [houses, setHouses] = useState([]);

// 	useEffect(() => {
// 		const fetchHouses = async () => {
// 			const myHeaders = new Headers();
// 			myHeaders.append(
// 				'Authorization',
// 				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxNDUyMTEzfQ.ErsVuYhENtrDY9eQn24mxuYXFufNiUWGUQh8EnEBHlU'
// 			);
// 			const requestOptions = {
// 				method: 'GET',
// 				headers: myHeaders,
// 				redirect: 'follow',
// 			};
// 			try {
// 				const response = await fetch(
// 					'http://localhost:3000/houses',
// 					requestOptions
// 				);
// 				const data = await response.json();
// 				setHouses(data);
// 			} catch (error) {
// 				console.log('error', error);
// 			}
// 		};
// 		fetchHouses();
// 	}, []);

// 	return (
// 		<div>
// 			{houses.map(house => (
// 				<div key={house.id}>
// 					<h2>{house.name}</h2>
// 				</div>
// 			))}
// 		</div>
// 	);
// }
