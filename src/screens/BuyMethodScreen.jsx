import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';
import '../bootstrap.min.css'
import CommonListGroup from '../components/common/CommonListGroup'
import CheckoutSteps from '../components/CheckoutSteps'
import { selectBuyMethod } from './../store/auth';

function BuyMethodScreen ({history}){
    const dispatch = useDispatch();
    const [selectedMethod, setSelectedMethod] = useState('HomeDelivery');
    
    const handleChange = event => setSelectedMethod(event.target.value)
        
   
    return( <div><FormContainer>
            
            <CheckoutSteps step1 step2/>
            <h1 className='my-3'>Buy Method</h1>
            <Form className='my-3'>
                <Form.Group>
                     <Form.Label as='legend'>Select Method</Form.Label>
                </Form.Group >

                <Col >  
                     <Form.Check className='my-3'
                         type='radio'  
                         label='Home Delivery' 
                         id='HomeDelivery' 
                         name='buyMethod' 
                         value='HomeDelivery'  
                         onChange={handleChange}
                         defaultChecked='HomeDelivery'
                         >
                     </Form.Check>
                     <Form.Check className='my-3'
                         type='radio' 
                         label='Store Pickup' 
                         id='StorePickup' 
                         name='buyMethod' 
                         value='StorePickup'  
                         onChange={handleChange}
                         >
                     </Form.Check>                    
                 </Col>                
                <Button 
                    onClick = {() =>{
                        dispatch(selectBuyMethod(selectedMethod));
                        if(selectedMethod==='StorePickup')
                            history.push("/payment");                               
                        else
                            history.push("/shipping");               
                        }
                    }               
                    variant='primary'
                >
                Continue
                </Button>
            </Form>
        </FormContainer></div>);
};


export default BuyMethodScreen;




