import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CardModal from '../layouts/CardModal';
import { Link } from 'react-router-dom';





Explore.propTypes = {
    data : PropTypes.array,
};

function Explore(props) {

    const {data} = props;

    const [modalShow, setModalShow] = useState(false);

    const [dataTab] = useState([
        {
            id: 1,
            title: '3D MODEL',
            item: 0,
        },
        {
            id: 2,
            title: 'ANIME/MANGA',
            item: 4,
        },
        {
            id: 3,
            title: 'CYBER PUNK',
            item: 2,
        },
        {
            id: 4,
            title: 'PIXEL ART',
            item: 6,
        },
        {
            id: 5,
            title: 'MUSIC',
            item: 7,
        },
        {
            id: 6,
            title: 'ABSTRACT',
            item: 1,
        },
        {
            id: 7,
            title: '2D ARTS',
            item: 3,
        },

    ]);
    return (
        <section className="tf-section tf-explore tf-filter tf-center">
                <div className="tf-container">
                    <div className="row ">
                        <div className="col-md-12">
                            <div className="tf-heading style-2 wow fadeInUp">
                                <h4 className="heading">Quizz</h4>
                            </div>
                        </div>
                        <div className="col-md-12">
                        <Tabs>
                            <TabList>
                                {
                                    dataTab.map(idx => (
                                        <Tab key={idx.id}>{idx.title}</Tab>
                                    ))
                                }
                                
                            </TabList>


                            {
                                dataTab.map(idx => (
                                    <TabPanel key={idx.id}>
                                        <div className="row tf-filter-container wow fadeInUp">
                                            {
                                                data.slice(idx.item, 8).map(idx => (
                                                    <div key={idx.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                                                        <div className="sc-product style3">
                                                            <div className="features">
                                                                <div className="product-media">
                                                                    <img src={idx.img} alt="images" />
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <div className="details-product">
                                                                    <div className="title"> <Link to="/item-details">{idx.title}</Link> </div>
                                                                </div>
                                                               
                                                                <div className="profile-author">
                                                                    <Link to="#" className="avatar" data-tooltip="Creator: Daniel Jordan" tabIndex="0"><img src={idx.avt1} alt="images" /></Link>
                                                                    <Link to="#" className="avatar" data-tooltip="Creator: Daniel Rose" tabIndex="0"><img src={idx.avt2} alt="images" /></Link>
                                                                    <Link to="#" className="avatar" data-tooltip="Creator: Solvador" tabIndex="0"><img src={idx.avt3} alt="images" /></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        
                                        </div>
                                    </TabPanel>
                                ))
                            }
                            

                        </Tabs> 
                        </div>
                        <div className="col-md-12">
                            <div className="btn-loadmore mt8 wow fadeInUp">
                                <Link to="/explore-v1" className="tf-button loadmore style-4">Load more</Link>
                            </div>
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

export default Explore;