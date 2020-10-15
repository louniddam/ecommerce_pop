import React from "react";
import SignIn from "../signin/Sign_in";
import Header from "../header/Header";
import ListProducts from "../ListProducts/ListProducts";
import { connect } from "react-redux";

class Home extends React.Component {
  constructor() {
    super();
  }
  render() {
    const token = this.props.signinStore.userToken;
    return (
      <div className="home">
        <Header />

        {token ? <ListProducts /> : <SignIn />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinStore: state.signin,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
