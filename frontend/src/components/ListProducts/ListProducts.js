import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProductsAction } from "../../storeRedux/actions/getProductsActions";
class ListProducts extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.getAllProducts();
  }
  getAllProducts() {
    const headers = {
      "Content-Type": "application/json",
      authorization: this.props.signinStore.userToken,
    };
    axios
      .get("http://localhost:8000/products", { headers: headers })
      .then((response) => {
        this.props.getProductsAction(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    console.log(this.props);
    return <div></div>;
  }
}
const mapStateToProps = (state) => ({
  signinStore: state.signin,
  listOfProducts: state.listOfProducts,
});
const mapDispatchToProps = { getProductsAction };
export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
