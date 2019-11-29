import { createContext, useContext } from 'react';
// import { useState } from 'react';
// import axios from 'axios';
// import jwt from 'jwt-decode';

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

const API_BASE_URL = "http://localhost:8000/api/";


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

    getFiche(){
        return API_BASE_URL +"fiches";
    }

    getLogin(){
        return API_BASE_URL +"login_check";
    }

    setUserLocal(userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(userInfo);
        
    }
    getUserId() {
       const user = JSON.parse(localStorage.getItem("userInfo"));
       const username = user.username;
       const userid = user.id;
       const password = user.password;
        return { userid, username, password};
    }

}
export default new AuthService();