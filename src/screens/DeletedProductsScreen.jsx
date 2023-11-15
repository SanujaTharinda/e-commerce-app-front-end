import { useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loadProducts, getDeletedProducts } from './../store/entities/products';



const DeletedProductsScreen = () => {
    const deletedProducts = useSelector(getDeletedProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProducts())
    })

    return ( 
         <>
            <h1 className='heading'>Deleted Products</h1>
            {deletedProducts.length >0 ?
            <Table striped bordered hover variant="light">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Weight (g)</th>
                <th>SKU</th>
                </tr>
            </thead>
            <tbody>
                {deletedProducts.map(p => 
                    <tr>
                
                        <td>{p.productId}</td>
                        <td>{p.title}</td>
                        <td>{p.description}</td>
                        <td>{p.weight}</td>
                        <td>{p.sku}</td>
                    </tr>
                )}
            </tbody>
        </Table> : <Container className ='empty-cart-message' fluid><Row><Col><h5 className ='py-3'>"No Deleted Products To Display...</h5></Col></Row></Container>}
        </>
     );
}
 
export default DeletedProductsScreen;