import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import Onboard from './container/Onboard'
import BidTracker from './container/BidTracker'
import asyncComponent from './hoc/asyncComponent'
import Aux from './hoc/reactAux'

const AsyncScoreboard = asyncComponent(() => {
  return import('./container/Scoreboard')
})

class App extends Component {
  render() {
    return (
      <Aux>
        <header>
          <nav>
            <ul className="header">
              <li>
                <Link to="/">New Game</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Onboard} />
            <Route path="/bid" component={BidTracker} />
            <Route path="/score" component={AsyncScoreboard} />
          </Switch>
        </div>
      </Aux>
    )
  }
}

export default App
