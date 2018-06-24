import React from 'react'
import Aux from '../hoc/Aux'

import {
  StyledSelect,
  StyledFormHelperText,
  StyledMenuItem,
  StyledFormControl
} from '../styles/mainStyles'

const SSelect = props => {
  const selectId = props.selectId
  let bidKey = 0
  let menuItems = []

  const options = props.options.map((option,i) => (
    <StyledMenuItem key={i} value={option}>
      {option}
    </StyledMenuItem>
  ))
  return (
    <StyledFormControl style={{margin: 15}}>
      <StyledSelect
        value={props.value}
        onChange={props.onChange}
        name={props.selectName}
        inputProps={{
          id: { selectId }
        }}
        style={{ width: props.width }}
      >
        {options}
      </StyledSelect>
      <StyledFormHelperText style={{ width: props.width }}>
        {props.fhText}
      </StyledFormHelperText>
    </StyledFormControl>
  )
}

export default SSelect
