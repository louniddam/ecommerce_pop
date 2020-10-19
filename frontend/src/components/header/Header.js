import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../header/Header.css'
import { connect } from "react-redux";
import {signoutAction} from "../../storeRedux/actions/signoutActions"
class Header extends React.Component {
  
  onSignout = () => {
    this.props.signoutAction()
  }
  
   
  
  render() {
    let x ;
    console.log(this.props.signinStore.userToken);
    if(this.props.signinStore.userToken == null){
        x = (<header className="header">
          <nav className="nav">
          <Link className="nav_link"  to="/">Home</Link>
          <Link className="nav_link"  to="/signup">Signup</Link>
          </nav>
        </header>)
         
      }else if (this.props.signinStore.userToken){
         x =  (<header className="header">
        <nav className="nav">
        <Link className="nav_link"  to="/">Home</Link>
        
        <Link className="nav_link"  to="/productform">Product Form</Link>
        {/* pensez a ajouter le panier */}
        <button onClick={this.onSignout} className="signout_btn">Sign out</button>
        </nav>
      </header>)
    }
    return(<div className="main_container">{x}</div>)
   
  }
}

const mapStateToProps = (state) => ({
  signinStore: state.signin,
});
const mapDispatchToProps = {
signoutAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);


