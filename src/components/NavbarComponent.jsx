import React, { useEffect, useState } from 'react';
import {Navbar,FormControl, Nav,NavDropdown, Button, InputGroup, Dropdown} from 'react-bootstrap';
import { LinkContainer,Link } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function NavbarComponent() {
    let history = useHistory();
    const auth = useSelector(state => state.auth);
    const [searchKeyword, setSearchKeyword ] = useState('');

    useEffect(() => {
        console.log(auth);
    });

    return (
        <>
            <Navbar className="back" >
                <LinkContainer to ='/'><Navbar.Brand><h2 class="sitename">C E-Commerce</h2></Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <InputGroup id = 'product-search-bar'>
                            <FormControl
                                placeholder="Search products..."
                                aria-label="searchProduct"
                                aria-describedby="basic-addon2"
                                size = 'lg'
                                value = {searchKeyword}
                                onChange = { e => setSearchKeyword(e.target.value)}
                            />
                            <InputGroup.Append id = 'product-search-button'>
                                <Button 
                                    className = 'pl-2.5 pr-2.5' 
                                    variant="primary" 
                                    onClick = {() => {
                                        history.push(`/search?filterBy=${searchKeyword}`)
                                    }}
                                >
                                    Search
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    <Nav className="ml-auto">
                        <LinkContainer to = '/cart'>
                            <Nav.Link className = 'navbar-item'><i className="fas fa-shopping-cart"></i><span>Cart</span></Nav.Link>
                        </LinkContainer>
                        {!auth.loggedIn  && <LinkContainer to = '/login'>
                            <Nav.Link className = 'navbar-item'><span>Login</span></Nav.Link>
                        </LinkContainer>}

                        {auth.loggedIn && <LinkContainer to = '/profile'>
                            <Nav.Link className = 'navbar-item'><i className="fas fa-user"></i><span>{auth.data.firstName}</span></Nav.Link>
                        </LinkContainer>}

    

                        {auth.loggedIn && (auth.data.usertype==='Administrator' || auth.data.usertype==='Operator') && 
                        <Dropdown className="my-2 dropdown">
                        
                            <Dropdown.Toggle   className='dropdown-toogle'>
                                {auth.data.usertype}
                            </Dropdown.Toggle>

                            <Dropdown.Menu  className='dropdown-menu'>

                                <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/products'>
                                        <Nav.Link ><span>Manage Products</span></Nav.Link>
                                </LinkContainer></Dropdown.Item>
                                
                                <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/orders'>
                                        <Nav.Link ><span>Manage Orders</span></Nav.Link>
                                </LinkContainer></Dropdown.Item>

                                { auth.data.usertype==='Administrator' && <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/customers'>
                                        <Nav.Link ><span>Manage Customers</span></Nav.Link>
                                </LinkContainer></Dropdown.Item>}

                                {auth.data.usertype==='Administrator' && <Dropdown.Item  ><LinkContainer className="dropdown-item" to = '/users'>
                                        <Nav.Link ><span>Manage Users</span></Nav.Link>
                                </LinkContainer></Dropdown.Item>}

                            </Dropdown.Menu>
                        </Dropdown>}



                        {auth.loggedIn && <LinkContainer to = '/logout'>
                            <Nav.Link className = 'navbar-item'><span>Logout</span></Nav.Link>
                        </LinkContainer>}
                    </Nav>
                </Navbar.Collapse>
               
            </Navbar>
        </>  
    );
}

export default NavbarComponent;