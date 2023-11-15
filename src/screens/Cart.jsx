import React from 'react';
import { Row, Col, Card, Button, Table, Image, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInStatus } from '../store/auth';
import { getItemsInCart, emptyCart, removeFromCart } from './../store/cart';
import { setCheckOutStarted } from './../store/auth';
import { toastAction } from './../store/toastAction';

function Cart({history}) {
    const dispatch = useDispatch();
    const items = useSelector(getItemsInCart);
    const loggedIn = useSelector(getLoggedInStatus);

    return (
        <>
            <h1 className ='my-3' >Shopping Cart</h1>
            <Row>
                <Col lg="8">
                    {items.length>0 ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Variant Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                             <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(i => 
                                <tr>
                                    <td><Image className = 'cart-image' src={`http://localhost:8000/files/${i.productId}.jpg`}/></td>
                                    <td>{i.title}</td>
                                    <td>{i.variantName}</td>
                                    <td>{i.unitPrice}</td>
                                    <td>{i.quantity}</td>
                                    <td>
                                        <i 
                                            className="cart-delete fas fa-trash" 
                                            onClick={() => dispatch(removeFromCart(i.productId, i.variantName))}
                                        >
                                        </i>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table> : (<Container className ='empty-cart-message' fluid><Row><Col><h5 className ='py-3'>Your Cart Is Empty</h5></Col></Row></Container>)}
                
                </Col>

                <Col lg="4">
                    <Card>
                        <Card.Body>
                            <h2 className ='my-3'>Total {getTotalNumberOfItems(items)} items</h2>
                            <hr></hr>
                            <Card.Title>Total Amount: ${getTotalPrice(items)}</Card.Title>
                            <hr></hr>
                            <Button 
                                disabled={items.length>0 ? false : true}
                                onClick = {() => {
                                    if(!loggedIn){
                                        history.push("/login");
                                        dispatch(setCheckOutStarted());
                                        dispatch(toastAction({ message: "Please Login Before Checkout...", type: 'info'}))
                                    }else{
                                        history.push("/buyMethod");
                                    }
                                
                            }}>
                                Proceed To Checkout
                            </Button>
                            <Button 
                                className = 'btn-danger mx-2 my-3'
                                onClick = {() => {
                                    dispatch(emptyCart());
                                    dispatch(toastAction({ message: "Cart Emptied...", type: 'info'}))
                                }}
                                
                            >
                                    Empty Cart
                            </Button>
                        </Card.Body>

                    </Card>
                    
                        
                
                </Col>
            </Row>
        
        </>
    );
}

export default Cart;


function getTotalNumberOfItems(items){
    let count = 0;
    for(let item of items)
        count = count + parseInt(item.quantity);
    return count;
}

function getTotalPrice(items){
    let total = 0;
    for(let item of items)
        total = total + item.total;
    return total.toFixed(2);
}