import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
        password_confirmation: '',
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.username.length >= 3 && user.password && user.password.length >= 8 && user.password_confirmation && user.password === user.password_confirmation ) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        <h4>Sign Up</h4>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className={'form-control' + (submitted && (!user.username || user.username.length < 3) ? ' is-invalid' : '')}
              placeholder="User name"
              value={user.username}
              onChange={this.handleChange} />

            {submitted && !user.username &&
              <div className="invalid-feedback">Username is required</div>
            }
            {submitted && user.username && user.username.length < 3 &&
              <div className="invalid-feedback">Username is too short. Minimum 3 characters</div>
            }
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className={'form-control' + (submitted && (!user.password || user.password.length < 8) ? ' is-invalid' : '')}
              placeholder="Password"
              value={user.password}
              onChange={this.handleChange} />
            
            {submitted && !user.password &&
              <div className="invalid-feedback">Password is required</div>
            }
            {submitted && user.password && user.password.length < 8 &&
              <div className="invalid-feedback">Password is too short. Minimum 8 characters</div>
            }
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password_confirmation"
              className={'form-control' + (submitted && (!user.password_confirmation || user.password !== user.password_confirmation) ? ' is-invalid' : '')}
              placeholder="Confirm Password"
              value={user.password_confirmation}
              onChange={this.handleChange} />

            {submitted && !user.password_confirmation &&
              <div className="invalid-feedback">Please confirm password</div>
            }
            {submitted && user.password_confirmation && user.password !== user.password_confirmation &&
              <div className="invalid-feedback">Password confirmation doesn’t match password</div>
            }
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <p>
            Already a member?
            <Link to="/login" > Sign In</Link>
          </p>
        </form>
        {registering &&
          <div className="text-center pt-5">
            <span><i className="fa fa-refresh fa-spin fa-3x fa-fw" /></span>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
