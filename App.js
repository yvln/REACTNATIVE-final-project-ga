import React, { Component } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native'
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';

import axios from 'axios';

import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import Home from './components/Home';
import Gameview from './components/Gameview';

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest}
        render={ props => (
          <Component {...props}
              user={this.props.isAuthenticated}
              logout={this.props.logout}
              url={this.props.url}
              initializeDay={this.props.initializeDay}
              // updateUserInfo={this.props.updateUserInfo}
              games={this.props.games}
              whichGameClicked={this.props.whichGameClicked}
              whichGame={this.props.whichGame}
              // isNextLevel={this.props.isNextLevel}
              // next_level={this.props.next_level}
              // lessTry={this.props.lessTry}
              // nbTryGame={this.props.nbTryGame}
              // scoreData={this.props.scoreData}
              // winGame={this.props.winGame}
              // updateLastPlay={this.props.updateLastPlay}
              //
              />
            )} />
      )
  }
}

export default class App extends Component {

  url = 'https://be-eurself.herokuapp.com';

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      games: [],
      whichGame: {},
      isNextLevel: false,
      nbTryGame: null,
      scoreData: [],
      winGame: false,
      last_try: null
    }

    this.setUser = this.setUser.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.logout = this.logout.bind(this);

    this.getGames = this.getGames.bind(this);
    this.initializeDay = this.initializeDay.bind(this);
    this.whichGameClicked = this.whichGameClicked.bind(this);

    // this.updateUserInfo = this.updateUserInfo.bind(this);
    // this.updateLastPlay = this.updateLastPlay.bind(this);
    // this.isNextLevel = this.isNextLevel.bind(this);
    // this.lessTry = this.lessTry.bind(this);
  }

  componentDidMount() {
    this.getGames();
  }

  setUser(user, isFb){
    this.isFb = isFb;
    this.setState({
      user: user,
      nbTryGame: user.number_try_game
    });
  }

  isAuthenticated() {
    return this.state.user;
  }

  logout(user, isFb) {
    console.log('IN LOGOUT');
    // if (this.isFb) {
    //   window.FB.logout();
    // }
    // this.setState({
    //   user: null
    // })
  }

  getGames() {
    return fetch(`${this.url}/games`)
      .then( (response) => {
        this.setState({
          games: JSON.parse(response._bodyInit).allGames
        })
    }).catch(err => {console.log('err', err)});
  }

  initializeDay() {
    let getToday = '';
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    const day = new Date().getDate();
    getToday = `${year}-${month}-${day}`;
    if (this.state.user.last_try !== null) {
      if (this.state.user.last_try !== getToday) {
        fetch(`${this.url}/games/newDay`, {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.user.id
          })
        }).then( res => {
          this.setState({
            nbTryGame: JSON.parse(res._bodyInit).number_try_game
          })
        })
      }
    }
    // this.updateUserInfo(this.state.user.id);
  }

  whichGameClicked(game) {
    this.setState({
      whichGame: game
    })
  }

  // updateUserInfo(id) {
  //   axios.get(`${this.url}/userinfo/${id}`)
  //   .then( res => {
  //     const userDataScore = [];
  //     for (let i = 1 ; i <= 6 ; i++ ) {
  //       userDataScore.push(res.data.data[`max_score_game_${i}`])
  //     }
  //     this.setState({
  //       scoreData: userDataScore,
  //       user: res.data.data
  //     })
  //   })
  // }
  //
  // isNextLevel(score, user_id) {
  //   axios.post(`${this.url}/games/updateMaxScore`, {
  //     user_id: this.state.user.id,
  //     score: score,
  //     game_id: this.state.whichGame.id
  //   }).then( res => {
  //     this.updateUserInfo(user_id);
  //     let next_level = true;
  //     for (let i = 1 ; i <= 6 ; i++ ) {
  //       if (this.state.user[`max_score_game_${i}`] !== this.state.games[`${i-1}`][`points_to_reach_level_${this.state.user.level}`]) {
  //         next_level = false;
  //       }
  //     }
  //     if (next_level === true) {
  //       this.setState({
  //         next_level: true
  //       });
  //       if (this.state.user.level + 1 < 4) {
  //         this.setState({
  //           winGame: true
  //         });
  //       } else {
  //         axios.post(`${this.url}/games/updateLevel`, {
  //           user_id: this.state.user.id,
  //           user_level: this.state.user.level + 1
  //         }).then( res => {
  //           console.log('Level has been updated');
  //         })
  //       }
  //     }
  //   })
  // }
  //
  // lessTry(number) {
  //   axios.post(`${this.url}/games/updateNumberTry`, {
  //     new_nb_try: number,
  //     user_id: this.state.user.id
  //   }).then( res => {
  //     this.setState({
  //       nbTryGame: res.data.number_try_game
  //     })
  //   })
  // }
  //
  // updateLastPlay() {
  //     let date = '';
  //     const year = new Date().getFullYear();
  //     const month = new Date().getMonth()+1;
  //     const day = new Date().getDate();
  //     date = `${year}-${month}-${day}`;
  //   axios.post(`${this.url}/games/updateLastPlay`, {
  //     user_id: this.state.user.id,
  //     last_try: date
  //   }).then( res => {
  //     this.setState({
  //       last_try: res.data.last_try
  //     })
  //   })
  // }

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
        <Text>In App.js</Text>
          { this.state.user &&
              <Header
                user={this.state.user}
                whichGameClicked={this.whichGameClicked}
                games={this.state.games}
                logout={this.logout}
                nbTryGame={this.state.nbTryGame}
                // lessTry={this.lessTry}
                // last_try={this.state.last_try}
                />
          }
          <Route
            exact path='/'
            render = {() => {
              return (
                <Login
                  url={this.url}
                  setUser={this.setUser} />
              )
            }} />
          <Route
            exact path='/signup'
            render = {() => {
              return (
                <Signup
                  url={this.url}
                  setUser={this.setUser} />
              )
            }} />
          <PrivateRoute
            exact path='/home'
            component={Home}
            isAuthenticated={this.isAuthenticated()}
            initializeDay={this.initializeDay}
            // logout={this.logout}
            url={this.url}
            games={this.state.games}
            whichGameClicked={this.whichGameClicked}
            // isNextLevel={this.isNextLevel}
            // next_level={this.state.next_level}
            // scoreData={this.state.scoreData}
            />
          <PrivateRoute
            exact path='/games'
            component={Gameview}
            isAuthenticated={this.isAuthenticated()}
            initializeDay={this.initializeDay}
            // logout={this.logout}
            url={this.url}
            games={this.state.games}
            whichGame={this.state.whichGame}
            // isNextLevel={this.isNextLevel}
            // lessTry={this.lessTry}
            nbTryGame={this.state.nbTryGame}
            // next_level={this.state.next_level}
            // winGame={this.state.winGame}
            // updateLastPlay={this.updateLastPlay}
            />
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
