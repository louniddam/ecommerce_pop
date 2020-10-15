import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProductsAction } from "../../storeRedux/actions/getProductsActions";
import { getIdProductAction } from "../../storeRedux/actions/getProductIdActions"
class ListProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
    };
  }
  //Functions
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

  //Créer une function qui récup l'id du produit clické et le range dans le store avec la clé 'clickedProduct' qui servira de params dans SoloProduct
  clickedProduct = (e)=>{
    console.log(e.target);
    // this.setState({
    //   id: e.target.item.id
    // })

    // const id = this.state.id;
    // this.props.getIdProductAction(id)
  }

  render() {
    //Logs
    console.log(this.props);
    console.log(this.props.listOfProducts.allProducts.data);

    //Const
    const products = this.props.listOfProducts.allProducts.data

    return (
    <div>
s
      <ul>
    {products.map(item => (
      <li key={item.id} onClick={this.clickedProduct}>
        <div>{item.names}</div>
        <div>{item.price}</div>
        <div>{item.description}</div>
        <img src={item.image}/>
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
});
const mapDispatchToProps = { 
  getProductsAction,
  getIdProductAction
 };

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
