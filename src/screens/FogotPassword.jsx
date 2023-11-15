import React from 'react';
import {Form, Button} from 'react-bootstrap';


function ResetPassword(props) {
    return (
        <div>
            <h1 className = 'heading'>Forgot Password</h1>
            <p style={{fontSize:'20px', textAlign:'center'}}>Enter your e-mail address and We'll send you a link to reset your password.</p>
            <Form>
                <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="E-mail Address" size='lg'/>
                </Form.Group>
                <div style={{textAlign:'center'}}><Button>SUBMIT</Button></div>
            </Form>
        </div>
    );
}

export default ResetPassword;