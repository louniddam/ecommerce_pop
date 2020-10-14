import React from "react";
import SignIn from "../signin/Sign_in";
import Products from "../products/Products";
import Header from "../header/Header";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <p></p>
        <button>++ </button>
        <SignIn />
        <Products />
      </div>
    );
  }
}

export default Home;
