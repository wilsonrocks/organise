import React from 'react';
import EmailValidator from 'email-validator';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    validEmail: false,
  };

  editEmail = ({target:{value:email}}) => {
    
    const validEmail = EmailValidator.validate(email);

    this.setState({
      email,
      validEmail
    });

  };

  readyToSubmit = () => {
    const {email, password, validEmail} = this.state
    return validEmail && password.length > 0 && email.length > 0;
  }

  render () {
    const {email, password, validEmail} = this.state;

    return (
      <form>
        <fieldset>

          <legend>Login </legend>

          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={this.editEmail}
          />

          { validEmail || (email.length === 0) ? null : <span>Not a valid Email</span>}

          <br/>

          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            
            onChange={({target:{value}}) => this.setState({password: value})}
          />
          <br/>

          <button
            type="button"
            disabled={!this.readyToSubmit()}
          >Log In</button>

        </fieldset>

      </form>

    );
  }

}

export default Login;