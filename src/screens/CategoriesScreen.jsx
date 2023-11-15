import { useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, loadCategories } from './../store/entities/categories';

const CategoriesScreen = ({ history }) => {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories)

    useEffect(() => {
        dispatch(loadCategories());
    });

    return ( 
        <>
            <h1 className='heading'>Categories</h1>
            <Row className = 'mx-2'>  
                <Button onClick = {() => history.push('/add-main-category')} className='my-4 mx-3'>Add Main Category</Button>
                <Button onClick = {() => history.push('/add-sub-category')} className='my-4 mx-3'>Add Sub Category</Button>
            </Row>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Main Category Name</th>
                        <th>Sub Categories</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c => 
                        <tr>
                            <td>{c.category.name}</td>
                            <td>
                                {c.subCategories.map(sc => 
                                    <div>{sc.name}</div>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
     );
}
 
export default CategoriesScreen;