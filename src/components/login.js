import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../auth/auth';
import axios from 'axios';




const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Login(props) {
    const classes = useStyles();

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();


    function postLogin() {
        const url = "/fiche-app/public/index.php/api/login_check";
        axios.post(url, { username:userName, password:password })
            .then(response =>{
                if(response.status === 200){
                    setAuthTokens(response.data);
                    setLoggedIn(true);
                    console.log(response["data"]);
                    
                }else{
                    setIsError(true);
                }
            } )
            .catch(error => {setIsError(true);});
    }

    if(isLoggedIn){
        return <Redirect to="/" />;
    }

    function handleSubmit(e) {
        console.log(userName, password);
        e.preventDefault();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>

                {isError ?
                    <div className="alert alert-dismissible alert-danger" style={{ textAlign: "center"}} >
                        <strong>nom d'utilisateur ou mot de passe incorrect</strong>
                    </div> : " "
                }

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nom d'utilisateur"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={e =>{setUserName(e.target.value);}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => { setPassword(e.target.value);}}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick= {postLogin}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="">
                                Forgot password?
                             </Link>
                        </Grid>
                        <Grid item>
                            Don't have an account?
                            <Link to="/signup"> Sign UP</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
          
        </Container>
    );
}



// function Login() {
//     return (
//         <Card>
//             <Form>
//                 <Input type="email" placeholder="email" />
//                 <Input type="password" placeholder="password" />
//                 <Button>Sign In</Button>
//             </Form>
//             <Link to="/signup">Don't have an account?</Link>
//         </Card>
//     );
// }

// export default Login;