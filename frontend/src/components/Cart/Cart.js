import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Header from "../header/Header";
import { addToTheCart } from "../../storeRedux/actions/addToCartActions";
import Axios from "axios";
class Cart extends React.Component {
  constructor() {
    super();
  }

  prepareCartPost = () => {
    let tab = [];
    for(let i = 0; i < this.props.cartR.product.length; i++){
      tab.push({
        names: this.props.cartR.product[i].p.names,
        price: this.props.cartR.product[i].p.price,
        new_price: this.props.cartR.product[i].p.new_price,
        description: this.props.cartR.product[i].p.description,
        category: this.props.cartR.product[i].p.category,
        id: this.props.cartR.product[i].p.id,
        image: this.props.cartR.product[i].p.image,
      })
    }
    Axios.post('http://localhost:8000/add-cart', tab)
    .then((response) =>{
      console.log(response);
    })
  }


  render() {
    console.log(this.props.cartR.product[0].p, "iam cartR");
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
        <button onClick={this.prepareCartPost()}>pouet</button>
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
