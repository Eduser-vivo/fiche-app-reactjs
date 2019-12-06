import React from 'react';
import TopBar from './components/top-bar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './auth/auth';
import './App.css';
import Acceuil from './components/acceuil';
import Filtre from './components/filtre';
import Form from './components/form';
import Fiche from './components/fiche';
import Edit from './components/edit';
import Login from './components/login';
import Signup from './components/signup';
import AuthService from './auth/auth';
import Logout from './components/logout';
import PdfFiche from './components/pdfFiche';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      authTokens: AuthService.getTokensLocal(),
      isLog :AuthService.getLogLocal(),
    }
    this.checkLog = this.checkLog.bind(this);
  }
  
  checkLog() {
    const joker = AuthService.getTokensLocal();
    this.setState({ authTokens: joker });
    if (joker === null) {
      this.setState({ isLog: false });
    } else if (joker !== null) {
        this.setState({ isLog: true });
    }
  }

  componentDidMount(){
    this.checkLog();
  }
  
  handleLogOff(log) {
    this.setState({ isLog: log });
    AuthService.logOut();
    this.checkLog();
  }
  handleLogOn(log) {
    this.setState({ isLog: log });
    this.checkLog();
  }
  render(){
    const setTokens = (data) =>{
      this.setState({ authTokens: data});
    } 
    const authJoker = this.state.authTokens;
    const isLog = this.state.isLog;
    console.log(isLog);
    
    return (
      <AuthContext.Provider value={{ authTokens: authJoker, setAuthTokens: setTokens}} >
        <BrowserRouter>
          <div>
               <TopBar isLog={isLog} handleLog = {this.handleLogOff.bind(this)} />
            <Switch>
              <PrivateRoute path="/signup" component={Signup} exact />
              <PrivateRoute path="/" component={Acceuil} exact isAuth={this.handleLogOn.bind(this)} />} />
              <PrivateRoute path="/filtre" component={Filtre} exact isAuth={this.handleLogOn.bind(this)}/>
              <PrivateRoute path="/nouvelle-fiche" component={Form} exact isAuth={this.handleLogOn.bind(this)}/>
              <PrivateRoute path="/fiche/:id" component={Fiche} exact isAuth={this.handleLogOn.bind(this)} />
              <PrivateRoute path="/edit/:id" component={Edit} exact isAuth={this.handleLogOn.bind(this)}/>
              <Route path="/login" render={(props) => <Login {...props} isAuth={this.handleLogOn.bind(this)}/>} exact />
              <Route path="/logout" component={Logout} exact />
              <Route path="/print" component={PdfFiche} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}
export default App;
