import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import ButtonSpinner from './../components/common/ButttonSpinner';
import CommonListGroup from './../components/common/CommonListGroup';
import Pagination from '../components/common/Pagination';
import { loadProducts, getAllProducts, getProductLoadingStatus } from './../store/entities/products';
import { loadCategories, getCategoriesLoadingStatus, getAllCategories } from './../store/entities/categories';
import { paginate } from './../utils/paginate';
import { loadOrders } from './../store/entities/orders';



const HomeScreen = ({ match }) => {
    const dispatch = useDispatch();
    const products = useSelector(getAllProducts);
    const productsLoading = useSelector(getProductLoadingStatus);
    const categories = useSelector(getAllCategories);
    const categoriesLoading = useSelector(getCategoriesLoadingStatus);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filtered, setFiltered] = useState(products);

    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [paginated, setPaginated] = useState([]);
  
    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadCategories());
        dispatch(loadOrders())
        const updatedFiltered = getFilteredProducts(products, categories, selectedCategory);
        setFiltered(updatedFiltered);
        setPaginated(paginate(updatedFiltered, currentPage, pageSize));
    }, [products, categories]);

    return (
        <div className = 'mb-4 my-4'>
            {productsLoading && <ButtonSpinner message = "Loading Products..." />}
            {!categoriesLoading &&
                <CommonListGroup 
                    onSelect = {(category) => {
                        setSelectedCategory(category);
                        const updatedFiltered = getFilteredProducts(products, categories, category);
                        setFiltered(updatedFiltered);
                        setPaginated(paginate(updatedFiltered, 1, pageSize));
                    }} 
                    defaultSelected = {"All"} selected={selectedCategory} 
                    list={categories.map(c => c.category.name)}
                />}
            <Row>
                {paginated.map( product => 
                <Col key = {product.productId + product.variantName} sm = {1} md = {2} lg = {3} xl = {4}>
                    <Product product= {product}></Product>
                </Col>)} 
            </Row>

            <Pagination
                itemsCount = {filtered.length} 
                pageSize = {pageSize} 
                currentPage = {currentPage}
                onPageChange = {(page) => {
                    setCurrentPage(page);
                    setPaginated(paginate(filtered, page, pageSize));
                }}
            />
        </div>
    );
}


function getFilteredProducts(products, categories, filter){
    if(filter === "All") return products;
    const category = categories.find(c => c.category.name === filter);
    const selectedCategoryId = category.category.categoryId;
    return products.filter(p => p.categories.includes(selectedCategoryId));
}


export default HomeScreen;

