import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../components/pagetitle/PageTitle';
import { useId } from 'react-tabs';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import icon1 from '../assets/images/svg/metamask.svg'
import icon2 from '../assets/images/svg/coinbase.svg'
import icon3 from '../assets/images/svg/torus.svg'
import icon4 from '../assets/images/svg/fortmatic.svg'
import icon5 from '../assets/images/svg/drap-upload.svg'
import img1 from '../assets/images/collection/add-collection.jpg'
import img from '../assets/images/conservatoire.jpg'
import ico1 from '../assets/images/icon/rain1.svg'
import ico2 from '../assets/images/icon/rain2.svg'
import ico3 from '../assets/images/icon/ethe.svg'
import avt from '../assets/images/author/author1.png'


Create.propTypes = {
    
};

function Create(props) {
    return (
        <div>
            <PageTitle none='none'  title='About Us ' />

            <section className="tf-add-nft">
                <div className="tf-container">
                    <div className="row ">
                        <div className="col-xl-9 col-lg-8 ">
                            <div className="add-nft-inner">
                           

<span>
    <br/>
</span>
                                <p> Since 1999, Conservatoire El Kindy has nurtured generations of musical artists through a rich and demanding education and the discipline of a team of experienced specialists and teachers who continually guide and mentor budding artists over the years. Conservatory students have excelled in national competitions such as the amateur soloists of Megrine and the Néapolis days, among others. Their learning journey is often culminated by obtaining the diploma in Arabic music recognized by the Tunisian Ministry of Culture.</p>

                             

                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <h5 className="title-preview"></h5>
                            <div className="sc-product style1">
                                <div className="top">
                                    <Link to="#" className="tag">EL KINDY CONSERVATORY </Link>
                                        <Link to="#" className="heart-icon"></Link>
                                   
                                </div>
                                <div className="features">
                                    <div className="product-media">
                                        <img src={img} alt="images" />
                                    </div>
                                 
                             
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            
        </div>
    );
}

export default Create;