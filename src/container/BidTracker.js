import React, { Component } from 'react'
import { Redirect } from 'react-router'

import {
  StyledButton,
  StyledFormControl,
  SButton,
  SmButton
} from '../styles/mainStyles'
import SSelect from '../components/SSelect'
import Players from '../components/Players'
import * as Util from '../Utility/ScoreHelpers'

class BidTracker extends Component {
  state = {
    players: this.props.location.state.players || this.state.players,
    chief: ' ',
    vice: ' ',
    partner: ' ',
    trump: ' ',
    unTrump: ' ',
    bid: ' ',
    pips: [],
    chiefSuccess: false,
    stalemate: false,
    currentScore: [
      ...Array(parseInt(this.props.location.state.numPlayers)).fill(0)
    ],
    submitted: false,
    showScoreEdit: false,
    showForm: true
  }

  editPlayerHandler = ev => {
    this.setState({ edited: true })
  }
  editScoreHandler = ev => {
    this.setState({ showScoreEdit: true, showForm: false })
  }
  scoreRoundHandler = () => {
    const scoreInputs = document.querySelectorAll('*[id="newScore"]')
    const newPips = Array.prototype.map.call(scoreInputs, function(score) {
      return parseInt(score.value)
    })

    this.calcScores(newPips)
  }

  calcScores = newPips => {
    let calcScores = []
    const current = this.state.currentScore
    const chief = this.state.chief.toString()
    const partner = this.state.partner.toString()
    const bid = this.state.bid
    const numPlayers = this.state.players.length

    let bidMade = bid
    const chiefKey = this.state.players.findIndex(x => x === chief)
    const partnerKey = this.state.players.findIndex(x => x === partner)
    const chiefPips = newPips[chiefKey]
    const partnerPips = newPips[partnerKey]

    const isChiefSuccess = Util.calcChiefSuccess(
      bid,
      numPlayers,
      chiefPips,
      partnerPips
    )

    if (!isChiefSuccess) {
      bidMade = Util.calcBidMade(numPlayers, chiefPips)
    }

    current.map((cScore, index) => {
      const bonus = this.checkBonus(index, isChiefSuccess, bid, chief, bidMade)

      const playerPips = newPips[index]
      let newScore
      if (
        numPlayers > 3 &&
        isChiefSuccess &&
        (index == chiefKey || index == partnerKey)
      ) {
        newScore = bonus + cScore + chiefPips + partnerPips
      } else {
        newScore = bonus + cScore + playerPips
      }

      calcScores.push(newScore)
    })

    this.setState({
      currentScore: calcScores,
      showScoreEdit: false,
      showForm: true
    })
  }

  checkBonus = (index, isChiefSuccess, bid, chief, bidMade) => {
    let bonus = 0
    const player = this.state.players[index]
    const partner = this.state.partner
    const trump = this.state.trump
    switch (player) {
      case chief:
        if (isChiefSuccess) {
          bonus = Util.calcBonus(bid, trump)
        } else {
          bonus = (bid - bidMade) * -10
        }
        break
      case partner:
        if (isChiefSuccess) {
          bonus = Util.calcBonus(bid, trump)
        } else {
          bonus = 0
        }
        break
      default:
        if (!isChiefSuccess) {
          bonus = (bid - bidMade) * 5
        } else {
          bonus = 0
        }
    }

    return bonus
  }
  onSelect = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  render() {
    const bidArray = [...Array(15).keys()].map(x => ++x)
    const cardArray = [...Array(10).keys()].map(String)
    const trump = ['Black', 'Blue', 'Green', 'Red', 'Yellow', ...cardArray]
    // let redirect = null
    // if (this.state.submitted) {
    //   console.log(this.state.players)
    //   redirect = (
    //     <Redirect
    //       to={{
    //         pathname: '/score',
    //         state: {
    //           players: this.state.players,
    //         }
    //       }}
    //     />
    //   )
    // }
    let calcScoreButton = null
    if (this.state.showScoreEdit) {
      calcScoreButton = (
        <StyledButton onClick={this.scoreRoundHandler}>Next Round</StyledButton>
      )
    }

    let form = null
    if (this.state.showForm) {
      form = (
        <form style={{ textAlign: 'center' }}>
          <StyledFormControl>
            <SSelect
              value={this.state.bid}
              name="bid"
              selectId="bid"
              options={bidArray}
              onChange={this.onSelect('bid')}
              fhText="Bid"
            />

            <StyledFormControl style={Formstyles}>
              <SSelect
                value={this.state.vice}
                name="vice"
                selectId="vice"
                options={this.state.players}
                onChange={this.onSelect('vice')}
                fhText="Vice"
                width={150}
              />
              <SSelect
                value={this.state.unTrump}
                name="underTrump"
                selectId="underTrump"
                options={trump}
                onChange={this.onSelect('unTrump')}
                fhText="Under Trump"
              />
            </StyledFormControl>
            <StyledFormControl style={Formstyles}>
              <SSelect
                value={this.state.chief}
                name="chief"
                selectId="chief"
                options={this.state.players}
                onChange={this.onSelect('chief')}
                fhText="Chief"
                width={150}
              />
              <SSelect
                value={this.state.trump}
                name="trump"
                selectId="trump"
                options={trump}
                onChange={this.onSelect('trump')}
                fhText="Trump"
              />
            </StyledFormControl>
            <SSelect
              value={this.state.partner}
              name="partner"
              selectId="partner"
              options={this.state.players}
              onChange={this.onSelect('partner')}
              fhText="Partner"
              width={150}
            />
            <StyledFormControl />
            <StyledFormControl style={Formstyles}>
              <SButton onClick={this.stalemateHandler}>Stalemate</SButton>
              <StyledButton onClick={this.editScoreHandler}>
                Score Round
              </StyledButton>
            </StyledFormControl>
          </StyledFormControl>
        </form>
      )
    }
    return (
      <React.Fragment>
        <h1 style={h1Styles}>Score Tracker</h1>
        <SmButton onClick={this.stalemateHandler}>Scoreboard</SmButton>
        <Players
          players={this.state.players}
          currentScore={this.state.currentScore}
          showTextfield={this.state.showScoreEdit}
        />
        {calcScoreButton}
        {form}
      </React.Fragment>
    )
  }
}

const Formstyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

const h1Styles = {
  textAlign: 'center',
  fontFamily: 'Roboto, Helvetica, Ariel, san-serif',
  fontSize: 25,
  fontWeight: 500,
  color: 'cadetblue'
}

export default BidTracker
