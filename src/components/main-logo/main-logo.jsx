import React, {PureComponent} from "react";
import {Link} from "react-router-dom";

export default class MainLogo extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="logo">
        <Link to="/" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
    );
  }
}
