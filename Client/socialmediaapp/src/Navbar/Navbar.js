import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@material-ui/core";
import useStyle from './style';
import memories from '../images/memories.png';
import decocode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useHistory,useLocation } from "react-router-dom/cjs/react-router-dom.min";


const Navbar = () => {
    const classes = useStyle();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
    const token = user?.token;

    if(token){
        const decocodeToken = decocode(token);
        if(decocodeToken.exp * 1000 <new Date().getTime()){
            logout();
        }
    }
    
     setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const logout = () =>{
      dispatch({type:'LOGOUT'});
       history.push('/');
       setUser(null);

    }
    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/"  className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height={60} />
           </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>User</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                )}
            </Toolbar>

        </AppBar>
       
    )
}

export default Navbar;