import React from 'react';
import { Row} from 'reactstrap';
import axios from 'axios';
import Card from 'react-bootstrap/Card'

export default class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurantList: []};
  }

  componentDidMount() {
    this.restauranListApiCall();
  }

  restauranListApiCall() {
    var self = this;
    axios.get('http://localhost:5000/restaurant/all')
    .then(function (response) {
      console.log(response.data)
      self.setState({ restaurantList: response.data });
    })
  }

  render(){
    return(
      <div className='content'>
        <Row>
          {this.state.restaurantList.map((item, index) => (
            <Card>
            <Card.Img variant="top" src="res_clip.png" />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.address}, {item.city}, {item.state}
              </Card.Text>
            </Card.Body>
          </Card>
          ))}
        </Row>
      </div>
    )
  }
}