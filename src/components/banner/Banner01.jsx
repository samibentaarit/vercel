import React from 'react';
import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from '../../assets/images/slider/bg-slider.png'
import img2 from '../../assets/images/slider/slider-2.png'
import img3 from '../../assets/images/piano.jpg'
import img4 from '../../assets/images/music.jpg'


import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import './styles.scss'
import { Link } from 'react-router-dom';

Banner01.propTypes = {
    data : PropTypes.array,
};

function Banner01(props) {
    const {data} = props;
    
    return (
        <section className="tf-slider">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                        <Swiper
                            modules={[Navigation,  Scrollbar, A11y ]}
                            spaceBetween={0}
                            slidesPerView={1}
                            className="slider-home home1"
                            loop= {true}
                        >
                        {
                            data.slice(0,2).map(idx => (
                                <SwiperSlide key={idx.id}>
                                    <div className="tf-slider-item">
                                        <div className="content-inner">
                                            <h1 className="heading">
                                            Explore,<span>play,</span>enjoy<span></span> Conservatory in your pocket.  
                                                <img src={img1} alt="Binasea" />  
                                            </h1>
                                            <p className="sub-heading">
"Discover your musical potential at our Conservatory - where passion meets precision. Immerse yourself in a world of melodies, guided by a distinguished faculty. Unleash the symphony within you and embark on a transformative musical journey with us."</p>
                                            <div className="btn-slider ">
                                                <Link to="/explore-v2" className="tf-button style-2">Explore now</Link>
                                                <Link to="/create" className="tf-button style-3">More</Link>
                                            </div>
                                        </div>
                                        <div className="image">
                                            <div className="img-slider-main ani5"><img src={img3} alt="Binasea"/></div>
                                            <img src={img2} alt="Binasea" className="img-slider-2 ani4" />
                                            <img src={img2} alt="Binasea" className="img-slider-3 ani5" />
                                         
                                        </div>
                                    </div>
                                </SwiperSlide>
                                
                            ))
                        }
                    </Swiper>

                            
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default Banner01;