import React, {useState} from 'react'
import './Login.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import {auth } from '../database/firebase';

const useStyles = makeStyles((theme) => ({
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

function Registration() {
    const classes= useStyles();
    const history = useHistory();

    const [registrationstate, setRegistrationstate] = useState({
        username : '',
        email : '',
        password : ''
    })

    const inputChange = (e) =>{
        const {name, value} = e.target;
        setRegistrationstate({
            ...registrationstate,
            [name] : value
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(registrationstate.email, registrationstate.password)
        .then((auth) => {
            console.log(auth);
            if(auth){
                history.push('/')
                return auth.user.updateProfile({
                    displayName: registrationstate.username,
                })
            }
        }).catch(error => alert(error.message))
    }


    return (
        <div className="loginMain">
        <div className="Login">
        <h1 className="logintitle">MedManage - Registration</h1>

        <form onSubmit={onSubmit} className={classes.form} noValidate>

             {/* Email Address Input */}
            <TextField variant="outlined" margin="normal" fullWidth label="UserName"  
                name="username"
                autoComplete="username"
                value={registrationstate.username}
                onChange={inputChange}
                autoFocus
                required
            />
            
            {/* Email Address Input */}
            <TextField variant="outlined" margin="normal" fullWidth label="Email Address"  
                name="email"
                autoComplete="email"
                value={registrationstate.email}
                onChange={inputChange}
                autoFocus
                required
            />
            
            {/* Password Input */}
            <TextField variant="outlined" margin="normal"  fullWidth
                name="password"
                label="Password"
                type="password"
                value={registrationstate.password}
                onChange={inputChange}
                autoComplete="current-password"
                required
            />

            {/* SignIn Button */}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Register
            </Button>
            
            {/* Dont have an account signup */}
            <Grid container>
                <Grid item xs>
                    </Grid>
                <Grid className="loginswap" item onClick={e => history.push('/login')}>
                    {"Don't have an account? Sign Up"}
                </Grid>
            </Grid>
    </form>
    </div>
    </div>
    )
}

export default Registration
