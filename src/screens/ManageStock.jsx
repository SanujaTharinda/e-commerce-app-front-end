import React ,{useState, useEffect} from 'react';
import { Row, Col, Button, Table,ListGroup, Form, FormControl,InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, updateProductCount, loadProducts, updateProductStock} from '../store/entities/products';

function ManageStock({history}) {
    const dispatch = useDispatch();
    const products = useSelector(getAllProducts);
    const [stock, setStock] = useState('');

    useEffect(() => {
        dispatch(loadProducts());
    }, [products])

    const updateStock = (productId, variantName, countInStock, unitPrice) => {
        if(stock !="" && countInStock>=0){
            const stockUpdate ={
                productId,
                variantName,
                countInStock,
                unitPrice
            }
            dispatch(updateProductStock(stockUpdate));
        }


    }

    return (
        <>
            <h1 className ='my-3' >Manage Stock</h1>
            <Row lg="20">
           

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Variant</th>
                            <th>Stock</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => 
                                <tr key={product.productId}>
                                    <td width="25%">{product.productId}</td>
                                    <td width="25%">{product.title}</td>
                                    <td>
                                        {product.variants.map(v=><ListGroup.Item style={{justifyContent: 'center',alignItems:'center', textAlign:'center'}}>
                                            <h6 style={{justifyContent: 'center',alignItems:'center', textAlign:'center'}}>{v.name}</h6>
                                        </ListGroup.Item>)}
                                    </td>
                                    <td>
                                        {product.variants.map(v=><ListGroup.Item style={{justifyContent: 'center',alignItems:'center', textAlign:'center'}}>
                                            <h6 style={{justifyContent: 'center',alignItems:'center', textAlign:'center'}}>{v.countInStock}</h6>
                                        </ListGroup.Item>)}
                                    </td>
                                    <td width="20%" >

                                        {product.variants.map(v=><ListGroup key= {product.productId + v.name}><form style={{ display:'flex', textAlign:'center',alignItems:'center'}}>
                                            <Col className='py-2' style={{justifyContent: 'center' ,display:'flex'}}>
                                                    <InputGroup key= {product.productId + v.name} >
                                                        <FormControl
                                                         style={{height:'10px'}}
                                                            name = {product.productId + v.name}
                                                            placeholder={v.countInStock}
                                                            aria-label="searchProduct"
                                                            aria-describedby="basic-addon2"
                                                            size = 'lg'
                                                            type ='number'
                                                            onChange = { e => setStock(e.target.value)}
                                                        />
                                                        <InputGroup.Append id = 'product-search-button'>
                                                            <Button 
                                                                style={{ padding:'3px',textAlign:'center', justifyContent: 'center', alignItems:'center'}}
                                                                variant="primary" 
                                                                onClick = {() => updateStock(product.productId,v.name, stock, v.unitPrice)}
                                                            >
                                                                Update
                                                            </Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                            </Col>
                                        </form></ListGroup>)}
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </Table>
                       
            </Row>
        
        </>
    );
}

export default ManageStock;
