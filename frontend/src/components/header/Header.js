import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <Link to="/">Home</Link>

          <br />
          <Link to="/signup">Signup</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
