import React, { Component } from 'react'

import Score from '../components/Score'
import {
  StyledList,
  StyledListItem,
  StyledListItemText,
  StyledGrid
} from '../styles/gridStyles'

const players = props => {
  return (
    <StyledGrid item xs={12} md={7}>
      <div>
        <StyledList>
          {props.players.map((player, i) => (
            <StyledListItem key={i}>
              <StyledListItemText
                primary={
                  <Score
                    currentScore={props.currentScore[i]}
                    showTextfield={props.showTextfield}
                  />
                }
                secondary={<span style={{ fontWeight: 'bold' }}>{player}</span>}
              />
            </StyledListItem>
          ))}
        </StyledList>
      </div>
    </StyledGrid>
  )
}

export default players
