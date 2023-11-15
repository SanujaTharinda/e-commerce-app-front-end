import React, { useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ProfileUpdate from '../components/ProfileUpdate';
import OrdersTable from '../components/OrdersTable';
import { getAuthDetails } from './../store/auth';
import {getOrderByCustomerId,getAllOrders, loadOrders} from './../store/entities/orders'

function UserProfile(props) {
    const dispatch = useDispatch();
    const userData = useSelector(getAuthDetails);
    const orderData = useSelector(getOrderByCustomerId(userData.customerId));

    useEffect(() => {
        dispatch(loadOrders());
        console.log(orderData);
    });

    return (
        <Container>
            <Row>
                <Col className="px-3" md={4}><ProfileUpdate userData={userData}/></Col>
                {orderData.length > 0 ? 
                <Col md={8}><OrdersTable orderData={orderData} heading={"My Orders"}/></Col> :
                <Col md={8}><Container className ='empty-cart-message' fluid><Row  className='my-5'><Col><h5 className ='py-3'>You Have Not Placed Any Orders Yet...</h5></Col></Row></Container></Col>
                }
            </Row>
        </Container>
    );
}export default UserProfile;






