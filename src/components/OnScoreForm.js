import React from 'react'

import { StyledFormControl, StyledButton, SButton } from '../styles/mainStyles'
import SSelect from './SSelect'

const OnScoreForm = props => {
  return (
    <form style={{ textAlign: 'center' }}>
      <StyledFormControl>
        <StyledFormControl style={Formstyles}>
          <SSelect
            value={props.vice}
            name="vice"
            selectId="vice"
            options={props.players}
            onChange={props.onSelectVice}
            fhText="Vice"
            width={150}
          />
          <SSelect
            value={props.unTrump}
            name="underTrump"
            selectId="underTrump"
            options={trump}
            onChange={props.onSelectUnTrump}
            fhText="Under Trump"
          />
        </StyledFormControl>
        <StyledFormControl style={Formstyles}>
          <SSelect
            value={props.chief}
            name="chief"
            selectId="chief"
            options={props.players}
            onChange={props.onSelectChief}
            fhText="Chief"
            width={150}
          />
          <SSelect
            value={props.valTrump}
            name="trump"
            selectId="trump"
            options={trump}
            onChange={props.onSelectTrump}
            fhText="Trump"
          />
        </StyledFormControl>
        <StyledFormControl style={Formstyles}>
          <SSelect
            value={props.partner}
            name="partner"
            selectId="partner"
            options={props.players}
            onChange={props.onSelectPartner}
            fhText="Partner"
            width={150}
          />
          <SSelect
            value={props.bid}
            name="bid"
            selectId="bid"
            options={bidArray}
            onChange={props.onSelectBid}
            fhText="Bid"
          />
        </StyledFormControl>
        <StyledFormControl />
        <StyledFormControl style={Formstyles}>
          <SButton onClick={props.onClickStalemate}>Stalemate</SButton>
          <StyledButton onClick={props.edit}>Score Round</StyledButton>
        </StyledFormControl>
      </StyledFormControl>
    </form>
  )
}

const bidArray = [...Array(15).keys()].map(x => ++x)
const cardArray = [...Array(10).keys()].map(String)
const trump = ['Black', 'Blue', 'Green', 'Red', 'Yellow', ...cardArray]

const Formstyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

export default OnScoreForm
