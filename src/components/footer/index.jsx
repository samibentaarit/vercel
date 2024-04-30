import React , { useState ,useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo1.png';
import logodark from '../../assets/images/logo1.png';

import './styles.scss'



function Footer(props) {

    const [productLink] = useState([
        {
            title: 'Spot',
            path: '/spot'
        },
        {
            title: 'Inverse Perpetual',
            path: '#'
        },
        {
            title: 'USDT Perpetual',
            path: '#'
        },
        {
            title: 'Exchange',
            path: '#'
        },
        {
            title: 'Launchpad',
            path: '#'
        },
        {
            title: 'Binance Pay',
            path: '#'
        },
    ]);
    const [servicesLink] = useState([
        {
            title: 'Buy Crypto',
            path: '#'
        },
        {
            title: 'Markets',
            path: '#'
        },
        {
            title: 'Tranding Fee',
            path: '#'
        },
        {
            title: 'Affiliate Program',
            path: '#'
        },
        {
            title: 'Referral Program',
            path: '#'
        },
        {
            title: 'API',
            path: '#'
        },
    ]);


    const [listSocial] = useState([
        {
            icon: 'icon-facebook-f',
            path: '#'
        },
        {
            icon: 'icon-instagram',
            path: '#'
        },
        {
            icon: 'icon-youtube',
            path: '#'
        },
        {
            icon: 'icon-twitter',
            path: '#'
        },
    ])
    

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("scroll", toggleVisibility);
  
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (

        <footer className="footer">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-3 col-md-3">
                            <div className="widget widget-infor">
                                <div className="logo">
                                    <img id="logo_footer" className='logo-dark' src={logo} alt="Binasea" />
                                    <img id="logo_footer" className='logo-light' src={logo} alt="Binasea" />
                                </div>
                                <p className="content">"Your key to musical mastery – the Conservatory app, where every moment resonates with brilliance.</p>
                                <ul className="social-item">
                                    <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-facebook"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-telegram-plane"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                                    <li><Link to="#"><i className="icon-fl-tik-tok-2"></i></Link></li>
                                    <li><Link to="#"><i className="icon-fl-vt"></i></Link></li>
                                </ul>

                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-md-5">
                            <div className="widget widget-menu">
                                <div className="menu menu-1">
                                    <h6 className="widget-title">Maketplace</h6>
                                    <ul >
                                        <li><Link to="/explore-v1">Explore</Link></li>
                                        <li><Link to="/item-details-v1">Item Detail</Link></li>
                                        <li><Link to="/live-auctions-v1">Live Auditon</Link></li>
                                    </ul>
                                </div>
                                <div className="menu menu-2">
                                    <h6 className="widget-title">Stats</h6>
                                    <ul >
                                        <li><Link to="/login">Login</Link></li>
                                        <li><Link to="/create">About Us</Link></li>
                                    </ul>
                                </div>
                                <div className="menu menu-3">
                                    <h6 className="widget-title">Resoure</h6>
                                    <ul >
                                        <li><Link to="/contact">Contact Us</Link></li>
                                      
                                    </ul>
                                </div>
                              
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4">
                            <div className="widget widget-subcribe">
                                <h6 className="widget-title">Subscribe Us</h6>
                                <p className="content">Signup for our newsletter to get the latest news in your inbox.</p>
                                <form action="#" id="subscribe-form">
                                    <input type="email" placeholder="Info@yourgmail.com" required="" id="subscribe-email" />
                                    <button className="tf-button" type="submit" id="subscribe-button"><i className="icon-fl-send"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {
                isVisible && 
                <Link onClick={scrollToTop}  to='#' id="scroll-top"></Link>
            }
           </footer>
    );
}

export default Footer;