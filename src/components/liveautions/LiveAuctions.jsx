import React , {useState} from 'react';
import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y , Pagination   } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import CardModal from '../layouts/CardModal';

import icon1 from '../../assets/images/icon/rain1.svg'
import icon2 from '../../assets/images/icon/rain2.svg'
import icon3 from '../../assets/images/icon/ethe.svg'
import { Link } from 'react-router-dom';

LiveAutions.propTypes = {
    data : PropTypes.array,
};

function LiveAutions(props) {

    const [modalShow, setModalShow] = useState(false);

    const {data} = props;
    return (
        <section className="tf-section tf-live-auction visible-sw">
            <div className="tf-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tf-heading mb40 wow fadeInUp">
                            <h4 className="heading">Events</h4>
                            <a className="button" href="/live-auctions-v1">Explore<i className="fal fa-long-arrow-right"></i></a>
                        </div>
                    </div>
                    <div className="col-md-12 wow fadeInUp">

                    <Swiper
                        modules={[Navigation,  Scrollbar, A11y , Pagination ]}
                        spaceBetween={30}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                },
                            767: {
                                slidesPerView: 2,
                            },
                            991: {
                                slidesPerView: 3,
                            },
                            1300: {
                                slidesPerView: 4,
                            },
                        }}
                        className="live-auction visible"
                        navigation
                        loop= {true}
                        pagination={{
                            clickable: true,
                          }}
                    >
                    {
                        data.slice(0,4).map(idx => (
                            <SwiperSlide key={idx.id}>
                                <div className="slider-item">
                                        <div className="sc-product style1">
                                            <div className="top">
                                                <Link to="/item-details-v1" className="tag">{idx.title}</Link>
                                                <div className="wish-list">
                                                    <Link to="#" className="heart-icon"></Link>
                                                </div>
                                            </div>
                                            <div className="features">
                                                <div className="product-media">
                                                    <img src={idx.img} alt="images" />
                                                </div>
                                                <div className="featured-countdown">
                                                    <span className="js-countdown" data-timer="55555" data-labels=" ,  h , m , s "></span>
                                                </div>
                                                <div className="rain-drop1"><img src={icon1} alt="images" /></div>
                                                <div className="rain-drop2"><img src={icon2} alt="images" /></div>
                                            </div>
                                            <div className="bottom">
                                                <div className="details-product">
                                                    <div className="author">
                                                        <div className="avatar">
                                                            <img src={idx.avt} alt="images" />
                                                        </div>
                                                        <div className="content">
                                                            <div className="position">Creator</div>
                                                            <div className="name"> <Link to="/item-details-v1">{idx.create}</Link></div>
                                                        </div>
                                                    </div>
                                                    <div className="current-bid">
                                                        <div className="subtitle">Current bid</div>
                                                        <div className="price">
                                                            <span className="cash">{idx.price}</span><span className="icon"><img src={icon3} alt="images" /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-button">
                                                    <Link to='' onClick={() => setModalShow(true)} data-toggle="modal" data-target="#popup_bid" className="tf-button"> <span className="icon-btn-product"></span> Place Bid</Link>
                                                </div>
            
                                            </div>
                                        </div>
                                    </div>
                            </SwiperSlide>
                            
                        ))
                    }
                </Swiper>

                    </div>
                </div>
            </div>
            
            <CardModal 
                show={modalShow}
                onHide={() => setModalShow(false)} 
            />
        </section>
    );
}

export default LiveAutions;