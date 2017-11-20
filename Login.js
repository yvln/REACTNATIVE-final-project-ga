import React, { Component } from 'react';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Content, Form, Item, Label, Button } from 'native-base';
// import FBSDK, { LoginButton, LoginManager } from 'react-native-fbsdk';
// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton, LoginManager
// } = FBSDK;

import axios from 'axios';

// class LoginFB extends Component {
//   render() {
//     return (
//       <View>
//         <LoginButton
//           publishPermissions={["publish_actions"]}
//           onLoginFinished={
//             (error, result) => {
//               if (error) {
//                 alert("Login failed with error: " + result.error);
//               } else if (result.isCancelled) {
//                 alert("Login was cancelled");
//               } else {
//                 alert("Login was successful with permissions: " + result.grantedPermissions)
//               }
//             }
//           }
//           onLogoutFinished={() => alert("User logged out")}/>
//       </View>
//     )
//   }
// }

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginSuccess: false,
      loginError: false
    }

    this.login = this.login.bind(this);
  }

  // componentDidMount() {

  //   window.fbAsyncInit = function() {
  //     window.FB.init({
  //       appId      : '153252831439424',
  //       xfbml      : true,
  //       version    : 'v2.11'
  //     });
  //     window.FB.AppEvents.logPageView();
  //     window.FB.getLoginStatus();
  // };
  //
  //   (function(d, s, id){
  //      var js, fjs = d.getElementsByTagName(s)[0];
  //      if (d.getElementById(id)) {return;}
  //      js = d.createElement(s); js.id = id;
  //      js.src = "https://connect.facebook.net/en_US/sdk.js";
  //      fjs.parentNode.insertBefore(js, fjs);
  //    }(document, 'script', 'facebook-jssdk'));
  // }

  login(e) {
    e.preventDefault();
    fetch(`${this.props.url}/login`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
      .then( (res) => {
        this.props.setUser(JSON.parse(res._bodyInit));
        this.setState({
          loginSuccess: true
        })
      }).catch( (err) => {
        this.setState({
          loginError: 'Email or Password incorrect'
        });
      })
  }


  // <Link to='/signup'>SIGN UP</Link>

  // <LoginFB />

  render() {
    return (
      <View>
        <Text>In Login.js</Text>
        {this.state.loginSuccess &&
            <Redirect to='/home' />
        }
        {!this.state.loginSuccess &&
          <View class="login auth">
              <View class="loginContainer authContainer">
                <View class="nameApp"></View>
                <Text class="loginTitle authTitle">LOG IN</Text>
                <TextInput class="authInput" name="email" value={this.state.email} placeholder='E-mail' onChangeText={(email) => this.setState({email, loginError: false})}/>
                <TextInput class="authInput" secureTextEntry='true' name="password" value={this.state.password} placeholder='Password' onChangeText={(password) => this.setState({password, loginError: false})}/>
                {this.state.loginError &&
                  <Text class="errorAuth">{this.state.loginError}</Text>
                }
                <Text class="goButton" onPress={this.login}>Go</Text>
              </View>
          </View>
        }
      </View>
    )
  }
}

export default Login;
