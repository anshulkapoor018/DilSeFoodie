import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";


export default class RestaurantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resID : decodeURI(((window.location.pathname).split("/"))[2]),
      restaurantList: []
    };
  }

  componentDidMount() {
    // console.log(this.state.resID);
    this.restauranListApiCall();
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    $("#blackslider").prop('checked',true);
  }

  restauranListApiCall() {
    var self = this;
    const search = {
      SearchString: self.state.resID
    }
    axios.post(prod_api + '/restaurant/search', search)
    .then(function (response) {
      console.log(response.data.restDetails);
      self.setState({ restaurantList: response.data.restDetails });
    })
  }

  handleClick = param => e => {
    // console.log(param._id)
    // window.location = '/res/' + param._id
  }

  render(){
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
    {
    return(
      <div className='cards'>
        {this.state.restaurantList.map((item, index) => (
          <div key = {index} className = "cards">
            <figure class="card" style = {{backgroundColor:"#000"}}>
            <Link to={'/res/'+item._id}>
              <img src={item.thumbnail} alt={item.name}/>
              <br/>
              <h3 className = "restTitle">{item.name}</h3>
              <p className = "restAddress">{item.address}</p>
              <p className = "restAddress">{item.address}, {item.city}, {item.state}</p>  
            </Link>
            </figure>
          </div>
        ))}
      </div>
    )
  }else{
    return(
      <div className='cards'>
        {this.state.restaurantList.map((item, index) => (
          <div key = {index} className = "cards">
            <figure class="card">
            <Link to={'/res/'+item._id}>
              <img src={item.thumbnail} alt={item.name}/>
              <br/>
              <h3 className = "restTitle">{item.name}</h3>
              <p className = "restAddress">{item.address}</p>
              <p className = "restAddress">{item.address}, {item.city}, {item.state}</p>  
              </Link>
            </figure>
          </div>
        ))}
      </div>
    )
  }
}
}
