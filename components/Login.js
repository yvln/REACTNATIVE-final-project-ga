import React, { Component } from 'react';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
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
      <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../images/RV-lisbon.jpeg')}>

          {this.state.loginSuccess &&
              <Redirect to='/home' />
          }
          {!this.state.loginSuccess &&
            <View style={styles.loginContainer}>
              <View style={styles.login}>
                  <View style={styles.loginChild}><Image style={styles.nameApp} source={require('../images/logo.png')} /></View>
                  <View style={styles.loginChild}><Text style={styles.loginTitle}>LOG IN</Text></View>
                  <View style={styles.loginChild}><TextInput style={styles.authInput} value={this.state.email} placeholder='E-mail' onChangeText={(email) => this.setState({email, loginError: false})}/></View>
                  <View style={styles.loginChild}><TextInput style={styles.authInput} secureTextEntry='true' value={this.state.password} placeholder='Password' onChangeText={(password) => this.setState({password, loginError: false})}/></View>
                  {this.state.loginError &&
                    <View style={styles.loginChild}><Text style={styles.errorAuth}>{this.state.loginError}</Text></View>
                  }
                  <View style={styles.goButtonContainer}><Text style={styles.goButton} onPress={this.login}>Go</Text></View>
                  <Link to='/signup'><Text style={styles.link}>SIGN UP</Text></Link>
              </View>
            </View>
          }

      </Image>
      </View>
    )
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 450,
    height: 500
  },
  login: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 500
  },
  nameApp: {
    width: 150,
    height: 150,
    paddingBottom: 50
  },
  loginTitle: {
    textAlign: 'center',
    padding: 10,
    margin: 10,
    fontSize: 25,
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold'
  },
  authInput: {
    padding: 5,
    margin: 5
  },
  errorAuth: {
    padding: 5,
    margin: 5,
    color: 'red'
  },
  goButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  goButton: {
    width: 70,
    height: 70,
    borderRadius: 4,
    fontSize: 25,
    backgroundColor: 'pink',
    color: 'white',
    textAlign: 'center'
  }
});
