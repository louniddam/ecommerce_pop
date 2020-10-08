import React from 'react';

class Header extends React.Component{
    render(){
        return(
                <header>
                    <nav>
                        <h1>Olou</h1>
                        <button>Sign in</button>
                        <button>Sign up</button>
                    </nav>
                </header>
        );
    }
}

export default Header;