import React, { Component } from 'react'
import { Redirect } from 'react-router'

import OnScoreForm from '../components/OnScoreForm'
import OnStalemateModal from '../components/OnStalemateModal'
import { StyledButton, SmButton } from '../styles/mainStyles'
import Players from '../components/Players'
import * as Util from '../Utility/ScoreHelpers'
import Aux from '../hoc/reactAux'

class BidTracker extends Component {
  state = {
    players: this.props.location.state.players || this.state.players,
    chief: ' ',
    numPlayers: null,
    vice: ' ',
    partner: ' ',
    trump: ' ',
    unTrump: ' ',
    tiedBidders: [...Array(this.props.location.state.tied).fill(' ')],
    bid: ' ',
    pips: [],
    chiefSuccess: false,
    stalemate: false,
    currentScore: [
      ...Array(parseInt(this.props.location.state.numPlayers)).fill(0)
    ],
    submitted: false,
    showScoreEdit: false,
    showForm: true,
    open: false,
    checked: [
      ...Array(parseInt(this.props.location.state.numPlayers)).fill(false)
    ],
    indeterminate: false
  }

  editPlayerHandler = ev => {
    this.setState({ edited: true })
  }
  editScoreHandler = ev => {
    this.setState({ showScoreEdit: true, showForm: false })
  }
  stalemateHandler = () => {
    this.setState({ stalemate: true, showForm: false, open: true })
  }
  scoreRoundHandler = () => {
    const current = this.state.currentScore
    const chief = this.state.chief.toString()
    const partner = this.state.partner.toString()
    const bid = this.state.bid
    const numPlayers = this.state.numPlayers
    const players = this.state.players
    const trump = this.state.trump

    const scoreInputs = document.querySelectorAll('*[id="newScore"]')
    const newPips = Array.prototype.map.call(scoreInputs, function(score) {
      return parseInt(score.value)
    })

    const currentScore = Util.calcScores(
      newPips,
      players,
      current,
      chief,
      partner,
      bid,
      numPlayers,
      trump
    )
    this.setState({
      currentScore: currentScore,
      showScoreEdit: false,
      showForm: true,
      chief: ' ',
      bid: ' ',
      vice: ' ',
      partner: ' ',
      trump: ' ',
      unTrump: ' '
    })
  }
  scoreboardHandler = () => {
    this.setState({ submitted: 'true' })
  }
  onSelect = name => ev => {
    this.setState({ [name]: ev.target.value })
  }
  onSelectChief = ev => {
    const text = "input[value='" + ev.target.value + "']"
    const targetId = "label[id='" + ev.target.value + "']"

    const disabled = document.querySelector(text)
    disabled.setAttribute('disabled', true)
    const hidden = document.querySelector(targetId).closest('div')
    hidden.setAttribute('hidden', 'true')
    this.setState({ chief: ev.target.value })
  }

  onSelectBidders = ev => {
    const tiedBidders = this.state.tiedBidders
    const players = this.state.players
    const checkedArray = this.state.checked
    const playerIndex = players.indexOf(ev.target.value)
    checkedArray[playerIndex] = !checkedArray[playerIndex]

    let newBidders = [...tiedBidders]
    if (checkedArray[playerIndex]) {
      newBidders = [...newBidders, ev.target.value]
    } else {
      const biddersindex = newBidders.indexOf(ev.target.value)
      newBidders.splice(biddersindex, 1)
    }

    if (newBidders[0] === ' ') {
      newBidders.splice(0, 1)
    }

    this.setState({ tiedBidders: newBidders, checked: checkedArray })
  }
  stalemateCalcHandler = ev => {
    const chief = this.state.chief
    const tiedBidders = this.state.tiedBidders
    const bid = this.state.bid
    const currentScore = this.state.currentScore
    const players = this.state.players

    const newScores = Util.calcStalemate(
      chief,
      tiedBidders,
      bid,
      currentScore,
      players
    )

    const hidden = "div[hidden='true']"
    const disabled = "input[disabled='true']"
    const unhide = document.querySelector(hidden)
    unhide.setAttribute('hidden', false)
    const enabled = document.querySelector(disabled)
    enabled.setAttribute('disabled', false)

    this.setState({
      stalemate: false,
      showForm: true,
      open: false,
      currentScore: newScores,
      chief: ' ',
      checked: [
        ...Array(parseInt(this.props.location.state.numPlayers)).fill(false)
      ],
      tiedBidders: [...Array(this.props.location.state.tied).fill(' ')],
      bid: ' '
    })
    //Update provoking bidder score -10/card
    //Update tied bidders scores +5/card each
  }

  handleClose = () => {
    this.setState({
      stalemate: false,
      showForm: true,
      open: false,
      chief: ' ',
      checked: [
        ...Array(parseInt(this.props.location.state.numPlayers)).fill(false)
      ],
      tiedBidders: [...Array(this.props.location.state.tied).fill(' ')],
      bid: ' '
    })
  }

  render() {
    let redirect = null
    if (this.state.submitted && this.state.players) {
      redirect = (
        <Redirect
          to={{
            pathname: '/score',
            state: {
              players: this.state.players
            }
          }}
        />
      )
    }
    let calcScoreButton = null
    if (this.state.showScoreEdit) {
      calcScoreButton = (
        <StyledButton onClick={this.scoreRoundHandler}>Next Round</StyledButton>
      )
    }

    let stalemateModal = null
    if (this.state.stalemate) {
      stalemateModal = (
        <OnStalemateModal
          open={this.state.open}
          onClose={this.handleClose}
          onClickCalc={this.stalemateCalcHandler}
          players={this.state.players}
          bid={this.state.bid}
          tiedBidders={this.state.tiedBidders}
          chief={this.state.chief}
          onSelectBid={this.onSelect('bid')}
          onSelectBidders={this.onSelectBidders.bind(this)}
          onSelectChief={this.onSelectChief}
          isChecked={this.state.checked}
        />
      )
    }

    let scoreForm = null
    if (this.state.showForm) {
      scoreForm = (
        <OnScoreForm
          bid={this.state.bid}
          onSelectBid={this.onSelect('bid')}
          vice={this.state.vice}
          players={this.state.players}
          onSelectVice={this.onSelect('vice')}
          unTrump={this.state.unTrump}
          onSelectUnTrump={this.onSelect('unTrump')}
          chief={this.state.chief}
          onSelectChief={this.onSelect('chief')}
          valTrump={this.state.trump}
          onSelectTrump={this.onSelect('trump')}
          partner={this.state.partner}
          onSelectPartner={this.onSelect('partner')}
          onClickStalemate={this.stalemateHandler}
          edit={this.editScoreHandler}
        />
      )
    }
    return (
      <Aux>
        {redirect}
        <h1 style={h1Styles}>Score Tracker</h1>
        <SmButton onClick={this.scoreboardHandler}>Scoreboard</SmButton>
        <Players
          players={this.state.players}
          currentScore={this.state.currentScore}
          showTextfield={this.state.showScoreEdit}
        />

        {calcScoreButton}
        {scoreForm}
        {stalemateModal}
      </Aux>
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


export default BidTracker
