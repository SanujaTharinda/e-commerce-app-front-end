import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Product from './SearchProduct';

export class Search extends Component{
    render() {
        const { product, loading} = this.props;

        if (loading) {
            return <h2>Loading...</h2>
        }


        return (
            <div className = 'mb-4'>
                <Row style={{width:'800px'}}>
                    {product.map(prod => (
                        <Row key={prod.id}>
                            <Row key = {prod.product_id} sm = {1000} md = {1000} lg = {1000} xl = {400}>
                                <Product product = {prod}></Product>
                            </Row>
                        </Row>
                    ))}
                </Row>
            </div>
        )
    }
}

export default Search