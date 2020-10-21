import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../header/Header.css";
import { connect } from "react-redux";
import { signoutAction } from "../../storeRedux/actions/signoutActions";
import { withRouter } from "react-router";
import img1 from "../header/pop1.png"
class Header extends React.Component {
  imageOnclick = () => {
    this.props.history.push("/profiluser");
  };
  onSignout = () => {
    this.props.signoutAction();
    this.props.history.push("/");
  };

  render() {
    console.log(this.props);
    let x;
    console.log(this.props.signinStore.userToken);
    if (this.props.signinStore.userToken == null) {
      x = (
        <header className="header">
          <nav className="nav">
            <Link className="nav_link" to="/">
              Home
            </Link>
            <img src={img1} className="img1" />
            <img src={img1} className="img2" />
            <h1>Pop ta vie</h1>
            <Link className="nav_link" to="/signup">
              Signup
            </Link>
          </nav>
        </header>
      );
    } else if (this.props.signinStore.userToken) {
      x = (
        <header className="header">
          <nav className="nav">
            <Link className="nav_link" to="/">
              Home
            </Link>
            <Link className="nav_link" to="/productform">
              Product Form
            </Link>

            <Link className="nav_link" to="/cart">
              cart
            </Link>
            <img
              onClick={() => this.imageOnclick()}
              src={this.props.signinStore.userInfo.profile_picture}
              alt="profil_Picture"
            />
            {/* pensez a ajouter le panier */}
            <button onClick={this.onSignout} className="signout_btn">
              Sign out
            </button>
          </nav>
        </header>
      );
    }
    return <div className="main_container">{x}</div>;
  }
}

const mapStateToProps = (state) => ({
  signinStore: state.signin,
});
const mapDispatchToProps = {
  signoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
