import { Table, Image, Button } from 'react-bootstrap';
import { deleteProduct } from './../store/entities/products';
import { useDispatch } from 'react-redux';

const ProductsTable = ({ products }) => {
    const dispatch = useDispatch();

    return ( 
        <Table striped bordered hover variant="light" className="tables">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Weight (g)</th>
                <th>SKU</th>
                <th></th>
                 <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => 
                    <tr>
                
                        <td>{p.productId}</td>
                        <td>{p.title}</td>
                        <td>{p.description}</td>
                        <td>{p.weight}</td>
                        <td>{p.sku}</td>
                        <td><Button onClick = {() => dispatch(deleteProduct(p.productId))} variant='danger'>Remove</Button></td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
 
export default ProductsTable;