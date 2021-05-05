/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';

// Notification imports
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import './Home.css'
const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";

// This calls our notification handler
async function showNotification (type, message){
  const timer = 2000
  if (type === "error"){
    NotificationManager.error(message, "", timer);
  }
  else if (type === "success"){
    NotificationManager.success(message, "", timer);
  }
  else if (type === "warning"){
    NotificationManager.warning(message, "", timer);
  }
}

class Home extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      SearchString: "",
      stats: [],
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(e){
    const target = e.target;
    const value = target.value;
    this.setState({
      SearchString: value
    })
  }
  async componentDidMount(){
    const response2 = await axios.post(dev_api + '/stats/all');
    this.setState({stats: response2.data})
  }
  
  async submitSearch(e) {
    e.preventDefault();

    const search = {
      SearchString: this.state.SearchString
    }

    // Blocker used to prevent unwanted requests to the server if the input is invalid
    if(this.state.SearchString.trim() === ""){
      await showNotification("error" ,"Please Enter Something to Search!")
    }
    else{
      // Changed to Promises to Async (Refractored)
      try{
        const response = await axios.post(dev_api + '/restaurant/search', search)
        console.log(response.data.restDetails)
        if((response.data.restDetails).length !== 0){
          await showNotification("success" ,"Search Found!")
          // add a delay for 2 seconds 
          setTimeout(() => {
            window.location = "/search/" + String(search.SearchString)
          }, 1500)
        } 
        else {
          await showNotification("error" ,"No Search Results!")
        }
      }
      catch(err){
        console.log(err);
        window.location = "/home"
      }
    }
  }

  render() {
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    // console.log(this.props.theme);
    if(mode == "light"){
      return (
        <div className='homepage'>
          <div className="search-card-center-dark">
            <h1 style = {{backgroundColor:"#000000"}}>Welcome Foodies!</h1>
            <p style = {{color:"#b4fffb"}}>Discover the best food and drinks in the Mile Square City</p>
            <label>
                <input id="search-bar" style={{background: "black", color: "#ffffff"}} type="text" name="search" className = "searchFields" placeholder="Search for a restaurant or cuisine" value={this.state.SearchString} onChange={this.onChangeSearch} />
                <br></br>
                <button type="submit" className="fancybuttonSearchDark"  style = {{color:"#e8e8e8"}} onClick={this.submitSearch.bind(this)}>Search</button>
            </label>
            <br/>
          </div>
          <br></br><br></br>
        
          <Container>
            <Col>
                <Alert variant="light" style={{background: "black", borderColor: '#2525a7'}}>      
                  <h2 style = {{color:"#b4fffb"}}>
                    What we do? 
                  </h2>
                </Alert>
            </Col>
            <Row>
              <Col>
                <Alert variant="primary">
                  <p>
                    We love our customers
                  </p>
                  <hr />
                  <p className="mb-0">
                    We have { this.state.stats.user1} + Users.
                  </p>
                </Alert>
              </Col>
              <Col>
                <Alert variant="success">
                  <p>
                    We have multiple partnership 
                  </p>
                  <hr />
                  <p className="mb-0">
                    We have { this.state.stats.Allrestr} + Restaurants.
                  </p>
                </Alert>
              </Col>
              <Col>
                <Alert variant="warning">
                  <p>
                    We Offer Pickup and Delivery options 
                  </p>
                  <hr />
                  <p className="mb-0">
                    We have done { this.state.stats.orders} + Orders.
                  </p>
                </Alert>
              </Col>
              <Col>
                <Alert variant="dark">
                  <p>
                    We appreciate feedbacks always! 
                  </p>
                  <hr />
                  <p className="mb-0">
                    We have { this.state.stats.rev} + Reviews.
                  </p>
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>
      );
  }
  else{
    return (
      <div className='homepage'>
        <div className="search-card-center">
          <h1>Welcome Foodies!</h1>
          <p>Discover the best food and drinks in the Mile Square City</p>
          <label>
              <input id="search-bar" type="text" name="search" className = "searchFields" placeholder="Search for a restaurant or cuisine" value={this.state.SearchString} onChange={this.onChangeSearch} />
              <br></br>
              <button type="submit" className="fancybuttonSearch" onClick={this.submitSearch.bind(this)}>Search</button>
          </label>
          <br/>
        </div>
        <br></br><br></br>
      
        <Container>
          <Col>
            <Alert variant="light">
              <h2>
                What we do?
              </h2>
            </Alert>
          </Col>
          <Row>
            <Col>
              <Alert variant="primary">
                <p>
                  We love our customers
                </p>
                <hr />
                <p className="mb-0">
                  We have { this.state.stats.user1} + Users.
                </p>
              </Alert>
            </Col>
            <Col>
              <Alert variant="success">
                <p>
                  We have multiple partnership 
                </p>
                <hr />
                <p className="mb-0">
                  We have { this.state.stats.Allrestr} + Restaurants.
                </p>
              </Alert>
            </Col>
            <Col>
              <Alert variant="warning">
                <p>
                  We Offer Pickup and Delivery options 
                </p>
                <hr />
                <p className="mb-0">
                  We have done { this.state.stats.orders} + Orders.
                </p>
              </Alert>
            </Col>
            <Col>
              <Alert variant="dark">
                <p>
                  We appreciate feedbacks always! 
                </p>
                <hr />
                <p className="mb-0">
                  We have { this.state.stats.rev} + Reviews.
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
}

export default Home;