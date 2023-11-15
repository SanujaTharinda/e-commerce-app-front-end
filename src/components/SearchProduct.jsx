import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function SearchProduct({ product }) {
    return (
        <>
            <Card className = 'my-1 p-3 rounded' style={{width:'800px'}}>
                <Col style={{display:'flex'}}>
                    <Link to = {`/products/${product.product_id}`}>
                        <Card.Img src = {product.image} variant = 'top' style={{height:'10rem', width:'10rem'}}/>
                    </Link>

                    <Card.Body style={{marginLeft:'20px'}}>
                        <Link to = {`/products/${product.product_id}`}>
                            <Card.Title as='div' style={{fontSize:'20px'}}><strong>{product.title}</strong></Card.Title>
                        </Link>
                        <Card.Text as = 'div'><Rating value = {product.rating} message = {`${product.rating} From ${product.numReviews} Reviews`}></Rating></Card.Text>
                        <Card.Text as = 'div'><h3>${product.price}</h3></Card.Text>
                    </Card.Body>
                
                </Col>


            </Card>  
        </>
    );
}

export default SearchProduct;