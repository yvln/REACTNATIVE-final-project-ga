import React, { Component } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import axios from 'axios';

class UserProfile extends Component {
  constructor(props){
    super(props);

    this.state = {
      picture: "",
      pictureForm: false,
      username: "",
      usernameForm: false,
      fname: "",
      fnameForm: false,
      lname: "",
      lnameForm: false
    }

    this.changeOnDb = this.changeOnDb.bind(this);
    this.getInfoUser = this.getInfoUser.bind(this);
  }

  componentDidMount() {
    this.getInfoUser();
  }

  getInfoUser() {
    this.props.updateUserInfo(this.props.user.id);
    this.setState({
      picture: this.props.user.picture,
      username: this.props.user.username,
      fname: this.props.user.fname,
      lname: this.props.user.lname
    })
  }

  changeOnDb(e) {
    e.preventDefault();
    fetch(`${this.props.url}/userchanges`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        picture: this.state.picture,
        username: this.state.username,
        fname: this.state.fname,
        lname: this.state.lname
      })
    }).then( res => {
      this.getInfoUser();
      this.setState({
        pictureForm: false,
        usernameForm: false,
        fnameForm: false,
        lnameForm: false,
        picture: JSON.parse(res._bodyInit).picture,
        username: JSON.parse(res._bodyInit).username,
        fname: JSON.parse(res._bodyInit).fname,
        lname: JSON.parse(res._bodyInit).lname
      })
    })
  }

  makeAppear(item) {
    if (!this.state[item]) {
      this.setState({
        [item]: true
      })
    } else {
      this.setState({
        [item]: false
      })
    }
  }

  // <View class='profilePicView' onPress={() => {this.makeAppear('pictureForm')}}>
  //   <Image class='displayBigProfilPic' source={{uri: `${this.state.picture}`}} alt="Add Profile Picture"/>
  // </View>

  render() {
    return (
      <View class="UserProfile">

        <View class="UserProfileContainer">

          <Text class='labelUserProfileStatic LevelUserProfile'>Level {this.props.user.level}</Text>
          <Text class='labelUserProfileStatic RegisUserProfile'>Registration date {this.props.user.date_registr.substring(0,10)}</Text>



            <View class={this.state.pictureForm ? 'yes' : 'no'}>
                <TextInput name="picture" value={this.state.picture} onChangeText={(picture) => this.setState({picture})} placeholder="image url" />
                <Text class="ok" onPress={this.changeOnDb}>OK</Text>
            </View>

          <Text class='labelUserProfile' onPress={() => {this.makeAppear('usernameForm')}}>Username</Text>
              {!this.state.usernameForm &&
                <View class="TextDisplayUserProfile">
                  <Text>{this.state.username}</Text>
                </View>
              }
              {this.state.usernameForm &&
                <View class="TextInputUserProfile">
                  <TextInput name="username" value={this.state.username} onChangeText={(username) => this.setState({username})} />
                  <Text class="ok" onPress={this.changeOnDb}>OK</Text>
                </View>
              }

          <Text class='labelUserProfile' onPress={() => {this.makeAppear('fnameForm')}}>First name</Text>
              {!this.state.fnameForm &&
                <View class="TextDisplayUserProfile">
                  <Text>{this.state.fname}</Text>
                </View>
              }
              {this.state.fnameForm &&
                <View class="TextInputUserProfile">
                  <TextInput name="fname" value={this.state.fname} onChangeText={(fname) => this.setState({fname})} />
                  <Text class="ok" onPress={this.changeOnDb}>OK</Text>
                </View>
              }

          <Text class='labelUserProfile' onPress={() => {this.makeAppear('lnameForm')}}>Last name</Text>
              {!this.state.lnameForm &&
                <View class="TextDisplayUserProfile">
                  <Text>{this.state.lname}</Text>
                </View>
              }
              {this.state.lnameForm &&
                <View class="TextInputUserProfile">
                  <TextInput name="lname" value={this.state.lname} onChangeText={(lname) => this.setState({lname})} />
                  <Text class="ok" onPress={this.changeOnDb}>OK</Text>
                </View>
              }




        </View>

      </View>
    );
  }
}

// <Link to='/home'>Home</Link>


export default UserProfile;
