import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import CustomForm from '../components/common/CustomForm';
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { toastAction } from './../store/toastAction';
import { updateCustomerUsername } from './../store/entities/customers';

class ResetUsername extends CustomForm {
    schema =Yup.object().shape({
        oldUsername: Yup.string()
                     .min(5, "At least five characters should be used")
                     .max(20, "Use less than 20 characters")
                     .required('Old Username is required...'),
        newUsername: Yup.string()
                    .min(5, "At least five characters should be used")
                    .max(20, "Use less than 20 characters")
                    .required(' New Username is required...'),
        confirmNewUsername: Yup.string()
                    .min(5, "At least five characters should be used")
                    .max(20, "Use less than 20 characters")
                    .oneOf([Yup.ref('newUsername'), null], "Does not match with New Username")
                    .required('Please confirm your New username...'),
                    
     });

    initialValues = {
        oldUsername: '', 
        newUsername : '',
        confirmNewUsername: ''
    };


    componentDidUpdate() {
        if(this.props.resetUsername){
            this.props.history.push('/profile');
            this.props.UsernameChangeSuccessful();
        }  
    }

    submitForm = (values) => {
        delete values.confirmNewUsername;
        this.props.resetUsername(values); 
        console.log(values);
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
                    <h1 className = 'heading'>Reset Username</h1>
                            {this.renderFormInput(
                                {   controlId: 'validationFormikOuname',
                                    label: 'Old Username',
                                    type:'text',
                                    name:'oldUsername',
                                    value:values.oldUsername,
                                    placeholder: 'Your Old Username...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.oldUsername,
                                    errorValue: errors.oldUsername
                                })
                            }                        
                            {this.renderFormInput(
                                {   controlId: 'validationFormikNuname',
                                    label: 'New Username',
                                    type:'text',
                                    name:'newUsername',
                                    value:values.newUsername,
                                    placeholder: 'Your New Username...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.newUsername,
                                    errorValue: errors.newUsername
                                })
                            }
                            {this.renderFormInput(
                                {   controlId: 'validationFormikCuname',
                                    label: 'Confirm New Username',
                                    type:'text',
                                    name:'confirmNewUsername',
                                    value:values.confirmNewUsername,
                                    placeholder: 'Confirm New Username...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.confirmNewUsername,
                                    errorValue: errors.confirmNewUsername
                                })
                            }                                        
                    <Button type='submit'>Submit</Button><br/><br/>
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
    resetUsername: (data) => dispatch(updateCustomerUsername(data)),
    UsernameChangeSuccessful: () => dispatch(toastAction({ message: "Username is changed successfully,Login with new username", type: 'info' }))
});


export default connect(mapStateToProps, mapDispatchToProps)(ResetUsername);