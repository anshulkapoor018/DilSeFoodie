import React from 'react';
import axios from 'axios';

export default class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resID : decodeURI(((window.location.pathname).split("/"))[2]),
      restaurantList: []
    };
  }

  componentDidMount() {
    console.log(this.state.resID);
    this.restauranListApiCall();
  }

  restauranListApiCall() {
    var self = this;
    const search = {
      SearchString: self.state.resID
    }
    axios.post('http://localhost:5000/restaurant/search', search)
    .then(function (response) {
      console.log(response.data.restDetails);
      self.setState({ restaurantList: response.data.restDetails });
    })
  }

  handleClick = param => e => {
    // console.log(param._id)
    window.location = '/restaurant/' + param._id
  }

  render() {
    return(
      <div className='container_res'>
        {this.state.restaurantList.map((item, index) => (
          <div className = "card" onClick={this.handleClick(item)}>
              <h2>{item.name}</h2>
              <p>{item.address}</p>
              <p>{item.address}, {item.city}, {item.state}</p>  
              <br/>
          </div>
        ))}
      </div>
    )
  };
}
