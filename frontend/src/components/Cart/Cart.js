import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Header from "../header/Header";
import { addToTheCart } from "../../storeRedux/actions/addToCartActions";
class Cart extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.cart);
    console.log(this.props);
    return (
      <div>
        <Header></Header>
        <p>hello</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cart: state.cart,
});
const mapDispatchToProps = { addToTheCart };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
