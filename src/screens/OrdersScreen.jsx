import { useSelector, useDispatch } from 'react-redux';
import {useEffect} from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import OrdersTable from './../components/OrdersTable';
import { getAllOrders , loadOrders} from './../store/entities/orders';


const OrdersScreen = () => {
    const dispatch = useDispatch()

    const orders = useSelector(getAllOrders);

    useEffect(() => {
        dispatch(loadOrders());       
    })

    return (
        <>
            <h1 className='heading'>Orders</h1>
            {orders.length > 0 ? 
                <OrdersTable orderData = {orders}></OrdersTable>:
                <Container className ='empty-cart-message' fluid><Row><Col><h5 className ='py-3'>No Orders To Display...</h5></Col></Row></Container>    
            }
        </>
    );
}
 
export default OrdersScreen;