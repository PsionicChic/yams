import React from 'react'

import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import { StyledButton, StyledFormControl,} from '../styles/mainStyles'
import Grid from '@material-ui/core/Grid'
import SSelect from './SSelect'
import PlayerSelects from './PlayerSelects'

const OnStalemateModal = props => {
  const bidArray = [...Array(15).keys()].map(x => ++x)

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.onClose}
      >
        <div style={modalStyles}>
          <Typography id="modal-title" style={modalTitle}>
            Stalemate
          </Typography>
          <form style={{ textAlign: 'center' }}>
            <StyledFormControl>
              <SSelect
                value={props.bid}
                name="bid"
                selectId="bid"
                options={bidArray}
                onChange={props.onSelectBid}
                fhText="Bid"
              />

              <SSelect
                value={props.chief}
                name="chief"
                selectId="chief"
                options={props.players}
                onChange={props.onSelectChief}
                fhText="Last Bidder"
                width={150}
              />
              <p>Select tied players: </p>
              
              <Grid container id='tiedPlayers'>
                <PlayerSelects
                  indeterminate={props.indeterminate}
                  players={props.players}
                  tiedBidders={props.tiedBidders}
                  onSelectBidders={props.onSelectBidders}
                  isChecked={props.isChecked}
                />
              </Grid>
             

              <StyledButton onClick={props.onClickCalc}>Record</StyledButton>
            </StyledFormControl>
          </form>
        </div>
      </Modal>
    </div>
  )
}

const modalStyles = {
  backgroundColor: 'white',
  height: 'fit-content',
  width: 250,
  margin: 'auto',
  padding: 20,
  borderRadius: 8,
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'cadetblue',
  maxHeight: '90vh',
  overflowY: 'scroll'
}

const modalTitle = {
  fontSize: 20,
  fontWeight: 'bold'
}

export default OnStalemateModal
