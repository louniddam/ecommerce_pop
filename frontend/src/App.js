import React from 'react';
import './App.css';
import Home from './components/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Home/>
        <p>Degage</p>
      </div>
    );
  }
 
}

export default App;
