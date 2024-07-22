import { useState } from "react"
import { NavLink } from "react-router-dom";

import '../css/header.css'

import { useRecoilValue } from "recoil";
import { loginState } from "./components/atoms/login";

import dashboard from './img/icons/dashboard.png';
import home from './img/icons/home.png';
import place from './img/icons/place.png';
import idea from'./img/icons/idea.png';
import admin from'./img/icons/admin.png'
import offer from './img/icons/offer.png';
import contact from './img/icons/contact.png';
import userLogin from './img/icons/user-login.png';
import userLogout from'./img/icons/user-logout.png'

export default function Menu() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const StateLogin= useRecoilValue(loginState)

//https://icons8.com/icon/set/popular/ios      library icons


  return (
    <nav className="navigation">
      <p href="/" className="brand-name">
        Consommacteur
      </p>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {
		
		<svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>

		}
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
        >
        
          <li>
          
          <div className="espMem">
            <NavLink to={"/"}>
              <button type="button">
                <p><img className="fit-picture" src={home}/>Acceuil</p>
                </button>
                </NavLink>
            </div>
          </li>
         
          {StateLogin && <>
          <li>
          
          <div className="espMem">
            <NavLink to="/conn/dashboard">
              
            <button type="button">
              
              <p><img className="fit-picture" src={dashboard}/>Tableau de bord</p>
              </button>
              </NavLink>
            </div>
          </li>
          <li>

          <div className="espMem">
            <NavLink to="/conn/places">
            
              <button type="button">
              
                <p><img className="fit-picture" src={place}/>Mes places</p>
                </button>
              
              </NavLink>
            </div>
          </li>
          <li>
          
          <div className="espMem">
            <NavLink to="/conn/suggestions">
            
              <button type="button" disabled>
              
                <p><img className="fit-picture" src={idea}/>Mes suggestions</p>
                </button>
              
              </NavLink>
            </div>
        </li>
        <li>
          
          <div className="espMem">
            <NavLink to="/conn/admin">
            
              <button type="button">
              
                <p><img className="fit-picture" src={admin}/>Administration</p>
                </button>
              
              </NavLink>
            </div>
        </li>
</>}
          


          <li>
      
      <div className="espMem">
            <NavLink to="/offers">
            
              <button type="button">
                <p><img className="fit-picture" src={offer}/>Nos offres</p>
                </button>
              
              </NavLink>
            </div>
          </li>
          
		  
		  <li>
      
      <div className="espMem">
            <NavLink to="/contact">
            
              <button type="button">
                <p><img className="fit-picture" src={contact}/>Nous contacter</p>
                </button>
              
              </NavLink>
            </div>
          </li>
          
		  <li>
      {StateLogin ? 
      
          <>
          <div className="espMem">
            <NavLink to="/conn/profile">
            
              <button type="button">
              
                <p><img className="fit-picture" src={userLogin}/>Espace Membre</p>
              </button>
              </NavLink> 
          </div>
          </>
          :
          <>
          
          <div className="espMem">
          
            <NavLink to="/connexion">
              <button type="button">
            
              <p><img className="fit-picture" src={userLogout}/>Espace Membre</p>
              </button>
              </NavLink> 
          </div>
          
          
          </>

        }
        </li>
        
        </ul>
      </div>
    </nav>
  );
}