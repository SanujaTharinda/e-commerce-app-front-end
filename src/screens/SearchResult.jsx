import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Product from './../components/Product';
import  Pagination from './../components/common/Pagination';
import queryString from 'query-string';
import { getAllProducts } from './../store/entities/products';
import { paginate } from './../utils/paginate';

const SearchResult = ({ location, history }) => {
    const { filterBy } = queryString.parse(location.search);
    const products = useSelector(getAllProducts);
    const [filtered, setFiltered] = useState([]);

    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [paginated, setPaginated] = useState([]);

    useEffect(() => {
        const updatedFiltered = getFilteredProducts(products, filterBy);
        setFiltered(updatedFiltered);
        setPaginated(paginate(updatedFiltered, currentPage, pageSize));
    }, [products,location]);

    return ( 
        <>
            <Row>
                <Col lg='5'>
                    <Button className='my-5' onClick = {() => history.push('/')}>Go Back</Button>
                </Col>
                <Col lg='7'>
                    <h1 className="my-5 text-primary">Search Results</h1>
                </Col>
            </Row>
             
             {filtered.length > 0 ? <Row>
                {paginated.map( product => 
                <Col key = {product.productId + product.variantName} sm = {1} md = {2} lg = {3} xl = {4}>
                    <Product product= {product}></Product>
                </Col>)} 
            </Row> : <Container className ='empty-cart-message' fluid><Row><Col><h5 className ='py-3'>No Products Found...</h5></Col></Row></Container>}
            <Pagination
                itemsCount = {filtered.length} 
                pageSize = {pageSize} 
                currentPage = {currentPage}
                onPageChange = {(page) => {
                    setCurrentPage(page);
                    setPaginated(paginate(filtered, page, pageSize));
                }}
            />

        </>
    );
}
 
export default SearchResult;


function getFilteredProducts(products, filterBy){
    return products.filter(p => 
        p.title.toLowerCase().includes(filterBy.toLowerCase()) ||
        p.description.toLowerCase().includes(filterBy.toLowerCase())
    );
}