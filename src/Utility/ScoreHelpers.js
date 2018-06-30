export const calcScores = (
  newPips,
  players,
  current,
  chief,
  partner,
  bid,
  numPlayers,
  trump
) => {
  let calcScores = []

  let bidMade = bid
  const chiefKey = players.findIndex(x => x === chief)
  const partnerKey = players.findIndex(x => x === partner)
  const chiefPips = newPips[chiefKey]
  const partnerPips = newPips[partnerKey]

  const isChiefSuccess = calcChiefSuccess(
    bid,
    numPlayers,
    chiefPips,
    partnerPips
  )

  if (!isChiefSuccess) {
    bidMade = calcBidMade(numPlayers, chiefPips)
  }

  current.map((cScore, index) => {
    const bonus = checkBonus(
      index,
      players,
      partner,
      isChiefSuccess,
      bid,
      chief,
      bidMade,
      trump
    )

    const playerPips = newPips[index]
    const newScore = bonus + cScore + playerPips

    calcScores.push(newScore)
  })

  return calcScores
}

const checkBonus = (
  index,
  players,
  partner,
  isChiefSuccess,
  bid,
  chief,
  bidMade,
  trump
) => {
  let bonus = 0
  const player = players[index]

  switch (player) {
    case chief:
      if (isChiefSuccess) {
        bonus = calcBonus(bid, trump)
      } else {
        bonus = (bid - bidMade) * -10
      }
      break
    case partner:
      if (isChiefSuccess) {
        bonus = calcBonus(bid, trump)
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

const calcChiefSuccess = (bid, numPlayers, chiefPips, partnerPips) => {
  let success
  const chiefTarget = checkChiefTarget(bid, numPlayers)

  if (numPlayers > 3) {
    success = chiefPips + partnerPips >= chiefTarget
  } else {
    success = chiefPips >= chiefTarget
  }
  return success
}
const calcBidMade = (numPlayers, chiefPips) => {
  let bidMade
  switch (numPlayers) {
    case 3:
      bidMade = Math.floor((chiefPips - 12) / 2 + 1)
      break
    case 4:
      bidMade = Math.floor((chiefPips - 30) / 2 + 1)
      break
    case 5:
      bidMade = Math.floor((chiefPips - 24) / 3 + 1)
      break
    default:
      bidMade = Math.floor((chiefPips - 20) / 4 + 1)
  }

  if (bidMade < 0) {
    bidMade = 0
  }
  return bidMade
}

const calcBonus = (bid, trump) => {
  let bonus
  if (trump.length === 1) {
    //Our trump is a number
    if ((trump === 1 || trump == 7) && bid <= 8) {
      bonus = 20 + (bid - 1) * 10
    } else if (!(trump === 1 || trump == 7) && bid <= 7) {
      bonus = 30 + (bid - 1) * 10
    } else {
      bonus = 100
    }
  } else if (typeof trump == 'string') {
    //Our trump is a color
    if (bid <= 9) {
      bonus = bid * 10
    } else {
      bonus = 100
    }
  } else {
    //We have no trump
    console.log('We have noTrump', typeof trump + ': ', trump)
    bonus = 40 + (bid - 1) * 10
  }
  console.log('In the end, bonus is: ', bonus)
  return bonus
}

const checkChiefTarget = (bid, numPlayers) => {
  let target
  switch (numPlayers) {
    case 3:
      target = 12 + (bid - 1) * 2
      break
    case 4:
      target = 30 + (bid - 1) * 2
      break
    case 5:
      target = 24 + (bid - 1) * 3
      break
    default:
      target = 20 + (bid - 1) * 4
  }
  return target
}

export const calcStalemate = (
  chief,
  tiedBidders,
  bid,
  currentScore,
  players
) => {
  let newScores = [...currentScore]
  const chiefKey = players.findIndex(x => x === chief)

  const tiedBidderKeys = tiedBidders.map(bidder =>
    players.findIndex(x => x === bidder)
  )
  newScores[chiefKey] = newScores[chiefKey] + -10 * bid

  tiedBidderKeys.map((bidder, index) => {
    newScores[bidder] = newScores[bidder] + 5 * bid
  })
 
  return newScores
}
