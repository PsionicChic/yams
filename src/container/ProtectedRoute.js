import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route
        {...props}
        render={props =>
          this.state.players ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: this.props.location }
              }}
            />
          )
        }
      />
    )
  }
}

export default ProtectedRoute
