import React, { useEffect } from 'react'
import {loadCustomers,  getAllCustomers, deactivateCustomer, activateCustomer} from '../store/entities/customers';
import { useDispatch, useSelector } from 'react-redux';
import {Table, Button} from 'react-bootstrap';

const ViewCustomers = ({match, history}) => {
    const dispatch = useDispatch();
    const customers = useSelector(getAllCustomers);

    useEffect(() => {
        dispatch(loadCustomers());
        console.log(customers);
    }, [customers]);

    return(
        <div>
            <h1 className = 'heading'>Customers</h1>
            {customers.length > 0 ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Email</th>
                        <th>Active Status</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {customers.map(c =>
                        <tr>
                            <td>{c.customerId}</td>
                            <td>{c.email}</td>

                            <td>{c.activeStatus ? "Active" : "Deactivated"}</td>
                            <td>
                                {c.activeStatus === true ?
                                    <Button style ={{width:"100px"}}className="btn btn-danger" onClick={() => dispatch(deactivateCustomer(c.customerId))}>Deactivate</Button>
                                :   <Button style ={{width:"100px"}} onClick={() => dispatch(activateCustomer(c.customerId))}>Activate</Button>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            :(<div>Empty Customers</div>)}
        </div>
    )
}
export default ViewCustomers;