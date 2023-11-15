import React from 'react';
import { connect } from 'react-redux';
import CustomForm from '../components/common/CustomForm';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import {  Formik } from 'formik';
import { updateCustomerDetails } from './../store/entities/customers';
import { toastAction } from './../store/toastAction';
import { updateAuthData } from './../store/auth';

class EditProfile extends CustomForm {
    schema =Yup.object().shape({
        firstName : Yup.string()
                       .required('First Name is required...'),
        lastName : Yup.string()
                      .required('Last Name is required...'),
        birthDate: Yup.date()
                      .min(new Date('1900-01-01'),'Birth Date should be later than 1900-01-01')
                      .max(new Date(), "Birthday must be earlier than current day")
                      .required('Birth Date is required. Ex:- 1998-03-26'),
        email: Yup.string()
                  .email("A valid email must be provided...")
                  .required("Email is required..."),

        phone: Yup.string()
                        .matches(/^(?:7|0|(?:\+94))[0-9]{9,9}$/, 'Invalid Phone Number. Ex:- 0123458907')
                        .required('Phone number is required...'),
        address: Yup.string()
                    .required('Home Address is required...'),
        city: Yup.string()
                 .required('City is required...'),
        state: Yup.string()
                  .required('State is required...'),
    });

    initialValues = {
        customerId: this.props.auth.data.customerId,   
        firstName: this.props.auth.data.firstName, 
        lastName : this.props.auth.data.lastName,
        birthDate: this.props.auth.data.birthDate,
        phone: this.props.auth.data.phone,
        email: this.props.auth.data.email,
        address: this.props.auth.data.address,
        city: this.props.auth.data.city,
        state: this.props.auth.data.state
    };

    componentDidUpdate() {
        if(this.props.updateCustomerDetails){
            this.props.history.push('/profile');
            this.props.updateSuccessful();
        }  
    }

    submitForm = (values) => {
        this.props.updateCustomerDetails(values);
        this.props.updateAuthData(values) 
        console.log(values);
        console.log(this.props.auth.data.customerId)
    }
    
    render(){
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
                <Form noValidate onSubmit={handleSubmit}>
                    <h1 className = 'heading'>Edit Profile</h1>
                    <Row>
                        <Col>
                            {this.renderFormInput(
                                {   controlId: 'validation_Formik01',
                                    label: 'First Name',
                                    type:'text',
                                    name:'firstName',
                                    value:values.firstName,
                                    placeholder: 'Your First Name...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.firstName,
                                    errorValue: errors.firstName
                                })
                            }
                        </Col>
                        <Col>
                            {this.renderFormInput(
                                {   controlId: 'validation_Formik02',
                                    label: 'Last Name',
                                    type:'text',
                                    name:'lastName',
                                    value:values.lastName,
                                    placeholder: 'Your Last Name...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.lastName,
                                    errorValue: errors.lastName
                                })
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.renderFormInput(
                                {   controlId: 'validation_Formik03',
                                    label: 'Birth Date',
                                    type:'text',
                                    name:'birthDate',
                                    value:values.birthDate,
                                    placeholder: 'Your Birth Date...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.birthDate,
                                    errorValue: errors.birthDate
                                })
                            }
                        </Col>
                        <Col>
                            {this.renderFormInput(
                                {   controlId: 'validation_Formik04',
                                    label: 'Phone Number',
                                    type:'text',
                                    name:'phone',
                                    value:values.phone,
                                    placeholder: 'Your Phone Number...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.phone,
                                    errorValue: errors.phone
                                })
                            }
                        </Col>
                    </Row>
                    {this.renderFormInput(
                                {   controlId: 'validation_Formik02',
                                    label: 'Email',
                                    type:'text',
                                    name:'email',
                                    value:values.email,
                                    placeholder: 'Your Email...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.email,
                                    errorValue: errors.email
                                })
                            }

                    <Row>
                        <Col>
                            {this.renderFormInput(
                                {   controlId: 'validation_Formik07',
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
                        </Col>
                        <Col>
                            {this.renderFormInput(
                                {   controlId: 'validation_Formik08',
                                    label: 'City',
                                    type:'text',
                                    name:'city',
                                    value:values.city,
                                    placeholder: 'Your City...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.city,
                                    errorValue: errors.city
                                })
                            }
                        </Col>
                        <Col>
                            {this.renderFormInput(
                                {   controlId: 'validation_Formik09',
                                    label: 'State',
                                    type:'text',
                                    name:'state',
                                    value:values.state,
                                    placeholder: 'Your State...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.state,
                                    errorValue: errors.state
                                })
                            }
                        </Col>
                    </Row>
                    <Button type='submit'>Edit</Button>
                    <br/>
                    <br/>
                </Form>
                )}
            </Formik>
    )
}
}
const mapStateToProps = state => ({
    customers: state.entities.customers,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    updateCustomerDetails: (data) => dispatch(updateCustomerDetails(data)),
    updateSuccessful: () => dispatch(toastAction({ message: "Profile Updated Successfully", type: 'info' })),
    updateAuthData: (data) => dispatch(updateAuthData(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);