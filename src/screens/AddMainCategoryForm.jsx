import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import CustomForm from '../components/common/CustomForm';
import { connect } from 'react-redux'
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { toastAction } from './../store/toastAction';
import { addMainCategory } from './../store/entities/categories';

class AddMainCategoryForm extends CustomForm {

    schema =Yup.object().shape({
        categoryName: Yup.string().required("Category is required...")
    });

    initialValues = {
            categoryName: ''
    };

    componentDidUpdate() {
       if(this.props.categories.mainCategoryAdded){
            this.props.addSuccessful();
       }
        
    }

    submitForm = (values) => {
       this.props.addMainCategory(values.categoryName);
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
                    <h1 className = 'heading'>Add Main Category</h1>
                    {this.props.categories.adding && <div className = 'login-spinner' ><Spinner animation="border"  variant="primary" /></div> }
                    {this.renderFormInput(
                        {   controlId: 'validationFormik01', 
                            label: 'Category Name', 
                            type:'text', 
                            name:'categoryName', 
                            value: values.categoryName,
                            placeholder: 'Enter Category Name...',
                            size: 'lg', 
                            onChange: handleChange, 
                            touchValue: touched.categoryName, 
                            errorValue: errors.categoryName
                        }) 
                    }
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
    categories: state.entities.categories
});

const mapDispatchToProps = dispatch => ({
    addMainCategory: (categoryName) => dispatch(addMainCategory(categoryName)),
    addSuccessful: () => dispatch(toastAction({ message: "Add Successfull...", type: 'info' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMainCategoryForm);
