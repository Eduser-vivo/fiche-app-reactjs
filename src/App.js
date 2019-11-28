import React from 'react';
import TopBar from './components/top-bar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Acceuil from './components/acceuil';
import Filtre from './components/filtre';
import Form from './components/form';
import Fiche from './components/fiche';
import Edit from './components/edit';
import { AuthContext } from './auth/auth';
import Login from './components/login';
import Signup from './components/signup';



class App extends React.Component {
  constructor(){
    super()
    this.state = {
      authTokens: null
    }
  }

  render(){
    const setTokens = (data) =>{
      localStorage.setItem("tokens", JSON.stringify(data));
      this.setState({authTokens: data});
    }
    return (
      <AuthContext.Provider value={{authTokens:this.state.authTokens, setAuthTokens: setTokens}} >
        <BrowserRouter>
          <div>
            <TopBar />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/" component={Acceuil} exact />
              <PrivateRoute path="/filtre" component={Filtre} />
              <PrivateRoute path="/nouvelle-fiche" component={Form} />
              <PrivateRoute path="/fiche/:id" component={Fiche} />
              <PrivateRoute path="/edit/:id" component={Edit} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
