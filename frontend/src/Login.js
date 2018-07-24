import React from 'react';
import EmailValidator from 'email-validator';

import Logo from './Logo';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    validEmail: false,
  };

  editEmail = ({ target: { value: email } }) => {

    const validEmail = EmailValidator.validate(email);

    this.setState({
      email,
      validEmail
    });
  };

  readyToSubmit = () => {
    const { email, password, validEmail } = this.state
    return validEmail && password.length > 0 && email.length > 0;
  }

  handleKeyPress = ({ key }) => {
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    if (key === 'Enter' && this.readyToSubmit()) onSubmit(email, password);
  }

  render() {
    const { email, password, validEmail } = this.state;
    const { error, onSubmit } = this.props;

    return (
      <div className="container">


        <form>

          <div className="field is-horizontal">
            <div className="field-label">
            </div>

            <div className="field-body">
              <Logo/>
            </div>
          </div>

          <div className="field is-horizontal">

            <div className="field-label">
              <label className="label">email</label>
            </div>

            <div className="field-body">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={email}
                  onChange={this.editEmail}
                  onKeyPress={this.handleKeyPress}
                />
              </div>

              {validEmail || (email.length === 0) ? null : <p className="help is-danger">Not a valid Email</p>}

            </div>
          </div>

          <div className="field is-horizontal">

            <div className="field-label">
              <label className="label">password</label>
            </div>

            <div className="field-body">
              <div className="control">
                <input
                  className="input"
                  type="password"
                  value={password}
                  onKeyPress={this.handleKeyPress}
                  onChange={({ target: { value } }) => this.setState({ password: value })}
                />
              </div>
            </div>

          </div>

          <div className="field is-horizontal">
            <div className="field-label">
            </div>

            <div className="field-body">

              <button
                className="control"
                type="button"
                disabled={!this.readyToSubmit()}
                onClick={() => onSubmit(email, password)}>
                Log In
              </button>

              {error ? <p className="help is-danger">Problem with login!</p> : null}

            </div>
          </div>

        </form>
      </div>
    );
  }

}

export default Login;