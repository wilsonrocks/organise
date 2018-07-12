import React from 'react';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
  };

  render () {
    const {email, password} = this.state;

    return (
      <form>
        <fieldset>

          <legend>Login </legend>

          <label for="email">email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={({target:{value}}) => this.setState({email: value})}
          />
          <br/>

          <label for="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({target:{value}}) => this.setState({password: value})}

          />
          <br/>

          <button type="button">Log In</button>

        </fieldset>

      </form>

    );
  }

}

export default Login;