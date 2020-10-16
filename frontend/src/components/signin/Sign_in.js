import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { signinAction } from "../../storeRedux/actions/signinActions";
import axios from "axios";
import jwt_decode from "jwt-decode";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      incorrect: false,
    };
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
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
  formComplete = () => {
    let formInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:8000/users/sign-in", formInfo)
      .then((response) => {
        if (response.data === "Email or Password is incorrect") {
          this.setState({
            incorrect: true,
          });
        } else if (response.data.auth) {
          let tokenDecoded = jwt_decode(response.data.token);

          this.setState({
            incorrect: false,
          });
          console.log(tokenDecoded);
          this.props.signinAction({ tokenDecoded, token: response.data.token });
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <Form onSubmit={this.onSubmitHandler}>
          <Form.Group controlId="formBasicEmail">
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button
            onClick={() => this.formComplete()}
            variant="primary"
            type="submit"
          >
            Sign in
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = { signinAction };
const mapStateToProps = (state) => ({
  signinStore: state.signin,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
