import React, { Component } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native'
import { StyleSheet, Text, View, Image } from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listGames: 'no',
      tryleft: null
    }

    this.renderLevel = this.renderLevel.bind(this);
    this.toggleDisplayList = this.toggleDisplayList.bind(this);
  }

  componentDidMount() {
    this.setState({
      tryleft: this.props.user.number_try_game
    })
  }

  renderLevel() {
    console.log('RENDER LEVEL');
    let level = this.props.user.level;
    const starsLevel = [];
    for (let i=0; i<level; i++) {
      starsLevel.push(
        <View>
          <Image alt='x' class='starLevel' key={i}
                 style={{width: 15, height: 15}}
                 source={require('../images/starLevel.png')} />
        </View>
      )
    }
    return starsLevel;
  }

  toggleDisplayList() {
    if (this.state.listGames === 'no') {
      this.setState({
        listGames: 'yes'
      })
    } else {
      this.setState({
        listGames: 'no'
      })
    }
  }
  // {this.props.user.picture &&
  //   <Link to="/profile">
  //     <Image style={{width: 15, height: 15}}
  //            source={require('../images/user.png')} />
  //   </Link>
  // }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}>
          <Text class="NbTries">Tries left for today: {this.props.nbTryGame}</Text>
          <View class="Picture">

            {!this.props.user.picture &&
              <Link to="/profile">
                <Image alt='yourpic' class='profilePic'
                       style={{width: 15, height: 15}}
                       source={require('../images/user.png')} />
              </Link>
            }
            <View class="Level">{this.renderLevel()}</View>
          </View>

          <View class="LastTry">
            {!this.props.user.last_try &&
              <Text>Play to improve your score!</Text>
            }
            {(this.props.user.last_try && !this.state.last_try) &&
              <Text>Last try: {this.props.user.last_try.substring(0, 10)}</Text>
            }
            {(this.props.user.last_try && this.state.last_try) &&
              <Text>Last try: {this.state.last_try.substring(0, 10)}</Text>
            }
          </View>
          <Text class="Logout" onPress={this.props.logout}>Log Out</Text>
      </View>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 420,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})
