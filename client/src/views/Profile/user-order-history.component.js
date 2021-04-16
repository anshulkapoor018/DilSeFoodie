import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import './user-order-history.component.css';

const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";
var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));

export default class UserOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrders: [],
      allres: {}
    };
  }

  componentDidMount() {
    this.allResApiCall();
    this.orderHistoryApiCall();
  }

  async allResApiCall() {
    var self = this;
    var resDict = {}
    axios.get(prod_api + '/restaurant/all')
    .then(function (response) {
      response.data.forEach(function(rest) {
        resDict[rest["_id"]] = rest["name"];
      })
      self.setState({ allres: resDict });
    })
  }

  async orderHistoryApiCall() {
    var self = this;
    axios.get(prod_api + '/order/user/' + userObject['_id'])
    .then(function (response) {
      self.setState({ allOrders: response.data });
    })
  }
  
  render() {
    var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
    if(this.state.allOrders.length === 0){
      return (
        <div className='homepage'>
          <h1>Order History for {userObject['firstName']}!</h1>
          <Alert key={'danger'} variant={'danger'}>
            No orders fjdnsfjhdbnfjhdsbfsjhdbfjFound!
          </Alert>
        </div>
      )
    } else {
      return (
        <div className='orderTable'>
          <table id="orders" width='100%' cellSpacing={0} cellPadding={0}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Restaurant Name</th>
                <th>Type Of Order</th>
                <th>Time Of Order</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
      
            <tbody>
              {this.state.allOrders.map((orders) => (
                <tr key={orders._id}>
                  <td>
                    {orders._id}
                  </td>
                  <td>
                    {this.state.allres[orders.restaurantId]}
                  </td>
                  <td>
                    {orders.typeOfOrder}
                  </td>
                  <td>
                    {orders.timeOfOrder}
                  </td>
                  <td>
                    {orders.payment}
                  </td>
                  <td>
                    {orders.orderStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }       
}

