import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Paper,
  Typography,
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { GoogleLogin } from "react-google-login";
import useStyle from "./style";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import Icon from "./Icon.js";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "../actions/auth";

// const clientId = "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";
const initialState ={firstName:"",lastName:"",email:"",password:"",confirmPassword:""};

const Auth = () => {
  const classes = useStyle();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  

    if(isSignUp){
      dispatch(signUp(formData,history))
    }else{
      dispatch(signIn(formData, history))
    }

  };

  const googleError = () =>{
    alert("Google SignIn Was UnSuccessful Please Try Agein Later");
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
   };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };


    const googleSuccess = async (response) => {
      const result = response?.profileObj;
      const token = response?.tokenId;

      try {
        dispatch({ type: 'AUTH', data: { result,token }})
        history.push("/");
      } catch (error) {
        console.log(error);
      }

    }

    const googleFailure = (error) => {
      console.log(error);
      // handle failed authentication response here
    }
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Grid item xs={12} sm={6}>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                    variant="outlined"
                  />
                </Grid>
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <GoogleLogin
            clientId="707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            isSignedIn={true}
            uxMode="popup"
            cookiePolicy={'single_host_origin'}
          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
