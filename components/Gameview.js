import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { StyleSheet, Text, View } from 'react-native';

import axios from 'axios';

class Gameview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // game page
      rungame: 'before',
      counter: 30,

      // user info
      tryleft: null,
      last_try: null,
      max_score: null,

      // game info
      numberErrorAllowed: null,
      scoreToReach: null,
      hint: '',

      // user info on the game
      score: 0,
      error: 0,
      wins: null,
      next_level: false,

      // game each question
      question: '',
      choice: [],
      response: ''
    }

    this.initializeState = this.initializeState.bind(this);

    this.getGameInfo = this.getGameInfo.bind(this);
    this.renderGame = this.renderGame.bind(this);

    this.decreaseCounter = this.decreaseCounter.bind(this);
    this.checkCounter = this.checkCounter.bind(this);
    this.setCounter = this.setCounter.bind(this);

    this.finishGame = this.finishGame.bind(this);

    this.renderQuestion = this.renderQuestion.bind(this);
    this.displayQuestion = this.displayQuestion.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.gameChecker = this.gameChecker.bind(this);
  }

  componentDidMount() {
    this.initializeState();
    this.getGameInfo();
  }

  initializeState() {
    let maxScore = '';
    if (this.props.user[`max_score_game_${this.props.whichGame.id}`] === null) {
      maxScore = 0
    } else {
      maxScore = this.props.user[`max_score_game_${this.props.whichGame.id}`]
    }
    this.setState({
      // game page
      counter: 30,

      // user info
      last_try: this.props.user.last_try,
      max_score: maxScore,

      // user info on the game
      score: 0,
      error: 0,
      wins: null,

      // game each question
      question: '',
      choice: [],
      response: ''
    })
  }

  getGameInfo() {
    this.setState({
      numberErrorAllowed: this.props.whichGame[`nb_try_max_level_${this.props.user.level}`],
      scoreToReach: this.props.whichGame[`points_to_reach_level_${this.props.user.level}`],
      hint: this.props.whichGame[`hint`],
      tryleft: this.props.user.number_try_game
    }),
    this.renderQuestion();
  }

  renderGame() {
    this.initializeState();
    this.setCounter();
    this.renderQuestion();
    this.setState({
      rungame: 'during',
      tryleft: this.props.nbTryGame,
    });
     fetch(`${this.props.url}/games/updateLastPlay`, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        last_try: new Date()
      })
    }).then( (res) => {
      console.log(JSON.parse(res._bodyInit));
    })
  }

  setCounter() {
    this.countdown = setInterval(this.decreaseCounter, 1000);
  }

  decreaseCounter() {
    this.setState({
      counter: this.state.counter - 1
    });
    this.checkCounter();
  }

  checkCounter() {
    if (this.state.counter === 0) {
      this.finishGame('lose');
    }
  }

  finishGame(WinOrLose) {
    clearInterval(this.countdown);
    this.props.lessTry(this.state.tryleft-1);
    this.props.updateLastPlay();
    this.setState({
      rungame: 'after',
      tryleft: this.state.tryleft - 1
    });

    if (this.state.score > this.state.max_score) {
      this.props.isNextLevel(this.state.score, this.props.user.id);
      this.setState({
        max_score: this.state.score
      })
    }

    if (WinOrLose === 'lose') {
      this.setState({
        wins: false
      })
    } else if (WinOrLose === 'win') {
      this.setState({
        wins: true
      })
    }
  }

  renderQuestion() {
    fetch(`${this.props.url}/games/renderQuestion/${this.props.whichGame.id}/1`)
    .then( response => {
      this.setState({
        question: JSON.parse(response._bodyInit).question.fullQuestion,
        response: JSON.parse(response._bodyInit).question.finalResponse,
        choice: JSON.parse(response._bodyInit).question.choice
      });
    })
  }

  displayQuestion() {
    return (
      <View class="fullQuestionBlockContainer">
          {this.props.whichGame.id !== 6 &&
            <Text class="question">{this.state.question}</Text>
          }
          {this.props.whichGame.id === 6 &&
            <View class="question">
              <img alt='flag' key={Math.random()} class='flagQuestion' src={`/images/flags/${this.state.question.split(' ').join('')}.png`} />
            </View>
          }
          <View class="choicesQuestion">
            <Text class="choiceQuestion" onPress={() => {this.checkAnswer(this.state.choice[0])} }>
              {this.state.choice[0]}
            </Text>
            <Text class="choiceQuestion" onPress={() => {this.checkAnswer(this.state.choice[1])} }>
              {this.state.choice[1]}
            </Text>
            <Text class="choiceQuestion" onPress={() => {this.checkAnswer(this.state.choice[2])} }>
              {this.state.choice[2]}
            </Text>
            <Text class="choiceQuestion" onPress={() => {this.checkAnswer(this.state.choice[3])} }>
              {this.state.choice[3]}
            </Text>
          </View>
      </View>
    )
  }

  checkAnswer(answerClicked) {
    this.gameChecker();
    if (answerClicked === this.state.response) {
      this.setState({
        score: this.state.score + 1
      })
    } else if (answerClicked !== this.state.response) {
      this.setState({
        error: this.state.error + 1
      })
    }
    this.renderQuestion();
  }

  gameChecker() {
    if (this.state.error === this.state.numberErrorAllowed) {
      this.finishGame('lose');
    } else if (this.state.score === this.state.scoreToReach ) {
      this.finishGame('win');
    }
  }

  // shareWithFb(iswon) {
  //   if (iswon === 'finishgame') {
  //     window.FB.ui({
  //       method: 'share',
  //       mobile_iframe: true,
  //       href: 'https://beeurself.netlify.com/',
  //       quote: `I just finished this game! It is awesome, you should try!`
  //     })
  //   } else if (iswon) {
  //     window.FB.ui({
  //       method: 'share',
  //       mobile_iframe: true,
  //       href: 'https://beeurself.netlify.com/',
  //       quote: `I just won the game ${this.props.whichGame.name}!`
  //     })
  //   } else {
  //     window.FB.ui({
  //       method: 'share',
  //       mobile_iframe: true,
  //       href: 'https://beeurself.netlify.com/',
  //       quote: `I did my best score to the game ${this.props.whichGame.name}: ${this.state.score}!`
  //     })
  //   }
  //
  // }


  render() {
    return (
      <View class={`Gameview ${((this.state.rungame === 'before') || (this.state.rungame === 'after')) ? `Gameview${Math.ceil(Math.random()*6)}yes` : 'Gameviewno'}`}>
          <View class="GameContainer">
              { ((this.props.nbTryGame > 0) && (this.state.rungame === 'before')) &&
                <View class="beforePlaying">
                  <Text class='gamename'>{this.props.whichGame.name}</Text>
                  <Text class='hint'>You have 30 seconds to {this.props.whichGame.rules}</Text>
                  <Text class='ready'>Ready ?</Text>
                  <Text class='go' onPress={this.renderGame}>GO</Text>
                  <Link class='home' to='/home'><Text>Home</Text></Link>
                </View>
              }
              { ((this.props.nbTryGame > 0) && (this.state.rungame === 'during')) &&
                <View class="gameBlock">
                  <View class="upQuestionBlock">
                    <Text class="gamename">{this.props.whichGame.name}</Text>
                    <Text class="hint">{this.state.hint === 'x' ? '' : `Hint: ${this.state.hint}`}</Text>
                    <View class='lineUpQuestion'>
                      <Text class="error">Chances: {this.state.error} / {this.state.numberErrorAllowed}</Text>
                      <Text class="score">Score: {this.state.score} / {this.state.scoreToReach}</Text>
                      <Text class="counter">00:{this.state.counter < 10 ? '0' : ''}{this.state.counter}</Text>
                    </View>
                  </View>
                  <View class="fullQuestionBlock">{this.displayQuestion()}</View>
                </View>
              }
              { ((this.props.nbTryGame > 0) && (this.state.rungame === 'after')) &&
                <View class="afterPlaying" >
                  { (this.state.wins && !this.props.winGame) &&
                    <View class="wins">
                        <Text class="bigger">Congratulations! You won this game level!</Text>
                        <Text class="shareFb" onPress={() => {this.shareWithFb(true)}}>Share your result</Text>
                        <Text>Want to play to something else?</Text>
                        <Link class='home' to='/home'><Text>Home</Text></Link>
                    </View>
                  }
                  { (this.state.wins && this.props.winGame) &&
                    <View class="wins">
                        <Text class="bigger">Congratulations! You finished the game!</Text>
                        <Text class="shareFb" onPress={() => {this.shareWithFb('finishgame')}}>Share your result</Text>
                        <Link class='home' to='/home'><Text>Home</Text></Link>
                    </View>
                  }
                  {!this.state.wins &&
                    <View class="loses">
                        <Text class="bigger">Too bad
                        {this.state.score > this.state.max_score &&
                          <Text>...but this is your best score so far!<br />
                          <Text class="shareFb" onPress={() => {this.shareWithFb(false)}}>Share your result</Text></Text>}
                        </Text>
                        <Text class="hint">Want to try again?</Text>
                        <Text class='go' onPress={this.renderGame}>GO</Text>
                        <Text class="hint">Want to play to something else?</Text>
                        <Link class='home' to='/home'><Text>Home</Text></Link>
                    </View>
                  }
                </View>
              }
              { this.props.nbTryGame <= 0 &&
                <View>
                  <Text class="hint">Sorry... you tried enough for today!</Text>
                  <Text class="hint">Please wait tomorrow!</Text>
                  <Link class='home' to='/home'><Text>Home</Text></Link>
                </View>
              }
          </View>
      </View>
    );
  }
// Share results
// Restart game when wins everything
}

export default Gameview;
