import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import PostDetails from './components/PostDetails/PostDetails';




const App = () => {
 



  const user =JSON.parse(localStorage.getItem('profile'));
  

  return (
    <GoogleOAuthProvider clientId= '335022905588-vk5pl9hvlvr1j7jau5f0384m4c49ssag.apps.googleusercontent.com'>
      <BrowserRouter>

        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path='/' exact component={()=><Redirect to="/posts"/>} />
            <Route path="/posts" exact component={Home}/>
            <Route path="/posts/search" exact component={Home}/>
            <Route path="/posts/:id" component={PostDetails}/>
            <Route path='/auth' exact component= {Auth}/>
          </Switch>


        </Container>
      </BrowserRouter>

    </GoogleOAuthProvider>

  );
};

export default App;
