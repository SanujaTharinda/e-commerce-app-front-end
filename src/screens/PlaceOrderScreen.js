import React, {useEffect} from 'react'
import {Form, Button, Col,Row,ListGroup,Image,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps'
import { getLoggedInStatus, getAuthDetails ,getAllAuthDetails, setCheckOutStarted,buyMethodSelected,shippingAddressSelected,paymentMethodSelected} from '../store/auth';
import { getItemsInCart } from './../store/cart';
import { toastAction } from './../store/toastAction';
import {placeOrder, getOrderPlacedStatus } from '../store/entities/orders';

const PlaceOrderScreen= ({history})=>{ 
    const dispatch = useDispatch();
   // let orderDetails =[];
    const mainCities=["ambalangoda","balapitiya","hikkaduwa","rathgama","galle",
                    "beruwala","aluthgama","colombo","negambo","kaluthara","moratuwa",
                    "panadura","piliyandala","rathmalana","matara","hambanthota","akurassa",
                    "maradhana","mirissa"];
    const items = useSelector(state => state.cart)
    console.log(items);
    
    const deliverMethodDetails = useSelector(buyMethodSelected);
    const shippingAddressDetails = useSelector(shippingAddressSelected);
    const paymentMethodDetails = useSelector(paymentMethodSelected);
    const customerDetails = useSelector(getAuthDetails);
    const customerAllDetails = useSelector(getAllAuthDetails);
    let paymentMethodId;
    if (customerAllDetails.paymentMethod==='paypal') {
        paymentMethodId='1' ;  
    } else {
        paymentMethodId='2' ;
    }

    const orderDetails ={
        "customerId":customerDetails.customerId,
        // "orderDate":Date.now(),
        "orderStatusId":'1',
        // "comments":"",
        // "dispatchedDate":"",
        "shipping":customerAllDetails.shippingAddress,
        "paymentMethodId":paymentMethodId,
        "deliveryMethod":customerAllDetails.buyMethod,
        "products":items
    }

   // orderDetails.push(customerDetails.customerId);
   // orderDetails.push(items);
    console.log(customerAllDetails);
    console.log(orderDetails.shipping.city);
    //const {customerDetails.customerId, }
    const loggedIn = useSelector(getLoggedInStatus);
    const orderPlaced = useSelector(getOrderPlacedStatus);

    useEffect(() => {
        if(orderPlaced){
            dispatch(toastAction({ message: "Order Placed Success...", type: 'info' }));
            window.location ='/profile';
        }
    });

    return(
        
        <>
        {/*<CheckoutSteps step1 step2 step3 step4 step5/>*/}
        <Row>
            <Col md={8} className='my-5'>
            { orderDetails.deliveryMethod==="HomeDelivery" ?
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Addresss : <div className='mx-4'>{orderDetails.shipping.address}<br></br>
                                            {orderDetails.shipping.city}<br></br>
                                            {orderDetails.shipping.state}</div></strong>
                    </p>
                </ListGroup.Item> : <br></br>} 

                <ListGroup.Item>
                    <h2>Buy Method</h2>
                    <p>
                        <strong>Method : {orderDetails.deliveryMethod}</strong>
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method : {customerAllDetails.paymentMethod}</strong>
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3 style={{marginBottom:'30px'}}>Order Summary</h3>
                    {items.map(i => 
                    <Row className='my-2 mx-2'>
                        <Card style={{width:'100%'}}>
                        <Col style={{display:'flex'}}>
                            {/*<Link to = {`/products/${i.productId}`}>*/}
                                <Card.Img src={`http://localhost:8000/files/${i.productId}.jpg`}  variant = 'top' style={{height:'7rem', width:'8rem', marginTop:'0.5rem'}}/>
                            {/*</Link>*/}
    
                            <Card.Body style={{marginLeft:'20px'}}>
                                {/*<Link to = {`/products/${i.productId}`}>*/}
                                    <Card.Title as='div' style={{fontSize:'17px', fontWeight:'500'}}><strong>{i.title}</strong></Card.Title>
                                {/*</Link>*/}
                                {/*<Card.Text as = 'div'><Rating rating = {rating} message = {rating === 0 ? "This Product has not been rated yet" : `${rating} From ${product.reviews.length} Reviews`}></Rating></Card.Text>*/}
                                <Card.Text as = 'div'><h3 style={{fontSize:'17px'}}>${i.unitPrice}</h3></Card.Text>
                                <Card.Text as = 'div'><h3 style={{fontSize:'15px'}}>Order quantity: {i.quantity}</h3></Card.Text>
                            </Card.Body>
                        </Col>
                        </Card>
                    </Row>
                    )}

                </ListGroup.Item>
            </Col>

            <Col lg={4}>
                <Card className='my-5'>
                        <Card.Body>
                            <h2 className ='my-3'>Total {getTotalNumberOfItems(items)} items</h2>
                            <hr></hr>
                            <Card.Title>Total Amount: <strong style={{fontSize:'20px', marginLeft:'0.5rem'}}>${getTotalPrice(items)}</strong></Card.Title>
                            <hr></hr>
                            {mainCities.includes((orderDetails.shipping.city).toLowerCase()) ?
                                <Card.Title >You are in a main city :<br></br><br></br>
                                            <strong>Appproximate delivery time is 5 days</strong>
                                </Card.Title>
                                :
                                <Card.Title>You are not in a main city :<br></br><br></br>
                                    <strong>Appproximate delivery time is 7 days</strong>
                                </Card.Title>

                            }
                              
                               
                                
                                    
                                

                            <Button className = 'my-3' style={{width:'100%', fontSize:'15px'}}
                                disabled={items.length>0 ? false : true}
                                onClick = {() => {
                                    if(!loggedIn){
                                        history.push("/login");
                                        dispatch(setCheckOutStarted());
                                        dispatch(toastAction({ message: "Please Login Before Checkout...", type: 'info'}))
                                    }else{
                                        dispatch(placeOrder (orderDetails));
                                    }
                                
                            }}>
                                Place Order
                            </Button>

                        </Card.Body>

                    </Card>
            
            </Col>

        </Row>

        </>
    )
}

export default PlaceOrderScreen;

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