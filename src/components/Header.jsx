import React from 'react';
import NavbarComponent from './NavbarComponent';

function Header() {

    return (
        <div>
            <NavbarComponent
                value = '' 
                placeholder = 'Search'
                type = 'text'  
            >
            </NavbarComponent>
        </div>
    );
}

export default Header;