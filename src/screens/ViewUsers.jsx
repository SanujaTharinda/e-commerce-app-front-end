import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import {loadUsers,  getAllUsers, deactivateUser, activateUser, makeUserAdmin} from '../store/entities/users';

const ViewCustomers = ({match, history}) => {
    const dispatch = useDispatch();
    const users = useSelector(getAllUsers).list;

    useEffect(() => {
        dispatch(loadUsers());
        console.log(users);
    }, [users]);

    return(
        <div>
            <h1 className = 'heading'>Users</h1>
            <Button className ='my-3' onClick = { () => history.push('/user-register')}>Add User</Button>
            {users.length > 0 ?
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Active Status</th>
                        <th>Deactivate</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u =>
                        <tr>
                            <td>{u.userId}</td>
                            <td>{u.email}</td>
                            <td>{u.usertype}</td>
                            <td>{u.activeStatus ? "Active" : "Deactivated"}</td>
                            <td>{u.usertype === 'Operator' && u.activeStatus === true ?
                                    <Button style ={{width:"100px"}}className="btn btn-danger" onClick={() => dispatch(deactivateUser(u.userId))}>Deactivate</Button>
                                :u.usertype === 'Operator' && u.activeStatus === false ?
                                <Button style ={{width:"100px"}} onClick={() => dispatch(activateUser(u.userId))}>Activate</Button>:(<p></p>)}
                            </td>

                            <td>{u.usertype === 'Operator' && u.activeStatus === true ?
                                    <Button style ={{width:"120px"}}className="btn btn-danger" onClick={() => dispatch(makeUserAdmin(u.userId))}>Make Admin</Button>
                                    : <div></div>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            :(<div>Users not found</div>)}
        </div>
    )
}
export default ViewCustomers;