import React from "react";
import SignIn from "../signin/Sign_in";
import Products from "../products/Products";
import Header from "../header/Header";
import { connect } from "react-redux";
import { increment } from "../../storeRedux/actions";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <p>{this.props.counter}</p>
        <button onClick={() => this.props.increment()}>++ </button>
        <SignIn />
        <Products />
      </div>
    );
  }
}
const mapDispatchToProps = { increment };
const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
