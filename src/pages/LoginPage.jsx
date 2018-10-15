import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <div>
        <h4>Sign In</h4>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" className={'form-control' + (submitted && !username ? ' is-invalid' : '')} placeholder="User name" value={username} onChange={this.handleChange} />
            {submitted && !username &&
              <div className="invalid-feedback">Username is required</div>
            }
          </div>
          <div className="form-group">
            <input type="password" name="password" className={'form-control' + (submitted && !password ? ' is-invalid' : '')} placeholder="Password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className="invalid-feedback">Password is required</div>
            }
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
          <p>
            Don’t have an account?
            <Link to="/register" > Sign Up</Link>
          </p>
        </form>
        {loggingIn &&
          <div className="text-center pt-5">
            <span><i className="fa fa-refresh fa-spin fa-3x fa-fw" /></span>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
