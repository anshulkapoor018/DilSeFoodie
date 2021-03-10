import React from 'react';
import './Home.css';

// import { Row, Col } from 'reactstrap';
// import banners from './banners.json';
// import CarouselSlider from '../../Static/CarouselSlider/index';
// import { responsiveOneItemCarousel } from '../../Static/CarouselSlider/helpers';

// Import application sass styles
// import '../../styles/style.scss';

class Home extends React.PureComponent {
  render() {
      return (
        <div className='homepage'>
          <div className="search-card-center">
            <h1>Welcome Foodies!</h1>
            <p>Discover the best food and drinks in the Mile Square City</p>
            <label>
                <form id="search-form" method="POST" action="/restaurants/search">
                    <input id="search-bar" type="text" name="search" className = "searchFields" placeholder="Search for a restaurant or cuisine" />
                    <input type="submit" class = "btn" value="Search" />
                </form>
            </label> 
          </div>
        </div>
      );
  }
}

export default Home;
