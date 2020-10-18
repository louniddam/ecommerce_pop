import React from "react";
import Header from "../header/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../ProductForm/ProductForm.css"
import popimg from '../ProductForm/pop_form.png'
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

  handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({
      itemvalues: [{}]
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
          this.input_name.value = "";
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

        <div className="wrapper_form">

          <div className="left_side">
            <img src={popimg}/>
          </div>

          <div className="right_side">
            <Form onSubmit={this.onSubmitHandler} >

              <Form.Group controlId="formBasicName">
                <span className="input-container">
                <Form.Control
                  onChange={this.handleProductnameChange}
                  type="text"
                  placeholder="Product Name"
                  autoComplete="off"
                />
                </span>
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <span className="input-container">
                  <Form.Control
                    onChange={this.handleProductpriceChange}
                    type="number"
                    min="1"
                    step="0.1"
                    placeholder="Enter price"
                    autoComplete="off"
                  />
                </span>
              </Form.Group>

              <Form.Group controlId="formBasicCategory">
                <span className="input-container">
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    autoComplete="off"
                    onChange={this.handleProductcategoryChange}
                  />
                </span>
              </Form.Group>

              {/* <Form.Group controlId="formBasicDescription">
                <Form.Label>Short description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  onChange={this.handleProductdescriptionChange}
                />
              </Form.Group> */}

              <Form.Group controlId="formBasicImage">
                <span className="input-container">
                  <Form.Control
                    onChange={this.handleProductimageChange}
                    type="text"
                    autoComplete="off"
                    placeholder="Product image"
                  />
                </span>
              </Form.Group>

              <Form.Group controlId="textareaFormProduct">
                  <Form.Label>Product description</Form.Label>
                  <Form.Control as="textarea" rows="3" onChange={this.handleProductdescriptionChange} />
                </Form.Group>
                <button
                  onClick={() => this.formComplete()}
                  onClick={() => this.handleReset()}
                  variant="primary"
                  type="submit"
                  className="add_button"
                >
                  Add
                </button>
            </Form>
          </div>      
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  signinStore: state.signin,
});
const mapDispatchToProps = { addProductAction };
export default connect(mapStateToProps, mapDispatchToProps)(Product_form);
