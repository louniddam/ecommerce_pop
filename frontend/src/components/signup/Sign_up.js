import React from "react";
import Header from "../header/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      profile_picture: "",
      alreadyUse: false,
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
    };
    axios
      .post("http://localhost:8000/users/sign-up", formInfo)
      .then((response) => {
        if (response.data === "This email is already in use") {
          this.setState({
            alreadyUse: true,
          });
        } else if (response.data === "user well inserted") {
          this.setState({
            alreadyUse: false,
          });
          this.props.history.push("/");
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

        <Form onSubmit={this.onSubmitHandler}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={this.handleUsernameChange}
              type="text"
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmailSignup">
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

          <Form.Group controlId="formBasicPasswordSignpassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group>
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
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
