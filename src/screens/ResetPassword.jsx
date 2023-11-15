import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import CustomForm from '../components/common/CustomForm';
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { toastAction } from '../store/toastAction';
import { updateCustomerPassword } from '../store/entities/customers';

class ResetPassword extends CustomForm {
    schema =Yup.object().shape({
        username: Yup.string()
                     .min(5, "At least five characters should be used")
                     .max(20, "Use less than 20 characters")
                     .required('Username is required...'),
        oldPassword: Yup.string()
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
                    .required('Old password is required...'),
        newPassword: Yup.string()
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
                    .required('New password is required...'),
        confirmnewPassword: Yup.string()
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
                    .oneOf([Yup.ref('newPassword'), null], "Does not match with password")
                    .required('Please confirm your new password...')
                    
     });
    initialValues = {
        username: '', 
        oldPassword : '',
        newPassword: '',
        confirmnewPassword: ''
    };

    componentDidUpdate() {
        if(this.props.resetPassword){
            this.props.history.push('/profile');
            this.props.PasswordChangeSuccessful();
        }  
    }

    submitForm = (values) => {
        delete values.confirmnewPassword;
        this.props.resetPassword(values); 
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
                    <h1 className = 'heading'>Reset Password</h1>
                            {this.renderFormInput(
                                {   controlId: 'validationFormik1',
                                    label: 'Username',
                                    type:'text',
                                    name:'username',
                                    value:values.username,
                                    placeholder: 'Your username...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.username,
                                    errorValue: errors.username
                                })
                            }                        
                            {this.renderFormInput(
                                {   controlId: 'validationFormik2',
                                    label: 'Old Password',
                                    type:'password',
                                    name:'oldPassword',
                                    value:values.oldPassword,
                                    placeholder: 'Your Old Password..',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.oldPassword,
                                    errorValue: errors.oldPassword
                                })
                            }
                            {this.renderFormInput(
                                {   controlId: 'validationFormik3',
                                    label: 'New Password',
                                    type:'password',
                                    name:'newPassword',
                                    value:values.newPassword,
                                    placeholder: 'Your New Password..',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.newPassword,
                                    errorValue: errors.newPassword
                                })
                            }
                            {this.renderFormInput(
                                {   controlId: 'validationFormik4',
                                    label: 'Confirm New Password',
                                    type:'password',
                                    name:'confirmnewPassword',
                                    value:values.confirmnewPassword,
                                    placeholder: 'Confirm New Password...',
                                    size: 'lg',
                                    onChange: handleChange,
                                    touchValue: touched.confirmnewPassword,
                                    errorValue: errors.confirmnewPassword
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
    resetPassword: (data) => dispatch(updateCustomerPassword(data)),
    PasswordChangeSuccessful: () => dispatch(toastAction({ message: "Password is changed successfully,Login with new password", type: 'info' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);