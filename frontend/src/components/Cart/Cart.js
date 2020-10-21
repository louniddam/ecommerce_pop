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
    const products = this.props.cartR.product;
    return (
      <div>
        <Header></Header>
        <div>{this.props.cartR.totalPrice}</div>

        <ul>
          {products.map((item) => (
            <li className="li_solo_product" key={item.p.id}>
              <div className="card_product">
                <div className="names_product">{item.p.names}</div>
                <img className="image_product" src={item.p.image} />
                <div className="price_product">{item.p.price}</div>
                <div className="price_product">{item.p.new_price}</div>
                <div className="description_product">{item.p.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartR: state.cart,
  listProductR: state.listOfProducts,
});
const mapDispatchToProps = { addToTheCart };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
