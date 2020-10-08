import React from 'react';
import Sign_in from '../signin/Sign_in';
import Products from '../products/Products';
import Header from '../header/Header';

class Home extends React.Component{


    render(){
        return(
            <div className="home">
                <Header/>
                <Sign_in/>
                <Products/>
            </div>
        );
    }
}

export default Home;
