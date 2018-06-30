import React from 'react'
import { SmallTextField } from '../styles/mainStyles'

const Score = props => {
  let showField = null
  if (props.showTextfield) {
    showField = <SmallTextField id="newScore" label="Enter Score" />
  }

  return (
    <div
      style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}
    >
      {showField}

      <span
        style={{
          color: 'palevioletred',
          lineHeight: '3.9375',
          marginLeft: '25',
          fontWeight: 'bold'
        }}
      >
        {props.currentScore}
      </span>
    </div>
  )
}

export default Score
