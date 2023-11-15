import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    const [rating, setRating ] = useState(0);

    useEffect(() => {
        setRating(calculateRating(product.reviews));
    }, [product.reviews]);
    
    return (
        <>
            <Card className = 'my-3 p-3 rounded'>
                <Link to = {`/products/${product.productId}`}>
                    <Card.Img src={`http://localhost:8000/files/${product.productId}.jpg`}  variant = 'top'/>
                </Link>
                <Card.Body>
                    <Link to = {`/products/${product.productId}`}>
                        <Card.Title as='div'><h3><strong>{product.title}</strong></h3></Card.Title>
                    </Link>
                    <Card.Text as = 'div'><Rating rating = {rating} message = {rating === 0 ? "This Product has not been rated yet" : `${rating} From ${product.reviews.length} Reviews`}></Rating></Card.Text>
                    <Card.Text as = 'div'><h3>${product.variants.find(v => v.name === 'default').unitPrice}</h3></Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Product;


function calculateRating(reviews){
    if(reviews.length === 0) return 0;
    let rating = 0;
    for(let review of reviews){
        rating += parseFloat(review.rating);
    }
    rating = rating /reviews.length;
    return rating.toFixed(1);
}