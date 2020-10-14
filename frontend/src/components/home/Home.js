import React from "react";
import SignIn from "../signin/Sign_in";
import Header from "../header/Header";
import ListProducts from "../ListProducts/ListProducts";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <p></p>
        <button>++ </button>
        <SignIn />
        <ListProducts />
      </div>
    );
  }
}

export default Home;
