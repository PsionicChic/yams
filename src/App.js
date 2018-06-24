import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import Onboard from './container/Onboard'
import BidTracker from './container/BidTracker'
import asyncComponent from './hoc/asyncComponent'
import Aux from './hoc/Aux'
import classes from './App.css'

const AsyncScoreboard = asyncComponent(() => {
  return import('./container/Scoreboard')
})

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Route path="/" exact component={Onboard} />
        <Route path="/bid" component={BidTracker} />
        <Route path="/score" component={AsyncScoreboard} />
      </React.Fragment>
    )
  }
}

export default App
