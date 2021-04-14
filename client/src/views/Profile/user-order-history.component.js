import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios'; //  Using this to make an axios call to the DB
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";
var userObject = JSON.parse(window.sessionStorage.getItem("userDetails"));
const cnt = 0;

export default class UserOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrders: [],
      allres: [],
      cnt: 0
    };

    this.getData = this.getData.bind(this);
    this.addCnt = this.addCnt.bind(this);
  }
  
  async addCnt (){
    return 1

  }

  
  
  async getData(){
    const response = await axios.post(prod_api + '/user/order-history-all', userObject)
    if(response.data){
      console.log(response.data.length > 2)
      this.setState({allOrders: response.data.orders})


      // this.state.allOrders.push(response.data.Allrestr)

    }
  }
  


    render() {
      this.getData()

      if(this.state.allOrders.length > 1){
        return (
          
          <div className='homepage container'>
            <h1>Order History for {userObject['firstName']}!</h1>
           
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Order No#</th>
                  <th>Restaurant Name</th>
                  <th>Order Time</th>
                  <th>Order type</th>
                  <th>Amount</th>
                  <th>Quantity</th>
                  <th>Order Status</th>
                
                </tr>
              </thead>
              <tbody>
              
                {this.state.allOrders.map((item, index) => (
                 
                    
                 // TODO: Find a way to Do a better For Loop to prevent current infinite loop in line:68
                 // TODO: Find a way to get a better numbering system using counters ++
                 // TODO: Add restaurant Name to the tabl
                  <tr>
                    <td >{item._id}</td>
                    <td>Coming soon {item.restaurantId}</td>
                    <td>{item.timeOfOrder}</td>
                    <td>{item.typeOfOrder}</td>
                    <td>{item.payment}</td>
                    <td>1</td>
                    <td><Button variant="light">{item.orderStatus}</Button></td>
                  </tr>
                 
                  
                ))}
              
              </tbody>
            </Table>
          </div>
        );
        
      }
      
      return (
        <div className='homepage container'>
          <h1>Order History for {userObject['firstName']}!</h1>
          <Alert key={'danger'} variant={'danger'}>
            No orders Found!
           
          </Alert>
        </div>
      )
      
        
    }
}

