import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { StyledButton, StyledFormControl } from '../styles/mainStyles'

import Aux from '../hoc/Aux'
import Players from '../components/Players'
import PlayerInputs from '../components/PlayerInputs'
import SSelect from '../components/SSelect'

class Onboard extends Component {
  state = {
    numPlayers: 4,
    players: [],
    playUntil: 200,
    submitted: false
  }

  beginBiddingHandler = () => {
    const playerInputs = document.querySelectorAll('*[id^="player"]')
    const playerNames = Array.prototype.map.call(playerInputs, function(name) {
      return name.value.toUpperCase()
    })
    this.setState({
      players: playerNames,
      submitted: true
    })
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
    let form = (
      <form style={{ textAlign: 'center' }}>
        <StyledFormControl>
          <SSelect
            required
            value={this.state.numPlayers}
            options={[...Array(4).keys()].map(x => 3 + x)}
            onChange={this.onSelect('numPlayers')}
            name="numPlayers"
            selectId="numPlayers"
            fhText="# of Players"
          />

          <PlayerInputs numPlayers={this.state.numPlayers} />
          <SSelect
            required
            value={this.state.playUntil}
            options={[...Array(6).keys()].map(x => ++x * 100)}
            onChange={this.onSelect('playUntil')}
            name="playUntil"
            selectId="playUntil"
            fhText="Play Until"
          />

          <StyledButton onClick={this.beginBiddingHandler}>
            Begin Bidding
          </StyledButton>
        </StyledFormControl>
      </form>
    )
    return (
      <Aux>
        {redirect}
        <h1 style={{ textAlign: 'center' }}>Game Setup</h1>
        {form}
      </Aux>
    )
  }
}

export default Onboard
