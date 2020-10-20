import React from "react";
import axios from "axios";
import '../ListProducts/ListProducts.css'
import { connect } from "react-redux";
import { getProductsAction } from "../../storeRedux/actions/getProductsActions";
import { getIdProductAction } from "../../storeRedux/actions/getProductIdActions";
import { addToTheCart } from "../../storeRedux/actions/addToCartActions";
import {removeToTheCart} from "../../storeRedux/actions/removeToCartActions"
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
  addToCart = (item) => {
    console.log(item);
    this.props.addToTheCart(item);
  };
  removeToCart = (item) => {
    this.props.removeToTheCart(item)
  }
  render() {
    const products = this.props.listOfProducts.allProducts;

    return (
      <div>
        <ul>
          {products.map((item) => (
            <li className="li_solo_product" key={item.id}>
              <div className="card_product">
                <div className="names_product">{item.names}</div>
                <img className="image_product" src={item.image} />
                <div className="price_product">{item.price}</div>
                <div className="description_product">{item.description}</div>
                <button onClick={() => this.addToCart(item)}>
                  ADD TO CART
                </button>
                <button onClick={() => this.removeToCart(item)}>
                  REMOVE 1 TO CART
                </button>
                <button onClick={() => this.clickedProduct(item.id)}>
                  More Info
                </button>
              </div>
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
  addToTheCart,
  removeToTheCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListProducts));
