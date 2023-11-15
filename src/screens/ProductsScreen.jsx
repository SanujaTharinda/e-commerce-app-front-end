import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ProductsTable from './../components/ProductsTable';
import { getAllProducts } from './../store/entities/products';


const ProductsScreen = ({ history }) => {
    const products = useSelector(getAllProducts);

    return (
        <>
            <h1 className='heading'>Products</h1>
                <Button className ='my-3 mx-3' onClick = { () => history.push('/product-register')}>Add Product</Button>
                <Button className ='my-3 mx-3' onClick = { () => history.push('/add-custom-attribute')}>Add Custom Attribute</Button>
                <Button className ='my-3 mx-3' onClick = { () => history.push('/categories')}>Manage Categories</Button>
                <Button className ='my-3 mx-3' onClick = { () => history.push('/manage-stock')}>Manage Stock</Button>
                <Button className ='my-3 mx-3' onClick = { () => history.push('/deleted-products')}>Deleted Products</Button>
            <ProductsTable products={products}></ProductsTable>
        </>
    );
}
 
export default ProductsScreen;