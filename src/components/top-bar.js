import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink, Redirect} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function TopAppBar(props) {
    const classes = useStyles();
    const isLog = props.isLog;

    function setLogOff() {
        props.handleLog(false);
    }

    function setLogOn(){
        return (<Redirect to={{ pathname: "/login", state: { referer: "" } }}/>);
    }
    console.log(isLog);
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to="/" style={{color:"white", textDecoration:"none"}} ><Button color="inherit"> Historique </Button></NavLink>
                        <NavLink to="/filtre" style={{ color: "white", textDecoration: "none" }}><Button color="inherit"> Filtre des fiches </Button></NavLink>
                        <NavLink to="/nouvelle-fiche" style={{color:"white", textDecoration:"none"}}><Button color="inherit"> Nouvelle fiche </Button></NavLink>      
                    </Typography>
                    {isLog &&<NavLink to="/signup" style={{color:"white", textDecoration:"none"}}><Button color="inherit"> Ajouter un Utilisateur </Button></NavLink>}      
                    {isLog ?
                        (<NavLink to="/logout" style={{ color: "white", textDecoration: "none" }}><Button color="inherit" onClick={setLogOff} >Deconnexion</Button></NavLink>)
                         :(<NavLink to={{pathname:"/login", state:{referer: ""}}} style={{ color: "white", textDecoration: "none" }}><Button color="inherit" onClick={setLogOn} >Se connecter</Button></NavLink>)
                         }
                </Toolbar>
            </AppBar>
            <br />
        </div>
    );
}


