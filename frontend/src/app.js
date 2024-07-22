import { createRoot } from 'react-dom/client';

import Menu from './menu';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/public/home';
import Offers from './components/public/offers';
import Contacts from './components/public/contacts';
import Connexion from './components/public/connexion';
import Inscription from './components/public/inscription';
import AuthGard from './_helpers/AuthGuard';
import PrivateRouter from './components/private/PrivateRouter';
import {RecoilRoot} from 'recoil'
import Error from '../utils/error';
import Welcome from '../utils/welcome';

const root = createRoot(document.querySelector('.appContainer'));
root.render(
	<>
		<RecoilRoot>
			<BrowserRouter>
				<Menu/>
				<Routes>
					<Route path="/" element={<Home/>} />

					<Route path="/conn/*" element={
						<AuthGard>
							<PrivateRouter/>
						</AuthGard>
					}/>

					<Route path="/offers" element={<Offers/>} />
					<Route path="/contact" element={<Contacts/>} />

					<Route path="/connexion" element={<Connexion/>} />

					<Route path="/inscription" element={<Inscription/>} />

					
					<Route path="/welcome" element={<Welcome/>}/>
					<Route path="/*" element={<Error/>}/>
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
</>
);
