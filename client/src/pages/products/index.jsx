import React from 'react';
import axios from 'axios';
import Product from './product';
import Header from '../../layout/header';
const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";

export default class ProductsPage extends React.Component {
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
    axios.get(prod_api + '/menu/restaurant/' + decodeURI(((window.location.pathname).split("/"))[2]))
    .then(function (response) {
      console.log(response.data);
      self.setState({ restaurantList: response.data });
    })
  }

  render(){
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
    {
    return(
    <>
      <Header />
      <h1 style = {{backgroundColor:"#000000"}}>Welcome to our Food Menu!</h1>
      <div className='products'>
        {this.state.restaurantList.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
    </>
    )
  }
  else{
    return(
      <>
        <Header />
        <h1>Welcome to our Food Menu!</h1>
        <div className='products'>
          {this.state.restaurantList.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </div>
      </>
      )
  }
}
}