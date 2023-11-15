import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormControl, Button, Row, Col, Spinner } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import {  Formik } from 'formik';
import * as Yup from 'yup';
import { getAllCategories, loadCategories } from './../store/entities/categories';
import { createProduct } from './../store/entities/products';
import { getAllCustomAttributes, loadCustomAttributes } from './../store/entities/customAttributes';
import { saveImage } from './../store/entities/products';
import axios from 'axios';
import { toastAction } from './../store/toastAction';


function ProductRegisterForm(){
    const dispatch = useDispatch();

    const [ schema, setSchema ] = useState({ 
                            title : Yup.string()
                                    .required('Title is required...'),
                            sku : Yup.number()
                                        .positive("SKU should be a positive number...")
                                        .integer("Whole number is required...")
                                        .required('SKU is required...'),
                            weight: Yup.string().matches(/[0-9]+(\.[0-9][0-9])/, "Weight must be positive and two decimal places. Ex: 12.89").required("Weight is required..."),
                            description: Yup.string().required("Description is required..."),
                            variant0: Yup.string().required("Variant Name is required..."),
                            unitPrice0: Yup.string().matches(/[0-9]+(\.[0-9][0-9])/, "Unit Price must be to two decimal places...").required("Unit Price is required..."),
                            countInStock0: Yup.number().integer().required("Count in stock is required...")
            });

    const [initialValues, setInitialValues ] = useState({
                                                title: '', 
                                                sku : '',
                                                weight: '',
                                                description: '',
                                                variant0: '',
                                                unitPrice0: '',
                                                countInStock0: ''
                                            });
    //variants
    const [ variants, setVariants ] = useState([{}]);

    const formElements = useState(4);  
    
    //categories
    const categories = useSelector(getAllCategories);


    //Main Categories
    const [ selectedMainCategories, setSelectedMainCategories ] = useState(['']);
    
    //Sub Categories
    const [ selectedSubCategories, setSelectedSubCategories ] = useState([getInitialState(categories, selectedMainCategories)]);

    //Custom Attributes
    const customAttributes = useSelector(getAllCustomAttributes);
    // const customAttributes = [{name:'Color', type:"Text"}, {name:'Brand', type:'Text'}];
    const [ selectedCustomAttributes, setSelectedCustomAttributes ] = useState([customAttributes.length > 0 ?  {name:customAttributes[0].name, value:''} : {name:'', value:''}]);

    //Image
    const [ image, setImage ] = useState('');

    useEffect(() =>{
        dispatch(loadCategories());
        dispatch(loadCustomAttributes());
        if(selectedMainCategories.length ===1 && selectedMainCategories[0] ===''){
            if(categories.length !==0){
                const selected = [categories[0].category.name];
                setSelectedMainCategories(selected);
            }
        }

        if(selectedCustomAttributes.length ===1 && selectedCustomAttributes[0].name ===''){
            if(customAttributes.length !==0){
                const selected = [{name: customAttributes[0].name, value: ''}];
                setSelectedCustomAttributes(selected);
            }
        }
    },[selectedMainCategories, selectedSubCategories, selectedCustomAttributes, customAttributes, categories]);


    //variants
    const handleVariantAdded = () => {
        const newVariants = [...variants, {}];
        const newSchema = {...schema, 
                            [`variant${variants.length}`]: Yup.string().required("Variant Name is required..."),
                            [`unitPrice${variants.length}`]: Yup.string().matches(/[0-9]+(\.[0-9][0-9])/, "Unit Price must be to two decimal places...").required("Unit Price is required..."),
                            [`countInStock${variants.length}`]: Yup.number().integer().required("Count in stock is required...")
        };

        const newInitialValues = {...initialValues,
                             [`variant${variants.length}`]: '',
                             [`unitPrice${variants.length}`]: '',
                             [`countInStock${variants.length}`]: ''
        };
        setVariants(newVariants);
        setSchema(newSchema);
        setInitialValues(newInitialValues);
    }


    const handleVariantDeleted = (values) => {
        let newVariants = [...variants];
        newVariants = newVariants.splice(0,variants.length-1);
        const newSchema = {...schema};
        //Deleting from schema
        delete newSchema[`variant${variants.length-1}`];
        delete newSchema[`unitPrice${variants.length-1}`];
        delete newSchema[`countInStock${variants.length-1}`];

        const newInitialValues = {...initialValues};
        //Deleting from initial values
        delete newInitialValues[`variant${variants.length-1}`];
        delete newInitialValues[`unitPrice${variants.length-1}`];
        delete newInitialValues[`countInStock${variants.length-1}`];

        //Deleting from values of Formik
        delete values[`variant${variants.length - 1}`];
        delete values[`unitPrice${variants.length - 1}`];
        delete values[`countInStock${variants.length - 1}`];

        setInitialValues(newInitialValues);
        setVariants(newVariants);
        setSchema(newSchema);  
    }

    //Main Categories
    const handleMainCategoryInputDeleted = () => {
        const updated = [...selectedMainCategories];
        updated.pop();
        setSelectedMainCategories(updated);
    }

    const handleMainCategoryInputAdded = () => {
        const updated = [...selectedMainCategories, ''];
        setSelectedMainCategories(updated);
    }

    //Sub Categories

    const handleSubCategoryInputAdded = () => {
        const updated = [...selectedSubCategories, ''];
        setSelectedSubCategories(updated);
    };

    const handleSubCategoryInputDeleted = () => {
        const updated = [...selectedSubCategories];
        updated.pop();
        setSelectedSubCategories(updated);
    };

    //Custom Attributes

    const handleCustomAttributeInputAdded = () => {
        const updated = [...selectedCustomAttributes, {}];
        setSelectedCustomAttributes(updated);
    }

    const handleCustomAttributeInputDeleted = () => {
        const updated = [...selectedCustomAttributes];
        updated.pop();
        setSelectedCustomAttributes(updated);
    }

    const onDrop = (picture) => {
        setImage(picture);
        console.log(picture);
        console.log("Uploading");
    }
    

    const submitForm = async (values) => {
        const {title, sku, weight, description } = values;
        const mainCategoriesNames = [...new Set(selectedMainCategories)];
        const subCategoriesNames = [...new Set(selectedSubCategories)];
        const categoryIds = getCategoryIDS(categories, mainCategoriesNames, subCategoriesNames);
        const customAttributesNames = [...new Set(selectedCustomAttributes)];
        updateStructuredCustomAttributes(customAttributes, customAttributesNames);
        const picture = image.pop();
        console.log(categoryIds);
        const formData = new FormData();
        formData.append('productImage', picture);
        console.log(customAttributesNames);
        
        try{
            
          
            const response = await axios.request({
                url: 'http://localhost:8000/api/product/product-register',
                method: 'post',
                data: {title, sku, weight, description, 
                    variants: JSON.stringify(variants),
                    categories: JSON.stringify(categoryIds),
                    customAttributes: JSON.stringify(customAttributesNames)
                },
            });
            const productId = response.data.data;
            dispatch(saveImage(formData, productId));
            dispatch(toastAction({ message: "Register Success...", type: 'info' }));
        }catch(e){
            dispatch(toastAction({ message: "Register Failed...", type: 'error' }));
        }  
    }
    
   
    return (
        <Formik
            validationSchema = {Yup.object().shape(schema)}
            onSubmit = {submitForm}
            initialValues = {initialValues}
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
                <h1 className = 'heading my-2'>Product Register</h1>
                <Row>
                    <Col>
                        <Form.Group controlId= 'validationFormik01'>
                            <Form.Label className = 'form-label'>Title</Form.Label>
                            <Form.Control 
                                type='text'
                                name='title' 
                                value={values.title}
                                onChange={handleChange}
                                placeholder='Product Title'
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                size = {'lg'} 
                            />
                            <FormControl.Feedback type='invalid'>{errors.title}</FormControl.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId= 'validationFormik02'>
                            <Form.Label className = 'form-label'>SKU</Form.Label>
                            <Form.Control 
                                type='text'
                                name='sku' 
                                value={values.sku}
                                onChange={handleChange}
                                placeholder='SKU'
                                isValid={touched.sku && !errors.sku}
                                isInvalid={!!errors.sku}
                                size = {'lg'} 
                            />
                            <FormControl.Feedback type='invalid'>{errors.sku}</FormControl.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId= 'validationFormik03'>
                            <Form.Label className = 'form-label'>Weight(g)</Form.Label>
                            <Form.Control 
                                type='text'
                                name='weight' 
                                value={values.weight}
                                onChange={handleChange}
                                placeholder='Weight'
                                isValid={touched.weight && !errors.weight}
                                isInvalid={!!errors.weight}
                                size = {'lg'} 
                            />
                            <FormControl.Feedback type='invalid'>{errors.weight}</FormControl.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>

                        <Form.Group controlId= 'validationFormik04'>
                            <Form.Label className = 'form-label'>Description</Form.Label>
                            <Form.Control 
                                type='text'
                                name='description' 
                                value={values.description}
                                onChange={handleChange}
                                placeholder='Description'
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                size = {'lg'} 
                            />
                            <FormControl.Feedback type='invalid'>{errors.description}</FormControl.Feedback>
                        </Form.Group>
                        
                    </Col>
                </Row>
                <h3>Variants</h3>
                {variants.map( v =>{
                    const index = variants.findIndex(va => va === v );
                    return (
                        <>
                        <Row className ='mx-4 my-3'>

                            <Col>
                                <Form.Group controlId= {`validationFormik${formElements + index + 1 >= 10 ? `${formElements + index + 1}`: `0${formElements + index + 1}` }`}>
                                    <Form.Label className = 'form-label'>Variant</Form.Label>
                                    <Form.Control 
                                        type='text'
                                        name={`variant${index}`}
                                        value={values[`variant${index}`]}
                                        onChange={(e) => {
                                            handleChange(e);
                                            const updated = {...variants[index]};
                                            updated.name = e.target.value;
                                            const newVariants = [...variants];
                                            newVariants[index] = updated;
                                            setVariants(newVariants);
                                        }}
                                        placeholder='Variant Name'
                                        isValid={touched[`variant${index}`] && !errors[`variant${index}`]}
                                        isInvalid={!!errors[`variant${index}`]}
                                        size = {'lg'} 
                                    />
                                    <FormControl.Feedback type='invalid'>{errors[`variant${index}`]}</FormControl.Feedback>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId= {`validationFormik${formElements + index + 2 >= 10 ? `${formElements + index + 2}`: `0${formElements + index + 2}`}`}>
                                    <Form.Label className = 'form-label'>Unit Price</Form.Label>
                                    <Form.Control 
                                        type='text'
                                        name={`unitPrice${index}`}
                                        value={values[`unitPrice${index}`]}
                                        onChange={(e) => {
                                            handleChange(e);
                                            const updated = {...variants[index]};
                                            updated.unitPrice = e.target.value;
                                            const newVariants = [...variants];
                                            newVariants[index] = updated;
                                            setVariants(newVariants);
                                        }}
                                        placeholder='Unit Price'
                                        isValid={touched[`unitPrice${index}`] && !errors[`unitPrice${index}`]}
                                        isInvalid={!!errors[`unitPrice${index}`]}
                                        size = {'lg'} 
                                    />
                                    <FormControl.Feedback type='invalid'>{errors[`unitPrice${index}`]}</FormControl.Feedback>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId= {`validationFormik${formElements + index + 3 >= 10 ? `${formElements + index + 3}`: `0${formElements + index + 3}`}`}>
                                    <Form.Label className = 'form-label'>Count In Stock</Form.Label>
                                    <Form.Control 
                                        type='text'
                                        name={`countInStock${index}`}
                                        value={values[`countInStock${index}`]}
                                        onChange={(e) => {
                                            handleChange(e);
                                            const updated = {...variants[index]};
                                            updated.countInStock = e.target.value;
                                            const newVariants = [...variants];
                                            newVariants[index] = updated;
                                            setVariants(newVariants);
                                        }}
                                        placeholder='Count In Stock'
                                        isValid={touched[`countInStock${index}`] && !errors[`countInStock${index}`]}
                                        isInvalid={!!errors[`countInStock${index}`]}
                                        size = {'lg'} 
                                    />
                                    <FormControl.Feedback type='invalid'>{errors[`countInStock${index}`]}</FormControl.Feedback>
                                </Form.Group>
                        
                            </Col>

                            <Col>
                                { index === variants.length-1 && <div className ='my-4'>
                                    <Button onClick = {() => handleVariantAdded()} className = 'mx-2' variant='primary'>+</Button>
                                    {index !==0 && <Button onClick = {() => handleVariantDeleted(values)} className = 'mx-2' variant='danger'>-</Button>}
                                </div>}
                            </Col>

                        </Row>
                        </>
                    ); 
                })}
                <h3 className='my-4'>Categories</h3>
               
                    
                {selectedMainCategories.map((mc, index) => <Row className='mx-4'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Main Category </Form.Label>
                            <Form.Control onChange = {(e) => {
                                const updated = [...selectedMainCategories];
                                updated[index] = e.target.value;
                                setSelectedMainCategories(updated);  
                            }} as="select">
                                {categories.map((c,index) => <option selected={index === 0? 'selected': null}>{c.category.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    
                    <Col>
                        { index === selectedMainCategories.length-1 && <div>
                            <Button onClick= {() => handleMainCategoryInputAdded()} className='mx-2 my-4' variant='primary'>+</Button>
                            { index !==0 && <Button onClick= {() => handleMainCategoryInputDeleted()} className='mx-2 my-4' variant='danger'>-</Button>}
                        </div>}
                    </Col>
                    
                </Row>)}

                {selectedSubCategories.map((sc, index) => <Row className='mx-4'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Sub Category </Form.Label>
                            <Form.Control onChange = {(e) => {
                                const updated = [...selectedSubCategories];
                                updated[index] = e.target.value;
                                setSelectedSubCategories(updated);  
                            }} as="select">
                                {getSubCategories(categories, selectedMainCategories).map((sc,index) => <option selected>{sc}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    
                    <Col>
                        { index === selectedSubCategories.length-1 && <div>
                            <Button onClick= {() => handleSubCategoryInputAdded()} className='mx-2 my-4' variant='primary'>+</Button>
                            { index !==0 && <Button onClick= {() => handleSubCategoryInputDeleted()} className='mx-2 my-4' variant='danger'>-</Button>}
                        </div>}
                    </Col>
                    
                </Row>)}
                <h3>Custom Attributes</h3>
                {selectedCustomAttributes.map((ca, index) => <Row className='mx-4'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Custom Attribute </Form.Label>
                            <Form.Control onChange = {(e) => {
                                const updated = [...selectedCustomAttributes];
                                updated[index].name = e.target.value;
                                console.log("Updating", updated);
                                setSelectedCustomAttributes(updated);  
                            }} as="select">
                                {customAttributes.map((ca,index) => <option selected={index === 0? 'selected': null}>{`${ca.name}`}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Value</Form.Label>
                        <Form.Control onChange = {(e) => {
                            const updated = [...selectedCustomAttributes];
                            updated[index].value = e.target.value;
                            setSelectedCustomAttributes(updated); 
                        }}type="text" placeholder="Enter Value" value={ca.value}/>
                    </Form.Group>
                    
                    
                    
                    </Col>
                    
                    <Col>
                        { index === selectedCustomAttributes.length-1 && <div>
                            <Button onClick= {() => handleCustomAttributeInputAdded()} className='mx-2 my-4' variant='primary'>+</Button>
                            { index !==0 && <Button onClick= {() => handleCustomAttributeInputDeleted()} className='mx-2 my-4' variant='danger'>-</Button>}
                        </div>}
                    </Col>
                    
                </Row>)}
                <h3>Upload Image</h3>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview ={true}
                />
        

                <Button 
                    type='submit'
                >
                    Register Product
                </Button>
                <br/>
                <br/>
            </Form>
            )}
        </Formik> 
    )
    
}   


export default ProductRegisterForm;



function getSubCategories(categories, selectedMainCategories){
    let subCategories = [];

    for(let item of categories){
        if(selectedMainCategories.includes(item.category.name)){
            subCategories = [...subCategories, ...item.subCategories.map(sc => sc.name)];
        }
    }
    return subCategories;
}


function getCategoryIDS(categories, main, sub){
    
    const filtered = categories.filter(c => {
        if(main.includes(c.category.name)){
            return c;
        }
    });

    const mainIds = filtered.map(f => f.category.categoryId);
    
    let subIds = [];
    for(let f of filtered){
        const subs = f.subCategories;
        for(let s of subs){
            if(sub.includes(s.name)){
                subIds = [...subIds, s.categoryId];
            }
        }
    }

    return [...mainIds, ...subIds];
}

function updateStructuredCustomAttributes(customAttributes, selected){

    for(let a of selected){
        const index = customAttributes.findIndex(ca => ca.name === a.name);
        if(index !== -1)
            a.customAttributeId = customAttributes[index].customAttributeId;
    }
}


function getInitialState(categories, selectedMainCategories){

    const filtered = categories.filter(c => selectedMainCategories.includes(c.category.name));

    let subsAll = [];

    for(let f of filtered){
        const subs = f.subCategories;
        subsAll = [...subsAll, ...subs]
    }

    if(subsAll.length > 0 ){
        return subsAll.pop().name;
    }else{
        return '';
    }



}


