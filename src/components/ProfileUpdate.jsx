import React, { useEffect } from 'react';
import {Container, Card,Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UpdateProfile({ userData }) {
    const auth = useSelector(state => state.auth);
    console.log(userData.usertype)

    return (
        <Container>
		    <h1 className = 'userheading'>USER PROFILE</h1>
            <Card bg="primary" text="white" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Name</Card.Title>
                    <Card.Text>{`${userData.firstName} ${userData.lastName}`}</Card.Text>
                    <Card.Title>Email Address</Card.Title>
                    <Card.Text>{`${userData.email}`}</Card.Text>
                    <Card.Title>Home Address</Card.Title>
                    <Card.Text>{`${userData.address} `},<br/>{`${userData.city} `},<br/>{`${userData.state} `}</Card.Text>
                    <Card.Title>Phone number</Card.Title>
                    <Card.Text>{`${userData.phone} `}</Card.Text>
                    {auth.loggedIn &&  !(auth.data.usertype==='Administrator' || auth.data.usertype==='Operator') &&
                    <Button type='submit'  className='btn btn-light' onClick={()=> window.location='/Edit profile'}>Edit Profile</Button>}<br/><br/>
                    {auth.loggedIn &&  !(auth.data.usertype==='Administrator' || auth.data.usertype==='Operator') &&
                    <Button type='submit'  className='btn btn-light' onClick={()=> window.location='/reset username'}>Reset username</Button>}<br/><br/>
                     {auth.loggedIn &&  !(auth.data.usertype==='Administrator' || auth.data.usertype==='Operator') &&
                    <Button type='submit'  className='btn btn-light' onClick={()=> window.location='/reset Password'}>Reset Password</Button>}<br/><br/>
            </Card.Body>
            </Card>
        </Container>    
    ); 
}export default UpdateProfile;