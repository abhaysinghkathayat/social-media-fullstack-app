import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {  Router, Switch, Route, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './Navbar/Navbar.js';
import Home from "./Home/Home.js";
import Auth from './auth/Auth.js';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import PostDetails from './Postdetails/Postdetails';




const App = () =>{
 const user = JSON.parse(localStorage.getItem("profile"));

    return(
    <BrowserRouter>
        <Container maxidth='lg'>
            <Navbar/>
                <Switch> 
                  <Route path="/" exact component={()=><Redirect to="/posts"/>} ></Route>
                  <Route path="/posts" exact component={Home}></Route>
                  <Route path="/posts/search" exact component={Home}/>
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" component={Auth} />
                    {/* <Route path="/auth" exact component={!user ? <Auth/> :<Redirect to="/posts" />}/> */}
             </Switch>
        </Container>
    </BrowserRouter>
    )

}

export default App;


 
