import { createContext, useContext } from 'react';
// import axios from 'axios';

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

// const USER_API_BASE_URL = "http://localhost:8000/api/";

class AuthService{

    setTokensLocal(token){
        localStorage.setItem("token", JSON.stringify(token));
    }
    getTokensLocal(){
       return JSON.parse(localStorage.getItem("token"));
    }


    getAuthHeader() {
        return { headers: { Authorization: 'Bearer ' + this.getTokensLocal().token } };
    }

    logOut() {
        localStorage.clear();
        // return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }
}
export default new AuthService();