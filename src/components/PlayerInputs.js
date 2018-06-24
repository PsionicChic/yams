import React from 'react'

import {StyledTextField} from '../styles/mainStyles'

const PlayerInputs = props => {
  let playerKey = 0
  let label
  let playerInputs = []
  let playerId

  const times = x => f => {
    if (x > 0) {
      f()
      times(x - 1)(f)
    }
  }

  times(props.numPlayers)(function() {
    label = 'Player ' + (playerKey + 1).toString()
    playerId = 'player' + (playerKey + 1).toString()
    playerInputs.push(
      <StyledTextField
        id={playerId}
        key={playerKey}
        label={label}
        margin="dense"
        inputProps={{maxLength: 10}}
      ></StyledTextField>
    )
    playerKey += 1
  })

  return playerInputs
}

export default PlayerInputs
