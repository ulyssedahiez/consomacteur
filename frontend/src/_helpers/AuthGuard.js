import { Navigate } from "react-router-dom";
import { accountService } from "../services/account.service";
const AuthGard = ({children}) => {
    
    if(accountService.isLogged()){
        return children;
    } else {
        return <Navigate to="/connexion"/>;
    }
};

export default AuthGard;
