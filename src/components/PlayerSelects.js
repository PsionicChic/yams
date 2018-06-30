import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'

const PlayerSelects = props => {
  let playerKey = 0
  let playerSelects = []
  let selectId

  const times = x => f => {
    if (x > 0) {
      f()
      times(x - 1)(f)
    }
  }

  times(props.players.length)(function() {
    selectId = 'bidder' + playerKey.toString()
    playerSelects.push(
      <Grid item key={playerKey} xs={6} styles={gridStyles}>
        <div id={selectId}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.isChecked[playerKey]}
                onChange={props.onSelectBidders}
                value={props.players[playerKey].toString()}

              />
            }
            label={props.players[playerKey].toString()}
            id={props.players[playerKey].toString()}
          />
        </div>
      </Grid>
    )
    playerKey += 1
  })

  return playerSelects
}
const gridStyles = {
  alignItems: 'left'
}

export default PlayerSelects
