import React from 'react'

import {
  StyledSelect,
  StyledFormHelperText,
  StyledMenuItem,
  StyledFormControl
} from '../styles/mainStyles'

const SSelect = props => {
  const selectId = props.selectId

  const options = props.options.map((option, i) => (
    <StyledMenuItem key={i} value={option}>
      {option}
    </StyledMenuItem>
  ))
  return (
    <StyledFormControl style={{ margin: 15 }}>
      <StyledSelect
        value={props.value}
        onChange={props.onChange}
        name={props.selectName}
        id={selectId}
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
