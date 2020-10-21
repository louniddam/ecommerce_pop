import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Header from "../header/Header";
import { withRouter } from "react-router";
class EditProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      newPrice:"",
      description: "",
      category: "",
      image: "",
      badProduct: false,
      item: [],
      falseProduct: false,
    };
  }
  componentDidMount() {
    this.getProductById();
    console.log("hello");
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

  handleProductnewpriceChange = (e) => {
    this.setState({
      newPrice: e.target.value,
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
      (input) => (input.value = "")
    );
    this.setState({
      itemvalues: [{}],
    });
  };

  formComplete = () => {
    console.log("aaa");
    let formInfo = {
      names: this.state.name,
      price: this.state.price,
      newPrice: this.state.newPrice,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
      id: this.props.productId.productId,
    };
    axios
      .put("http://localhost:8000/product/edit", formInfo)
      .then((response) => {
        if (response.data === "PRODUCT UPDATED")
          this.props.history.push("/profiluser");
        else {
          this.setState({
            falseProduct: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    if (this.state.item[0] !== undefined) console.log(this.state.item[0].id);
    return (
      <div>
        <Header></Header>
        <div className="wrapper_form">
          <div className="left_side">
            <img
              src={
                this.state.item[0] !== undefined
                  ? this.state.item[0].image
                  : "hello"
              }
              //   alt="e"
            />
          </div>

          <div className="right_side">
            <Form onSubmit={this.onSubmitHandler}>
              <Form.Group controlId="formBasicNameEditProduct">
                <span className="input-container">
                  <Form.Control
                    onChange={this.handleProductnameChange}
                    type="text"
                    placeholder="Product Name"
                    autoComplete="off"
                  />
                </span>
              </Form.Group>

              <Form.Group controlId="formBasicPriceEditProduct">
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

              <Form.Group controlId="formBasicNewPriceEditProduct">
                <span className="input-container">
                  <Form.Control
                    onChange={this.handleProductnewpriceChange}
                    type="number"
                    min="1"
                    step="0.1"
                    placeholder="Enter a new price"
                    autoComplete="off"
                  />
                </span>
              </Form.Group>

              <Form.Group controlId="formBasicCategoryEditProduct">
                <span className="input-container">
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    autoComplete="off"
                    onChange={this.handleProductcategoryChange}
                  />
                </span>
              </Form.Group>

              <Form.Group controlId="formBasicImageEditProduct">
                <span className="input-container">
                  <Form.Control
                    onChange={this.handleProductimageChange}
                    type="text"
                    autoComplete="off"
                    placeholder="Product image"
                  />
                </span>
              </Form.Group>

              <Form.Group controlId="textareaFormEditProduct">
                <Form.Label>Product description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  onChange={this.handleProductdescriptionChange}
                />
              </Form.Group>
              <button
                onClick={() => this.formComplete()}
                // onClick={() => this.handleReset()}
                variant="primary"
                type="submit"
                className="add_button"
              >
                Edit
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
  productId: state.productId,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProduct));
