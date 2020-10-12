import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { signup } from "../../storeRedux/actions/signupAction";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
    };
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
  formComplete = () => {
    return {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmitHandler}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={this.handleUsernameChange}
              type="text"
              placeholder="Name"
            />
          </Form.Group>

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

          {/* <Form.Group controlId="formBasicPassword">
            <Form.Label>Reapeat Password</Form.Label>
            <Form.Control type="password" placeholder="Reapeat Password" />
          </Form.Group> */}

          <Button
            onClick={() => this.props.signup(this.formComplete())}
            variant="primary"
            type="submit"
          >
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = { signup }; //
const mapStateToProps = (state) => {
  return {
    signup: state.signup,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
