import React, { Component } from 'react'
import {Route, Switch } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import Onboard from './Onboard'
import BidTracker from './BidTracker'
import asyncComponent from '../hoc/asyncComponent'

const AsyncScoreboard = asyncComponent(() => {
  return import('./Scoreboard')
})

class AllRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Onboard} />
        <Route path="/bid" component={BidTracker} />
        <Route path="/score" component={AsyncScoreboard} />
      </Switch>
    )
  }
}

export default AllRoutes