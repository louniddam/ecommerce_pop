import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import {getSoloProductAction} from '../../storeRedux/actions/getSoloProductsActions'
import { addToTheCart } from "../../storeRedux/actions/addToCartActions";
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

  addToCart = (elem) => {
    console.log(elem);
    this.props.addToTheCart(elem);
    this.props.history.push('/');
  };

  render() {
    const product = this.state.item;

    return (
      <div>
        {product.map((elem) => (
          <li className="li_solo_product" key={elem.id}>
            <div className="card_product">
              <div className="name_creator">{elem.name}</div>
              <div className="names_product">{elem.names}</div>
              <img className="image_product" src={elem.image} alt="product_img" />
              <div className="price_product">{elem.price}</div>
              <div className="description_product">{elem.description}</div>
              <button onClick={() => this.addToCart(elem)}>ADD TO CART</button>
            </div>
          </li>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  productId: state.productId,
  signinStore: state.signin,
});
const mapDispatchToProps = { addToTheCart };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SoloProduct));
