import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// import {getSoloProductAction} from '../../storeRedux/actions/getSoloProductsActions'

class SoloProduct extends React.Component{
    constructor() {
        super();
    }

    //Functions
    componentDidMount(){

    }

    getProductById(){
    const headers = {
        "Content-Type": "application/json",
        authorization: this.props.signinStore.userToken,
        };
    axios.get(`http://localhost:8000/products/${this.props.listOfProducts.allProducts.data.id}`, {header: headers})
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })
    }

    render(){
        return(
            <div>
            
            </div>
        )
    }
}

export default connect()(SoloProduct);