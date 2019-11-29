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
import AuthService from './auth/auth';
import Logout from './components/logout';


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      authTokens: null,
      isLog :false,
    }
  }

  UNSAFE_componentWillMount(){
    const joker = AuthService.getTokensLocal();
    this.setState({ authTokens: joker });
    if(joker === null){
      this.setState({isLog: false});
    }else if(joker !== null ){
      this.setState({isLog : true});
    }
  }

  render(){
    const setTokens = (data) =>{
      this.setState({ authTokens: data});
    } 
    const authJoker = this.state.authTokens;
    console.log(authJoker); 
    const isLog = this.state.isLog;
    return (
      <AuthContext.Provider value={{ authTokens: authJoker, setAuthTokens: setTokens}} >
        <BrowserRouter>
          <div>
            <TopBar isLog={isLog} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
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
