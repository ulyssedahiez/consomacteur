import { accountService } from "../../services/account.service"
import { atom } from "recoil"

export const loginState = atom({
    key : 'login-state',
    default : accountService.isLogged()
    
})