import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import '../bootstrap.min.css'
import CheckoutSteps from '../components/CheckoutSteps'
import {selectPaymentMethod} from './../store/auth'

const PaymentScreen = ({history}) => {
    const dispatch = useDispatch();
    const [selectedMethod, setSelectedMethod] = useState('PayPal');
    const handleChange = event => setSelectedMethod(event.target.value)

    return(
        <FormContainer>
            <CheckoutSteps step1 step2 step3 step4/>
            <h1 className='my-3'>Payment</h1>
            <Form className='my-3' >
                <Form.Group>
                     <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group >
                <Col >
                     <Form.Check className='my-3'
                         type='radio' 
                         label='PayPal or Credit Card' 
                         id='Paypal' 
                         name='paymentMethod' 
                         value='PayPal'  
                         onChange={handleChange}
                         defaultChecked='Paypal'
                         >
                     </Form.Check>
                     <Form.Check className='my-3'
                         type='radio' 
                         label='Stripe' 
                         id='Stripe' 
                         name='paymentMethod' 
                         value='Stripe'  
                         onChange={handleChange}
                         >
                     </Form.Check>
                 </Col>                 
                 <Button 

                 onClick = {() =>{
                     dispatch(selectPaymentMethod(selectedMethod));
                     history.push("/placeOrder")}}type='submit' variant='primary'>
                    Continue
                 </Button>
            </Form>
        </FormContainer>        
    )
}

export default PaymentScreen;
