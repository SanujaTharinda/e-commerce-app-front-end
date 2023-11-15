import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import CustomForm from '../components/common/CustomForm';
import { connect } from 'react-redux'
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { toastAction } from './../store/toastAction';
import { addSubCategory } from './../store/entities/categories';

class AddMainCategoryForm extends CustomForm {
    state = {selectedMainCategory: ''};

    schema =Yup.object().shape({
        subCategoryName: Yup.string().required("Category is required...")
    });

    initialValues = {
            subCategoryName: ''
    };

    componentDidMount() {
        const selected = this.props.categories.list[0].category.name;
        
        this.setState({ selectedMainCategory: selected});
        
    }
    

    componentDidUpdate() {
       if(this.props.categories.subCategoryAdded){
            this.props.addSuccessful();
       }
        
    }

    submitForm = (values) => {
        const mainCategory = this.state.selectedMainCategory;
        console.log(mainCategory);
        const index = this.props.categories.list.findIndex(c => c.category.name === mainCategory);
        console.log(index);
        const mainCategoryId = this.props.categories.list[index].category.categoryId;
        this.props.addSubCategory(values.subCategoryName, mainCategoryId);
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
                            label: 'Sub Category Name', 
                            type:'text', 
                            name:'subCategoryName', 
                            value: values.subCategoryName,
                            placeholder: 'Enter Sub Category Name...',
                            size: 'lg', 
                            onChange: handleChange, 
                            touchValue: touched.subCategoryName, 
                            errorValue: errors.subCategoryName
                        }) 
                    }

                    <Form.Group>
                        <Form.Label>Main Category </Form.Label>
                            <Form.Control onChange = {(e) => {
                                this.setState({ selectedMainCategory: e.target.value})
                            }} as="select">
                                {this.props.categories.list.map((c,index) => <option selected={index===0 ? 'selected': null}>{c.category.name}</option>)}
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
    categories: state.entities.categories
});

const mapDispatchToProps = dispatch => ({
    addSubCategory: (subCategoryName, mainCategoryId) => dispatch(addSubCategory(subCategoryName, mainCategoryId)),
    addSuccessful: () => dispatch(toastAction({ message: "Add Successfull...", type: 'info' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMainCategoryForm);
