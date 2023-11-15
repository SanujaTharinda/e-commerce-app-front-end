import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { getProductById, loadProducts,loadReviews, updateProductCount,addProductReview } from '../store/entities/products';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row,Col,Image ,ListGroupItem,ListGroup,Card,Table, Form} from 'react-bootstrap';
import Rating from '../components/Rating'
import { addToCart, getItemsInCart } from './../store/cart';
import { getAuthDetails} from '../store/auth';


const ProductScreen = ({match, history}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const product = useSelector(getProductById(match.params.productId));
    const userData = useSelector(getAuthDetails);
    const itemsInCart = useSelector(getItemsInCart);
    const [ selectedVariant, setSelectedVariant ] = useState({});
    const [ selectedQuantity, setSelectedQuantity ] = useState(0);
    const [rating, setRating ] = useState(0);
    const [comment, setComment ] = useState('');

    useEffect(() => {
        initiateSelectedVariant(product, setSelectedVariant);
        dispatch(loadProducts());
        dispatch(loadReviews());
        setRating(calculateRating(product.reviews));   
        console.log(product);
        console.log(selectedVariant);
    }, [product, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            addProductReview(match.params.productId,userData.customerId,rating,comment)
        )
      }
    
    
    return (
        <>

            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>

            <Row>
                <Col lg={8}>
                    <Row>
                        <Col md={6}>
                            <Image src={`http://localhost:8000/files/${product.productId}.jpg`} fluid/>
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>{product.title}</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating rating={rating} message = {rating === 0 ? "This Product has not been rated yet" : ` From ${product.reviews.length} Reviews`}></Rating>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>{product.description}</h5>
                                </ListGroup.Item>
                    
                            </ListGroup>
                            {/* {product.reviews.length > 0 &&
                            <ListGroup variant="flush">
                                <h5>Reviews :</h5>
                                    {product.reviews.map(r=><ListGroup.Item>
                    
                                        <Rating rating={r.rating}></Rating>
                                        <h6>{r.description}</h6>
                                    </ListGroup.Item>)}
                            </ListGroup>} */}
                        </Col>
                    
                    </Row>
                    {product.variants.length > 1 && <h5>Variants :</h5>}
                    {product.variants.length > 1 &&
                    <Table >
                        <thead>
                            <tr>
                                <th>Variant Name</th>
                                <th>Price</th>
                                <th>Count in Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                    {product.variants.map(v=><ListGroup.Item>
                                        <h6>{v.name}</h6>
                                    </ListGroup.Item>)}
                            </td>
                            <td>
                                    {product.variants.map(v=><ListGroup.Item>
                                        <h6>${v.unitPrice}</h6>
                                    </ListGroup.Item>)}
                            </td>
                            <td>
                                    {product.variants.map(v=><ListGroup.Item>
                                        <h6>{v.countInStock}</h6>
                                    </ListGroup.Item>)}
                            </td>
                        </tbody>
                    </Table>}

                                {product.reviews.length > 0 &&
                                <ListGroup variant="flush">
                                    <h5>Reviews :</h5>
                                        {product.reviews.map(r=><ListGroup.Item>
                        
                                            <Rating rating={r.rating}></Rating>
                                            <h6>{r.description}</h6>
                                        </ListGroup.Item>)}
                                </ListGroup>}

                    {auth.loggedIn && auth.data.usertype!='Administrator' && auth.data.usertype!='Operator' ? (                        
                    <Form onSubmit={submitHandler}>
                        <h5>Add Review:</h5>
                      <Form.Group className='mx-4' controlId='rating'>
                        <Form.Label><h6>Rating</h6></Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className='mx-4' controlId='comment'>
                        <Form.Label ><h6>Comment</h6></Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          placeholder='add a comment here'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)} 
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                    ) : (
                        <div>
                            {auth.data.usertype==='Administrator' || auth.data.usertype==='Operator' ? <div></div> : <div>Please <Link to='/login'>sign in</Link> to write a review{' '}</div>
                            }
                         
                        </div>
                      )}


                </Col>
                <Col lg={4}>
                    <Card >
                        <Card.Body>
                            <Card.Title>
                                <Form.Group>
                                    <Form.Label>Select Variant </Form.Label>
                                        <Form.Control onChange = {(e) => {
                                            const index = product.variants.findIndex(v => v.name === e.target.value);
                                            setSelectedVariant(product.variants[index]);
                                        }} as="select">
                                           {product.variants.map(v => <option selected={v.name ==='default'? 'selected': null}>{v.name}</option>)}
                                        </Form.Control>
                                </Form.Group>
                            </Card.Title>
                            <br/>
                            <Card.Title>Unit Price: ${selectedVariant.unitPrice}</Card.Title>
                            <br/>
                             <Card.Title>Status: {selectedVariant.countInStock - selectedQuantity} Items In Stock ({getSelectedProductCountInCart(itemsInCart,selectedVariant,product)} In Your Cart)</Card.Title>
                            <br/>
                            <Form.Group>
                                <Form.Label>Select Quantity </Form.Label>
                                <Form.Control onChange = {(e) => setSelectedQuantity(e.target.value)} as="select">
                                    {getOptionsArray(selectedVariant.countInStock)}
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Card.Title>Total: ${(selectedVariant.unitPrice * selectedQuantity).toFixed(2)}</Card.Title>
                            <br/>
                            <Button 
                                onClick = {() => {
                                    const item = 
                                    {
                                        productId: product.productId,
                                        title: product.title,
                                        variantName: selectedVariant.name,
                                        unitPrice: selectedVariant.unitPrice,
                                        quantity: selectedQuantity,
                                        total: selectedVariant.unitPrice * selectedQuantity
                                    };    
                                    dispatch(addToCart(item));
                                    history.push('/cart');
                               
                                }} 
                                variant="primary"
                                disabled= {selectedVariant.countInStock === 0 || selectedQuantity === 0  ? true : false}
                                
                                >
                                Add to cart
                            </Button>
 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}



export default ProductScreen;

function calculateRating(reviews){
    if(reviews.length === 0) return 0;
    let rating = 0;
    for(let review of reviews){
        rating += parseFloat(review.rating);
    }
    rating = rating /reviews.length;
    return rating.toFixed(1);
}


function initiateSelectedVariant(product, setSelectedVariant){
    const index = product.variants.findIndex(v => v.name ==='default');
    setSelectedVariant(product.variants[index]);
}


function getOptionsArray(count){

    let array = [];

    for(let i=0;i<count+1; i++){
        array = [...array, <option selected={i === 0 ? i : null}>{i}</option>];
    }
    return array;
}

function getSelectedProductCountInCart(itemsInCart, selectedVariant, product){
    console.log(selectedVariant);
    const index = itemsInCart.findIndex(i => i.productId === product.productId && i.variantName === selectedVariant.name);
    if(index === -1) return 0;
    return itemsInCart[index].quantity;
}

