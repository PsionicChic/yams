import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import OnBoardForm from '../components/OnBoardForm'
import Aux from '../hoc/reactAux'

class Onboard extends Component {
  state = {
    numPlayers: 4,
    players: null,
    playUntil: 200,
    submitted: false
  }

  beginBiddingHandler = () => {
    const playerInputs = document.querySelectorAll('*[id^="player"]')
    const playerNames = Array.prototype.map.call(playerInputs, function(name) {
      return name.value.toUpperCase()
    })
    this.validate(playerNames)
    var containsNoEmpties = !playerNames.some(function(e) {
      return !e || 0 === e.length
    })

    if (containsNoEmpties) {
      const numPlayers = document.querySelector('[id="numPlayers"]').value
      this.setState({
        players: playerNames,
        numPlayers: numPlayers,
        submitted: true
      })
    } else {
      this.postErrors(playerInputs, playerNames)
    }
  }
  postErrors = (inputs, array) => {
    array.map(function(name, index) {
      if (!e || 0 === e.length) {
        inputs[index].setAttribute('error', 'true')
      }
    })
  }

  validate = playerNames => {
    var containsNoEmpties = !playerNames.some(function(e) {
      return !e || 0 === e.length
    })

    return containsNoEmpties
  }
  onSelect = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  render() {
    let redirect = null
    if (this.state.submitted) {
      redirect = (
        <Redirect
          to={{
            pathname: '/bid',
            state: {
              players: this.state.players,
              numPlayers: this.state.numPlayers
            }
          }}
        />
      )
    }
    let onBoardForm = (
      <OnBoardForm
        numPlayers={this.state.numPlayers}
        onChangeNum={this.onSelect('numPlayers')}
        playUntil={this.state.playUntil}
        onChangePlayUntil={this.onSelect('playUntil')}
        beginBidding={this.beginBiddingHandler}
      />
    )

    return (
      <Aux>
        {redirect}
        <h1 style={h1Styles}>Game Setup</h1>
        {onBoardForm}
      </Aux>
    )
  }
}

const h1Styles = {
  textAlign: 'center',
  fontFamily: 'Roboto, Helvetica, Ariel, san-serif',
  fontSize: 25,
  fontWeight: 500,
  color: 'cadetblue'
}

export default Onboard
