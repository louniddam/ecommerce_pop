import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../header/Header";
import { withRouter } from "react-router";
import { getProductsAction } from "../../storeRedux/actions/getProductsActions";
import { getIdProductAction } from "../../storeRedux/actions/getProductIdActions";
class ProfilUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      profile_picture: "",
      failEdit: "",
      allProduct: [],
      id: "",
    };
  }
  componentDidMount() {
    if(this.props.signinStore.userToken)
    this.getAllProductsUser();
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
  };
  handleUsernameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleProfilePictureChange = (e) => {
    this.setState({
      profile_picture: e.target.value,
    });
  };
  formComplete = () => {
    let formInfo = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      profile_picture: this.state.profile_picture,
      id: this.props.signinStore.userInfo.id,
    };
    axios
      .put("http://localhost:8000/users/edit", formInfo)
      .then((response) => {
        if (response.data === "ALL OK") {
          this.setState({
            failEdit: "false",
          });
        } else {
          this.setState({
            failEdit: "true",
          });
          console.log('lol');
          this.props.history.push('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getAllProductsUser() {
    axios
      .get(
        `http://localhost:8000/products/user/${this.props.signinStore.userInfo.id}`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          allProduct: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  clickedProduct = (itemId) => {
    this.setState({
      id: itemId,
    });
    this.props.getIdProductAction(itemId);
    this.props.history.push("/edit-product");
  };
  deleteProduct = (itemId) => {
    let x = itemId;
    axios
      .delete(`http://localhost:8000/product/delete/${x}`)
      .then((response) => {
        if (response.data === "PRODUCT DELETED") {
          this.getAllProductsUser();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <Header></Header>
        <h1>EDIT YOUR PROFILE</h1>
        <Form onSubmit={this.onSubmitHandler}>
          <Form.Group controlId="formBasicNameEditProfil">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={this.handleUsernameChange}
              type="text"
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmailEditProfil">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={this.handleEmailChange}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPasswordEditProfil">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicImageEditProfil">
            <Form.Label>Profile Picture:</Form.Label>
            <Form.Control
              onChange={this.handleProfilePictureChange}
              type="text"
              placeholder="Name"
            />
          </Form.Group>

          {/* <Form.Group controlId="formBasicPassword">
            <Form.Label>Reapeat Password</Form.Label>
            <Form.Control type="password" placeholder="Reapeat Password" />
          </Form.Group> */}

          <Button
            onClick={() => this.formComplete()}
            variant="primary"
            type="submit"
          >
            Edit
          </Button>
        </Form>

        <h2>EDIT YOUR PRODUCTS</h2>
        <ul>
          {this.state.allProduct.map((item) => (
            <li className="li_solo_product" key={item.id}>
              <div className="card_product">
                <div className="names_product">{item.names}</div>
                <img className="image_product" src={item.image} alt="product img"/>
                <div className="price_product">{item.price}</div>
                <div className="newprice_product">{item.new_price}</div>
                <div className="description_product">{item.description}</div>
                <button
                  className="btn"
                  onClick={() => this.clickedProduct(item.id)}
                >
                  EDIT
                </button>
                <button
                  className="btn"
                  onClick={() => this.deleteProduct(item.id)}
                >
                  DELETE
                </button>
                <div>More Info</div>
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
});
const mapDispatchToProps = {
  getProductsAction,
  getIdProductAction,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilUser));
