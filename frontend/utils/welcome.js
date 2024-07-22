import { NavLink } from "react-router-dom";

export default function Welcome() {

    return(
        <div className='layoutForm'>
        <div className="container">
            <div className="titleForm">
                <a>Bienvenue ! </a>
            </div>
            <div className='profile'>

            <p>
                Bienvenue sur Consomacteur ! Nous sommes un site de gestion énergétique des habitats. 
                Nous vous aidons à réduire votre consommation d'énergie et 
                à réaliser des économies sur vos factures tout en protégeant l'environnement. Sur notre plateforme, 
                vous trouverez des outils et des ressources pour améliorer l'efficacité énergétique de 
                votre maison ou de votre appartement.

            </p>
                
                <div className="row">
                <NavLink to='/'>C'est parti</NavLink>
                    
                </div>
                
            </div>
        </div>
    </div>

    );
}