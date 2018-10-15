import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components';
import { HomePage }from './pages';
import { LoginPage } from './pages';
import { RegisterPage } from './pages';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <header>
          <nav className="navbar navbar-light justify-content-between">
            <a className="navbar-brand">
              <img src="https://s3.eu-central-1.amazonaws.com/stas7t-todo-api/logo/list.png" alt="logo-image" height={50} width={50} />
            </a>
            <span className="navbar-text h3 text-dark">
              Simple ToDO List
            </span>
            <span>
              <a href="/login" className="pull-right text-secondary"><i className="fa fa-sign-out fa-2x" aria-hidden="true"/></a>
            </span>
          </nav>
        </header>
        <main>
          <div className="container">
            <div className="row justify-content-center mt-40">
              <div className="col-sm-12 col-md-10 col-lg-8">
                {alert.message &&
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                  <div>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                  </div>
                </Router>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
