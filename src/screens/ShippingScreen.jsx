import React from 'react'
import { Form, Button } from 'react-bootstrap'
import CustomForm from '../components/common/CustomForm'
import { connect } from 'react-redux'
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { selectShippingAddress } from './../store/auth';
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux';


class ShippingScreen extends CustomForm {
    
    schema =Yup.object().shape({
      address: Yup.string().required('Home Address is required...'),
      city: Yup.string().required('City is required...'),
      state: Yup.string().required('State is required...')
    });

    initialValues = {
        address: this.props.auth.data.address,
        city: this.props.auth.data.city,
        state: this.props.auth.data.state    
    };

    submitForm = (values) => {
      this.props.shippingAddress(values);
      this.props.history.push("/payment");
    
    } 
  

  render(){
    const {history}=this.props;
    console.log(this.props.auth.data.address);
    return(
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
      <FormContainer>   
        <Form noValidate onSubmit={handleSubmit}>
        <CheckoutSteps step1 step2 step3/>
        <h1>Shipping</h1>
            {this.renderFormInput(
              {   controlId: 'validationFormik01',
                  label: 'Address',
                  type:'text',
                  name:'address',
                  value: values.address,
                  placeholder: 'Your Address...',
                  size: 'lg',
                  onChange: handleChange,
                  touchValue: touched.address,
                  errorValue: errors.address
              })
            }
            {this.renderFormInput(
              {   controlId: 'validationFormik02',
                  label: 'City',
                  type:'text',
                  name:'city',
                  value: values.city,
                  placeholder: 'Your City...',
                  size: 'lg',
                  onChange: handleChange,
                  touchValue: touched.city,
                  errorValue: errors.city
              })
            }
            {this.renderFormInput(
              {   controlId: 'validationFormik03',
                  label: 'State',
                  type:'text',
                  name:'state',
                  value: values.state,
                  placeholder: 'Your State...',
                  size: 'lg',
                  onChange: handleChange,
                  touchValue: touched.state,
                  errorValue: errors.state
              })
            }
          <Button type='submit'>Continue</Button>
        </Form>  
     </FormContainer>
     
    )
  }  
  </Formik> 
    )
}

}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  shippingAddress: (data) => dispatch(selectShippingAddress( data))  
});

export default connect(mapStateToProps,mapDispatchToProps)(ShippingScreen);

