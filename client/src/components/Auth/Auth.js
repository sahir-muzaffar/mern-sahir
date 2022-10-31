import React, { useState } from 'react'
import { Typography, Avatar, Button, Paper, Grid, Container } from "@material-ui/core";
import { GoogleLogin} from "@react-oauth/google";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import jwt_decode from "jwt-decode"
import useStyles from "./style";
import Input from './Input';
import { useDispatch } from 'react-redux';
import { signin, signup } from "../../actions/auth"


const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUP, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUP) {
            dispatch(signup(formData, history));
        }
        else {
            dispatch(signin(formData, history));
        }

    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const switchMode = () => {
        setIsSignup((previsSignUp) => !previsSignUp)
        setShowPassword(false)

    }


    const createOrGetUser = async (response) => {
        const result = jwt_decode(response.credential);

        const { name, sub, picture } = result;
        const user = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }

        const token = result.sub;


        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');

        } catch (error) {
            console.log(error);

        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUP ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={(e) => { handleSubmit(e) }}>
                    <Grid container spacing={2}>
                        {
                            isSignUP && (
                                <>
                                    <Input name="firstName" label="First name" handleChange={(e) => { handleChange(e) }} autoFocus half />
                                    <Input name="lastName" label="Last name" handleChange={(e) => { handleChange(e) }} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email address" handleChange={(e) => { handleChange(e) }} type="email" />
                        <Input name="password" label="password" handleChange={(e) => { handleChange(e) }} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUP && <Input name="confirmPassword" label="Repeat Password" handleChange={(e) => { handleChange(e) }} type="password" />}
                    </Grid>
                    <GoogleLogin onSuccess={(response) => {


                        createOrGetUser(response)
                    }} onError={() => {
                        console.log("error");
                    }} />
                    <Button type="submit" className={classes.submit} fullWidth variant='contained' color="primary">
                        {isSignUP ? "SignUp" : "SignIn"}
                    </Button>

                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUP ? "Already have an account?Sign In" : "Don't have an account?Sign Up"}
                            </Button>


                        </Grid>

                    </Grid>


                </form>

            </Paper>

        </Container>
    )
}

export default Auth