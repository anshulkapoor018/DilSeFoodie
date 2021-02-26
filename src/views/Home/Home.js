import React from 'react';
import './Home.css';

import { Row, Col } from 'reactstrap';
import banners from './banners.json';
import CarouselSlider from '../../Static/CarouselSlider/index';
import { responsiveOneItemCarousel } from '../../Static/CarouselSlider/helpers';

// Import application sass styles
import '../../styles/style.scss';

class Home extends React.PureComponent {
  render() {
      return (
        <div className='homepage'>
          <Row className='flex-row'>
            <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
              <div className='home-carousel'>
                <CarouselSlider
                  swipeable={true}
                  showDots={true}
                  infinite={true}
                  autoPlay={false}
                  slides={banners}
                  responsive={responsiveOneItemCarousel}
                >
                  {banners.map((item, index) => (
                    <img key={index} src={item.imageUrl} alt=""/>
                  ))}
                </CarouselSlider>
              </div>
            </Col>
            <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
              <div className='d-flex flex-column h-100 justify-content-between'>
                <img src='/banner-2.jpg' className='mb-3' alt=""/>
                <img src='/banner-5.jpg' alt=""/>
              </div>
            </Col>
            <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
              <div className='d-flex flex-column h-100 justify-content-between'>
                <img src='/banner-2.jpg' className='mb-3' alt=""/>
                <img src='/banner-6.jpg' alt=""/>
              </div>
            </Col>
          </Row>
        </div>
      );
  }
}

export default Home;
