import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';

import { Row, Col } from 'reactstrap';

// import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../Common/CarouselSlider/helpers';
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
                    <img key={index} src={item.imageUrl} />
                  ))}
                </CarouselSlider>
              </div>
            </Col>
            <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
              <div className='d-flex flex-column h-100 justify-content-between'>
                <img src='/banner-2.jpg' className='mb-3' />
                <img src='/banner-5.jpg' />
              </div>
            </Col>
            <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
              <div className='d-flex flex-column h-100 justify-content-between'>
                <img src='/banner-2.jpg' className='mb-3' />
                <img src='/banner-6.jpg' />
              </div>
            </Col>
          </Row>
        </div>
      );
  }
}

export default Home;
