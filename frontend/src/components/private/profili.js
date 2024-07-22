import { useNavigate } from 'react-router-dom';
import '../../../css/member.css';
import { accountService } from '../../services/account.service';
import { useRecoilState } from 'recoil';
import { loginState } from '../atoms/login';
import React, { useEffect, useState } from 'react';

export default function Profili() {
	const navigate = useNavigate();
	const [b, setN] = useRecoilState(loginState);
	const [user, setUser] = useState({});

	const handleLogout = () => {
		setN(false);
		accountService.logout();

		navigate('/');
	};

	useEffect(() => {
		accountService
			.getProfile()
			.then(res => {
				const d = new Date(res.data.user.createdAt);
				//res.data.user.createdAt = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} à ${d.getHours()}h${d.getMinutes()}`
				setUser(res.data.user);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<div className="layoutForm">
			<div className="container">
				<div className="titleForm">
					<a>Profile</a>
				</div>
				<div className="profile">
					<div className="row">
						<div className="col-25">
							<label htmlFor="lastName">Nom </label>
						</div>
						<div className="col-75">
							<p>{user.firstName}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label htmlFor="firstName">Prénom </label>
						</div>
						<div className="col-75">
							<p>{user.lastName}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label htmlFor="email">Email </label>
						</div>
						<div className="col-75">
							<p>{user.email}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label htmlFor="email">Date création du compte </label>
						</div>
						<div className="col-75">
							<p>{user.createdAt}</p>
						</div>
					</div>

					<div className="row">
						<button className="deconnexion" onClick={handleLogout}>
							Deconnexion
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
