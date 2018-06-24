import React, { Component } from 'react'

export const calcChiefSuccess = (bid, numPlayers, chiefPips, partnerPips) => {
  let success
  const chiefTarget = checkChiefTarget(bid, numPlayers)

  if (numPlayers > 3) {
    success = chiefPips + partnerPips >= chiefTarget
  } else {
    success = chiefPips >= chiefTarget
  }
  return success
}
export const calcBidMade = (numPlayers, chiefPips) => {
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

export const calcBonus = (bid, trump) => {
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
