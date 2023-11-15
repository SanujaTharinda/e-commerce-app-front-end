import React from 'react'
import { Card, InputGroup, Row, Button ,FormControl, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../Rating'

function PriceRange() {
    return (
        <>
            <Card className = 'my-1 p-3 rounded' style={{width:'250px'}}>

                <h3>Price Range</h3>

                <Col style={{display:'flex'}}>
                    <InputGroup id = 'start-price' style={{margin:'5px'}}>
                        <FormControl
                            placeholder="from"
                            aria-label="searchProduct"
                            aria-describedby="basic-addon2"
                            size = 'md'
                                    /*   value={search}
                                        required
                                        onChange={(e) => setSearch(e.target.value)}*/
                        />
                        <InputGroup.Append id = 'product-search-button'>
                        </InputGroup.Append>
                    </InputGroup>

                    <InputGroup id = 'end-price' style={{margin:'5px'}}>
                        <FormControl
                            placeholder="to"
                            aria-label="searchProduct"
                            aria-describedby="basic-addon2"
                            size = 'md'
                                    /*   value={search}
                                        required
                                        onChange={(e) => setSearch(e.target.value)}*/
                        />
                        <InputGroup.Append id = 'product-search-button'>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>

                <Button className = 'pl-2.5 pr-2.5' variant="primary">Search</Button>


            </Card>  
        </>
    );
}

export default PriceRange;