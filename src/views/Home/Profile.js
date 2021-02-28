import React from 'react';
import './Home.css';

import { Row, Col } from 'reactstrap';
import banners from './banners.json';
import CarouselSlider from '../../Static/CarouselSlider/index';
import { responsiveOneItemCarousel } from '../../Static/CarouselSlider/helpers';

// Import application sass styles
import '../../styles/style.scss';

class Profile extends React.PureComponent {
  render() {
    
    return (
      <div className='homepage'>
        <h1>Welcome to your dashboard</h1>
      </div>
    );
  }
}

export default Profile;
