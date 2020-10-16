import React from "react";
import Header from "../header/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { addProductAction } from "../../storeRedux/actions/ProductFormActions";
import axios from "axios";

class Product_form extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
      badProduct: false,
    };
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
  };

  handleProductnameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleProductpriceChange = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  handleProductdescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleProductcategoryChange = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  handleProductimageChange = (e) => {
    this.setState({
      image: e.target.value,
    });
  };

  formComplete = () => {
    let formInfo = {
      names: this.state.name,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
      user_affiliate: this.props.signinStore.userInfo.id,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: this.props.signinStore.userToken,
    };
    axios
      .post("http://localhost:8000/products", formInfo, { headers: headers })
      .then((response) => {
        console.log(response);
        if (response.data.name === "JsonWebTokenError") {
          this.props.history.push("/");
          this.setState({
            badProduct: true,
          });
        } else if (this.props.signinStore.userToken.length) {
          this.props.addProductAction(formInfo);
          this.setState({
            badProduct: false,
          });
          console.log("k");
        } else {
          console.log("bugguouille");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    console.log(this);
    return (
      <div>
        <Header></Header>
        <Form onSubmit={this.onSubmitHandler}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={this.handleProductnameChange}
              type="text"
              placeholder="Product Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={this.handleProductpriceChange}
              type="number"
              min="1"
              step="0.1"
              placeholder="Enter price"
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Short description</Form.Label>
            <Form.Control
              onChange={this.handleProductdescriptionChange}
              type="text"
              placeholder="description"
            />
          </Form.Group>

          <Form.Group controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              onChange={this.handleProductcategoryChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicImage">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              onChange={this.handleProductimageChange}
              type="text"
              placeholder="Product image"
            />
          </Form.Group>

          <Button
            onClick={() => this.formComplete()}
            variant="primary"
            type="submit"
          >
            Add Product
          </Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  signinStore: state.signin,
});
const mapDispatchToProps = { addProductAction };
export default connect(mapStateToProps, mapDispatchToProps)(Product_form);
