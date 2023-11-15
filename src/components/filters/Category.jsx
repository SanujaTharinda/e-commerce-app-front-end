import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Category() {
    return (
        <>
            <Card className = 'my-1 p-3 rounded' style={{width:'250px'}}>

                <h3>Categories</h3>
                <Row style={{margin:'10px'}}>
                    <Link to = '#'>Women's Fashion</Link> 
                </Row>
                <Row style={{margin:'10px'}}>
                    <Link to = '#'>Men's Fashion</Link>
                </Row>
                <Row style={{margin:'10px'}}>
                    <Link to = '#'>Phones and Telecommunication</Link> 
                </Row>
                <Row style={{margin:'10px'}}>
                    <Link to = '#'>Jewerly and Watches</Link>
                </Row>
                <Row style={{margin:'10px'}}>
                    <Link to = '#'>Bags and Shoes</Link> 
                </Row>
                <Row style={{margin:'10px'}}>
                    <Link to = '#'>Home and Garden</Link>  
                </Row>
            </Card>  
        </>
    );
}

export default Category;