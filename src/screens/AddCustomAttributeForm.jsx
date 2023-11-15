import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import CustomForm from '../components/common/CustomForm';
import { connect } from 'react-redux'
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { toastAction } from '../store/toastAction';
import { addCustomAttribute } from './../store/entities/customAttributes';

const dataTypes = ["Text", "Integer", "Date", "Double"]

class AddCustomAttributeForm extends CustomForm {
    state = {selectedDataType: 'Text'};

    schema =Yup.object().shape({
        customAttributeName: Yup.string().required("Attribute Name is required...")
    });

    initialValues = {
        customAttributeName: ''
    };

    
    componentDidUpdate() {
       if(this.props.customAttributes.added){
            this.props.addSuccessful();
       }
        
    }

    submitForm = (values) => {
       this.props.addCustomAttribute(values.customAttributeName, this.state.selectedDataType);
    }
    
    render() {
        return (
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
                    <h1 className = 'heading'>Add Custom Attribute</h1>
                    {this.props.customAttributes.adding && <div className = 'login-spinner' ><Spinner animation="border"  variant="primary" /></div> }
                    {this.renderFormInput(
                        {   controlId: 'validationFormik01', 
                            label: 'Custom Attribute Name', 
                            type:'text', 
                            name:'customAttributeName', 
                            value: values.customAttributeName,
                            placeholder: 'Enter Custom Attribute Name...',
                            size: 'lg', 
                            onChange: handleChange, 
                            touchValue: touched.customAttributeName, 
                            errorValue: errors.customAttributeName
                        }) 
                    }

                    <Form.Group>
                        <Form.Label>Type </Form.Label>
                            <Form.Control onChange = {(e) => {
                                this.setState({ selectedDataType: e.target.value})
                            }} as="select">
                                {dataTypes.map((d,index) => <option selected={index===0 ? 'selected': null}>{d}</option>)}
                            </Form.Control>
                        </Form.Group>
                    <Button 
                        type='submit'
                    >
                        Add
                    </Button>
                </Form>
                )}
            </Formik>
            
        );
    }
}

const mapStateToProps = state => ({
    customAttributes: state.entities.customAttributes
});

const mapDispatchToProps = dispatch => ({
    addCustomAttribute: (name, type) => dispatch(addCustomAttribute(name, type)),
    addSuccessful: () => dispatch(toastAction({ message: "Add Successfull...", type: 'info' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomAttributeForm);
