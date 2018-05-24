import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';
import {TwitterLoginButton} from 'react-social-login-buttons';

const cardStyle = {width: '20%', margin: 'auto', marginTop:'1%'};
const defaultStyle = {
    top: null,
    left: null,
    right: null,
    bottom: null,
    border: '0px',
    background: '0px',
    borderRadius: null,
    padding: null,
    position: null,
    width: '100%',
    margin: 'auto'
};

class Login extends Component {
   constructor() {
       super();
   }
   login = async() => {
       const response = await fetch('/auth/twitter');
       const body = await response.json();

       return body;
   };
   render() {
      return (
          <div>
            <Card style={cardStyle}>
              <CardTitle subtitle="ログイン/登録"/>    
                <TwitterLoginButton onClick={()=>window.location.href="http://localhost:5000/auth/twitter"}/>
              <CardActions>
              </CardActions>
            </Card>
          </div>
      );
   }
}
export default Login;
