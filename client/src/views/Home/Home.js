import React from 'react';
import axios from 'axios';

// Notification imports
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';
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
        const response = await axios.post(prod_api + '/restaurant/search', search)
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
      return (
        <div className='homepage'>
          <div className="search-card-center">
            <h1>Welcome Foodies!</h1>
            <p>Discover the best food and drinks in the Mile Square City</p>
            <label>
                <input id="search-bar" type="text" name="search" className = "searchFields" placeholder="Search for a restaurant or cuisine" value={this.state.SearchString} onChange={this.onChangeSearch} />
                <button type="submit" className="btn" onClick={this.submitSearch.bind(this)}>Search</button>
            </label>
            <br/>
          </div>
        </div>
      );
  }
}

export default Home;
