import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';

class CustomForm extends Component {

    renderFormInput({
            controlId, 
            label, 
            type='text', 
            name, 
            value,
            placeholder,
            size, 
            onChange, 
            touchValue, 
            errorValue })
        {return(
            <Form.Group controlId={controlId}>
                <Form.Label className = 'form-label'>{label}</Form.Label>
                <Form.Control 
                    type={type}
                    name={name} 
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} 
                    isValid={touchValue && !errorValue}
                    isInvalid={!!errorValue}
                    size = {size} 
                />
                <FormControl.Feedback type='invalid'>{errorValue}</FormControl.Feedback>
            </Form.Group>
        );
    }
}

export default CustomForm;