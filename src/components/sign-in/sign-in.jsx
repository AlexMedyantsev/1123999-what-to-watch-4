import React from "react";
import PropTypes from "prop-types";
import MainLogo from "../main-logo/main-logo.jsx";

export default class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    return (
      <div>
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <MainLogo />
            </div>
            <h1 className="page-title user-page__title">Sign in</h1>
          </header>
          <div className="sign-in user-page__content">
            <form action="#" className="sign-in__form">
              <div className="sign-in__fields">
                <div className="sign-in__field">
                  <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                    ref={this.loginRef} />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className="sign-in__field">
                  <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                    ref={this.passwordRef} />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" onClick={this.handleSubmit} type="submit">Sign in</button>
              </div>
            </form>
          </div>
          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>
            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }

}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
