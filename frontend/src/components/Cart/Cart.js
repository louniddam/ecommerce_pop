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
    const products = this.props.cart.product;
    console.log(products);

    return (
      <div>
        <Header></Header>
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
  cart: state.cart,
});
const mapDispatchToProps = { addToTheCart };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
