import React, { Component } from 'react';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
// import FBSDK, { LoginButton, LoginManager } from 'react-native-fbsdk';

import Home from './Home';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      email: '',
      username: '',
      picture: '',
      password: '',
      password_confirmation: '',
      signupSuccess: false,
      signUpError: false
    }

    this.signup = this.signup.bind(this);
  }

  signup(e) {
    e.preventDefault();
    fetch(`${this.props.url}/signup`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          email: this.state.email,
          username: this.state.username,
          picture: this.state.picture,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        })
      })
      .then( (res) => {
        console.log("SIGN UP SUCCEED");
        this.props.setUser(JSON.parse(res._bodyInit), false);
        this.setState({
          signupSuccess: true
        })
      }).catch( (err) => {
        this.setState({
          signUpError: 'All field are required'
        });
      })
  }


  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../images/RV-orvieto.jpeg')}>

          {this.state.signupSuccess &&
            <Redirect to='/home' />
          }
          {!this.state.signupSuccess &&
            <View style={styles.signupContainer}>
                <View style={styles.signup}>
                    <View style={styles.signupChild}><Image style={styles.nameApp}source={require('../images/logo.png')} /></View>
                    <View style={styles.signupChild}><Text style={styles.signupTitle}>SIGN UP</Text></View>
                    <View style={styles.signupChild}><TextInput TextInput style={styles.authInput} value={this.state.fname} placeholder='First name' onChangeText={(fname) => this.setState({fname, signUpError: false})} /></View>
                    <View style={styles.signupChild}><TextInput TextInput style={styles.authInput} value={this.state.lname} placeholder='Last name' onChangeText={(lname) => this.setState({lname, signUpError: false})} /></View>
                    <View style={styles.signupChild}><TextInput TextInput style={styles.authInput} value={this.state.email} placeholder='E-mail' onChangeText={(email) => this.setState({email, signUpError: false})} /></View>
                    <View style={styles.signupChild}><TextInput TextInput style={styles.authInput} value={this.state.username} placeholder='Username' onChangeText={(username) => this.setState({username, signUpError: false})} /></View>
                    <View style={styles.signupChild}><TextInput TextInput style={styles.authInput} value={this.state.picture} placeholder='Picture url' onChangeText={(picture) => this.setState({picture, signUpError: false})} /></View>
                    <View style={styles.signupChild}><TextInput TextInput style={styles.authInput} secureTextEntry='true' value={this.state.password} placeholder='Password' onChangeText={(password) => this.setState({password, signUpError: false})} /></View>
                    <View style={styles.signupChild}><TextInput TextInput style={styles.authInput} secureTextEntry='true' value={this.state.password_confirmation} placeholder='Password confirmation' onChangeText={(password_confirmation) => this.setState({password_confirmation, signUpError: false})} /></View>
                    {this.state.signUpError &&
                      <View style={styles.signupChild}><Text style={styles.errorAuth}>{this.state.signUpError}</Text></View>
                    }
                    <View style={styles.goButtonContainer}><Text style={styles.goButton} onPress={this.signup}>Go</Text></View>
                    <Link to='/'><Text style={styles.link}>LOG IN</Text></Link>
                </View>
            </View>
          }

      </Image>
      </View>
    );
  }
}

export default Signup;

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
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 450,
    height: 500
  },
  signup: {
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
  signupTitle: {
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
  },
  link: {

  }
});
