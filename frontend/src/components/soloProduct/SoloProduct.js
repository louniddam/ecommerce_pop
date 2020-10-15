import React from "react";
import axios from "axios";
import { connect } from "react-redux";
// import {getSoloProductAction} from '../../storeRedux/actions/getSoloProductsActions'

class SoloProduct extends React.Component {
  constructor() {
    super();

    this.state = {
      item: [],
    };
  }

  //Functions
  componentDidMount() {
    this.getProductById();
  }
  comp;
  getProductById() {
    const headers = {
      "Content-Type": "application/json",
      authorization: this.props.signinStore.userToken,
    };
    axios
      .get(`http://localhost:8000/products/${this.props.productId.productId}`, {
        headers: headers,
      })
      .then((response) => {
        this.setState({
          item: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.item);
    console.log(this.props.signinStore.userToken);
    const product = this.state.item;
    return (
      <div>
        {product.map((elem) => (
          <li key={elem.id}>{elem.name}</li>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  productId: state.productId,
  signinStore: state.signin,
});
export default connect(mapStateToProps)(SoloProduct);
