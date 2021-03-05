import React from 'react';
import {Row, Col} from 'reactstrap';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import './restaurant-all.component.css'

export default class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurantList: []};
  }

  componentDidMount() {
    this.restauranListApiCall();
  }
  
  _createItemList() {
    let rows = {}
    let counter = 1
    this.state.restaurantList.forEach((item, idx) => {
      rows[counter] = rows[counter] ? [...rows[counter]] : []
      if (idx % 3 === 0 && idx !== 0) {
        counter++
        rows[counter] = rows[counter] ? [...rows[counter]] : []
        rows[counter].push(item)
      } else {
        rows[counter].push(item)
      }
    })
    return rows
  }

  restauranListApiCall() {
    var self = this;
    axios.get('http://localhost:5000/restaurant/all')
    .then(function (response) {
      self.setState({ restaurantList: response.data });
    })
  }

  handleClick = param => e => {
    // console.log(param._id)
    window.location = '/restaurant/' + param._id
  }

  render(){
    let rows = this._createItemList()
    console.log(rows);
    return(
      <div className='container_res'>
        {this.state.restaurantList.map((item, index) => (
        // <Row className='flex-row'>
        //   <Col>
            // <Card key = {index} onClick={this.handleClick(item)}>
            //   <Card.Img variant="top" src="res_clip.png" />
            //   <Card.Body>
            //     <Card.Title>{item.name}</Card.Title>
            //     <Card.Text>
            //       {item.address}, {item.city}, {item.state}
            //     </Card.Text>
            //   </Card.Body>
            // </Card>
        //   </Col>
        // </Row>
          <div className = "card" onClick={this.handleClick(item)}>
              <h2>{item.name}</h2>
              <p>{item.address}</p>
              <p>{item.address}, {item.city}, {item.state}</p>  
              <br/>
          </div>
        ))}
      </div>
    )
  }
}