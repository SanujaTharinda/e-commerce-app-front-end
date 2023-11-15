import React from 'react';
import {Table,Button} from 'react-bootstrap';

import {withRouter } from 'react-router-dom';

function OrdersTable({orderData, heading = null,history}) {

    return (
      <div>
          { heading ? <h1 className = 'userheading'>{heading}</h1> : null}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>ORDER DATE</th>
                <th>DISPATCHED DATE</th>
                <th>DELIVERY METHOD</th>
                <th>ORDER STATUS</th>
                <th>COMMENTS</th>
                <th></th>
            
              </tr>
            </thead>
            <tbody>
            {orderData.map(o =>  {
            return (
              <tr>
                <td width="10%">{`${o.orderId}`}</td>
                <td width="40%">{`${o.orderDate}`}</td>
                <td width="25%">{`${o.dispatchedDate}`}</td>
                <td width="10%">{`${o.deliveryMethod}`}</td>
                <td width="5%">{`${o.status}`}</td>
                <td width="5%">{`${o.comments}`}</td>
                <td width="5%"><Button onClick={()=>{history.push({pathname:`/order-details/${o.orderId}`,state:o.orderId})}}>Details</Button></td>
              </tr>
            );
          })}
            </tbody>
          </Table>
        </div>
    );
}export default withRouter(OrdersTable);