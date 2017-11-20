import React, { Component } from 'react';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
import { StyleSheet, Text, View, TextInput, WebView } from 'react-native';
import { Container, Content, Form, Item, Label, Button } from 'native-base';
import FBSDK, { LoginButton, LoginManager } from 'react-native-fbsdk';

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

  // <Link to='/login'>LOG IN</Link>

  render() {
    return (
      <View>
      <Text>In Signup.js</Text>
      {this.state.signupSuccess &&
        <Redirect to='/home' />
      }
      {!this.state.signupSuccess &&
        <View class="signup auth">
            <Text class="signupTitle authTitle">SIGN UP</Text>
            <View class="signupFormItemLine authFormItem">
              <TextInput class="authInput" name="fname" value={this.state.fname} placeholder='First name' onChangeText={(fname) => this.setState({fname, signUpError: false})} />
              <TextInput class="authInput" name="lname" value={this.state.lname} placeholder='Last name' onChangeText={(lname) => this.setState({lname, signUpError: false})} />
              <TextInput class="authInput" name="email" value={this.state.email} placeholder='E-mail' onChangeText={(email) => this.setState({email, signUpError: false})} />
              <TextInput class="authInput" name="username" value={this.state.username} placeholder='Username' onChangeText={(username) => this.setState({username, signUpError: false})} />
              <TextInput class="authInput" name="picture" value={this.state.picture} placeholder='Picture url' onChangeText={(picture) => this.setState({picture, signUpError: false})} />
              <TextInput class="authInput" secureTextEntry='true' value={this.state.password} placeholder='Password' onChangeText={(password) => this.setState({password, signUpError: false})} />
              <TextInput class="authInput" secureTextEntry='true' value={this.state.password_confirmation} placeholder='Password confirmation' onChangeText={(password_confirmation) => this.setState({password_confirmation, signUpError: false})} />
              {this.state.signUpError &&
                <Text class="errorAuth">{this.state.signUpError}</Text>
              }
              <Text class="goButton" onPress={this.signup}>Go</Text>
            </View>
        </View>
      }
      </View>
    );
  }
}

export default Signup;
