import React from 'react'

import { StyledFormControl, StyledButton } from '../styles/mainStyles'
import SSelect from './SSelect'
import PlayerInputs from './PlayerInputs'

const OnBoardForm = props => {
  return (
    <form style={{ textAlign: 'center' }}>
      <StyledFormControl>
        <SSelect
          required
          value={props.numPlayers}
          options={[...Array(4).keys()].map(x => 3 + x)}
          onChange={props.onChangeNum}
          name="numPlayers"
          selectId="numPlayers"
          fhText="# of Players"
        />

        <PlayerInputs numPlayers={props.numPlayers} />
        <SSelect
          required
          value={props.playUntil}
          options={[...Array(6).keys()].map(x => ++x * 100)}
          onChange={props.onChangePlayUntil}
          name="playUntil"
          selectId="playUntil"
          fhText="Play Until"
        />

        <StyledButton onClick={props.beginBidding}>Begin Bidding</StyledButton>
      </StyledFormControl>
    </form>
  )
}

export default OnBoardForm
