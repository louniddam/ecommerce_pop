import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProductsAction } from "../../storeRedux/actions/getProductsActions";
import { getIdProductAction } from "../../storeRedux/actions/getProductIdActions";

import { withRouter } from "react-router";
class ListProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      // products: [],
    };
  }
  //Functions
  componentDidMount() {
    if (this.props.signinStore.userToken) this.getAllProducts();
  }
  getAllProducts() {
    const headers = {
      "Content-Type": "application/json",
      authorization: this.props.signinStore.userToken,
    };
    axios
      .get("http://localhost:8000/products", { headers: headers })
      .then((response) => {
        console.log(response);
        this.props.getProductsAction(response.data);
        // this.setState({
        //   products: response.data,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Créer une function qui récup l'id du produit clické et le range dans le store avec la clé 'clickedProduct' qui servira de params dans SoloProduct
  clickedProduct = (itemId) => {
    this.setState({
      id: itemId,
    });
    this.props.getIdProductAction(itemId);
    this.props.history.push("/solo-product");
  };

  render() {
    //Logs
    // console.log(this.props);
    // console.log(this.props.listOfProducts.allProducts.data);

    // //Const
    const products = this.props.listOfProducts.allProducts;
    // console.log(prod);
    // console.log(products);
    return (
      <div>
        <ul>
          {products.map((item) => (
            <li key={item.id} onClick={() => this.clickedProduct(item.id)}>
              <div>{item.names}</div>
              <div>{item.price}</div>
              <div>{item.description}</div>
              <img src={item.image} />
              <div>More info</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  signinStore: state.signin,
  listOfProducts: state.listOfProducts,
  productId: state.productId,
});
const mapDispatchToProps = {
  getProductsAction,
  getIdProductAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListProducts));
