import React , { useEffect }from 'react'
import {Form, Button, Col,Row,ListGroup,Image,Card} from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps'
import { getLoggedInStatus, getAuthDetails , setCheckOutStarted} from '../store/auth';
import { getItemsInCart } from './../store/cart';
import { toastAction } from './../store/toastAction';
import {placeOrder } from '../store/entities/orders';
import { getAllOrders, loadOrders, getOrderById, updateOrderStatus} from './../store/entities/orders';
import {getProductByIds} from './../store/entities/products';

const PlaceOrderScreen= ({match})=>{
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const userData = useSelector(getAuthDetails);
    const orderData = useSelector(getOrderById(match.params.orderId));
    console.log(orderData);

    /* const productData = orderData.items;
    let pr=[];
    for(let i=0; i<productData.length;i++){
        pr.push(productData[i].productId);
    }
    
    console.log(pr);  
    
    const productDatas = useSelector(getProductByIds(pr));
    console.log(productDatas); */

    useEffect(() => {
        console.log("Loading")
        dispatch(loadOrders());
    });

    return(
            
        <> 

        <Row>
            <Col md={6}><h3 className='my-4 '>ORDER ID: {orderData.orderId}</h3></Col>
            <Col sm={6}>
                {auth.data.usertype==='Administrator' || auth.data.usertype==='Operator' ?
                <Link className='btn btn-light my-3 mx-5 ' to='/orders'>
                    Go Back
                </Link>:
                <Link className='btn btn-light my-3 mx-5 ' to='/profile'>
                    Go Back
                </Link>
                }
            </Col> 
        </Row>
         
        <Row>

            <Col md={8} className='my-3'>
                <ListGroup.Item>
                    <h3>Shipping</h3>
                    <p>
                        <strong>Address:</strong>
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Payment Method</h3>
                    <p>
                        <h5>{orderData.payment}</h5>
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Order Status</h3>
                    <p style={{backgroundColor:'lightgreen' , padding:'8px'}}>
                        <h5>{orderData.orderStatusId==='1'? 'Pending': orderData.orderStatusId==='2'? 'On the way': 'Delivered'}</h5>
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3 style={{marginBottom:'30px'}}>Order Summary</h3>
                    {orderData.items.map(i => 
                    <Row className='my-2 mx-2'>
                        <Card style={{width:'100%'}}>
                        <Col style={{display:'flex'}}>                           
                            <Card.Img src={`http://localhost:8000/files/${i.productId}.jpg`}  variant = 'top' style={{height:'7rem', width:'8rem', marginTop:'0.5rem'}}/>                            
                            <Card.Body style={{marginLeft:'20px'}}> 
                                <Card.Text as='div' style={{fontSize:'17px', fontWeight:'500'}}><strong>{i.product}</strong></Card.Text>                              
                                <Card.Text as='div' style={{fontSize:'17px', fontWeight:'500'}}>Variant: {i.variantName}</Card.Text>                                   
                                <Card.Text as = 'div'><h3 style={{fontSize:'17px'}}>Price: ${i.unitPrice}</h3></Card.Text>
                                <Card.Text as = 'div'><h3 style={{fontSize:'15px'}}>Quantity: {i.quantity}</h3></Card.Text>
                            </Card.Body>
                        </Col>
                        </Card>
                    </Row>
                    )}

                </ListGroup.Item>
            </Col>

            <Col lg={4}>
                <Card className='my-3'>
                        <Card.Body>
                            <h2 className ='my-3'>Total {getTotalNumberOfItems(orderData.items)} items</h2>
                            <hr></hr>
                            <Card.Title>Total Amount: <strong style={{fontSize:'20px', marginLeft:'0.5rem'}}>${getTotalPrice(orderData.items)}</strong></Card.Title>
                            <hr></hr>
                            {auth.loggedIn && (auth.data.usertype==='Administrator' || auth.data.usertype==='Operator') && 
                            <Button disabled={orderData.orderStatusId==='3' ? true:false}
                            onClick={()=>dispatch(updateOrderStatus(orderData.orderId,setOrderStatusId(orderData.orderStatusId)))} className = 'my-3' style={{width:'100%', fontSize:'15px'}}>
                                {orderData.orderStatusId==='1' && 
                                    <h4>Set to On the Way</h4>
                                }
                                {orderData.orderStatusId==='2' && 
                                    <h4>Set to Delivered</h4>
                                }
                                {orderData.orderStatusId==='3' && 
                                    <h4>Already Delivered</h4>
                                }
                            </Button>}
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
        total = total + item.unitPrice;
    return total.toFixed(2);
}

function setOrderStatusId(id){
    let statusId =parseInt(id)+1;
    statusId= statusId.toString();
    return statusId;
}