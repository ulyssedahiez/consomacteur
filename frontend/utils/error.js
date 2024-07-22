import { NavLink } from "react-router-dom";

export default function Error() {

    return(
        <div className='layoutForm'>
        <div className="container">
            <div className="titleForm">
                <a>Error</a>
            </div>
            <div className='profile'>

                
                <div className="row">
                <NavLink to='/'>Revenir en lieux sûr</NavLink>
                    
                </div>
                
            </div>
        </div>
    </div>

    );
}