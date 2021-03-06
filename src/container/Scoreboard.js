import React, { Component } from 'react'

class Scoreboard extends Component {
  state = {
    players: this.props.location.state.players || this.state.players
  }

  render() {
    return (
      <React.Fragment>
        <h1 style={h1Styles}>Scoreboard</h1>
      </React.Fragment>
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

export default Scoreboard
