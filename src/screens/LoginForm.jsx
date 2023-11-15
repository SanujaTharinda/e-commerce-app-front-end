import React from 'react';
import { Form, Button, Spinner, Nav,Card,Row,Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CustomForm from '../components/common/CustomForm';
import { connect } from 'react-redux'
import { login } from './../store/auth';
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { toastAction } from './../store/toastAction';

class LoginForm extends CustomForm {

    schema =Yup.object().shape({
        username: Yup.string().required("Username is required..."),
        password: Yup.string().required("Password is required...")     
    });

    initialValues = {
            username: '',
            password: ''
    };

    componentDidUpdate() {
        if(!this.props.auth.loggedIn)return;

        if(this.props.auth.checkOutStarted)
            window.location = '/buyMethod';
        else
            window.location = '/';
        
        
        this.props.loginSuccessful();
        
    }

    submitForm = (values) => {
        this.props.loginUser(values);
        this.setState({logging: true});
    }
    
    render() {
        return (
            <Row className="my-5">
                <Col md={5} className="form-login">
                    <h3 className="welcome">WELCOME BACK</h3>
                </Col>
                    
                <Col md={5}>
            <Formik
                validationSchema = {this.schema}
                onSubmit = {this.submitForm}
                initialValues = {this.initialValues}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    dirty,
                    errors
                }) => (
                <Form noValidate onSubmit={handleSubmit} className="mx-3">
                    <h5 className = 'heading'>Login Account</h5>
                    {this.props.auth.logging && <div className = 'login-spinner' ><Spinner animation="border"  variant="primary" /></div>}
                    {this.renderFormInput(
                        {   controlId: 'validationFormik01', 
                            label: 'Username', 
                            type:'text', 
                            name:'username', 
                            value: values.username,
                            placeholder: 'Enter your username...',
                            size: 'lg', 
                            onChange: handleChange, 
                            touchValue: touched.username, 
                            errorValue: this.props.auth.error || errors.username
                    
                        }) 
                    }

                    {this.renderFormInput(
                        {   controlId: 'validationFormik02', 
                            label: 'Password', 
                            type:'password', 
                            name:'password', 
                            value: values.password,
                            placeholder: 'Enter your password...',
                            size: 'lg', 
                            onChange: handleChange, 
                            touchValue: touched.password, 
                            errorValue: errors.password
                        }) 
                    }
                        
                    <Button type='submit' className="login-btn">
                        Login
                    </Button>

                    <div className="new-customer">
                        <div className = 'new-customer-message'>
                            <h5>A New Customer ? </h5>
                        </div>
                        <LinkContainer className = 'new-customer-register-link' to = '/register'>
                            <Nav.Link><h5>Signup From Here</h5></Nav.Link>
                        </LinkContainer> 
                    </div>

                    <div>
                        <div className = 'user-message'>
                            <h5>An User ? </h5>
                        </div>
                    <LinkContainer className = 'user-login-link' to = '/user-login'>
                            <Nav.Link><h5>User Login</h5></Nav.Link>
                    </LinkContainer> 
                    </div>
                        
                </Form>
                )}
            </Formik></Col></Row>
            
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    loginUser: (data) => dispatch(login('customer', data)),
    loginSuccessful: () => dispatch(toastAction({ message: "Login Successfull...", type: 'info' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);