import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import Dashboard from './Dashboard';
import img from '../assets/images/BATTERIE.jpg'

import PropTypes from 'prop-types';
import img1 from '../assets/images/item-details.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import avtd1 from '../assets/images/author/author-detail-1.png'
import avtd2 from '../assets/images/author/author-detail-2.png'
import avtd3 from '../assets/images/author/authour-bid-1.png'
import avtd4 from '../assets/images/author/authour-bid-2.png'
import avtd5 from '../assets/images/author/authour-bid-3.png'
import avtd6 from '../assets/images/author/author-history-1.jpg'
import avtd7 from '../assets/images/author/author-history-2.jpg'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ShowUser(props) {

    const { id } = useParams();
    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/users/users/${id}`);
        console.log('Full response:', response); // Log the entire response

        setData(response.data); // Update here
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // Ensure id is in the dependency array

  console.log('Current data:', data);

  if (!data) {
    // Data is still loading
    return <p>Loading...</p>;
  }

    return (
        <div>
            <section class="tf-page-title ">
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumbs">
                                <li><Link to="/dash">Home</Link></li>
                                <li>Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="container-fluid" style={{ width: '100%' }}>
                    <div class="row" style={{ width: '100%' }}>
                        <div class="thumb-pagetitle" style={{ width: '100%' }}>
                            <img src={img} alt="images" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
            </section>


            <section className="tf-dashboard tf-tab">
                <div className="tf-container">
                    <Tabs className='dashboard-filter'>
                        <div className="row ">
                            <div className="col-xl-3 col-lg-12 col-md-12">
                                <Dashboard />
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                                <div className="dashboard-content inventory content-tab">



                                    <PageTitle sub='User' title='Detail' />

                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="tf-item-detail-inner">
                                                        <div className="image">
                                                        <div className="image">
  {data.image ? (
    <img src={data.image.url} alt="Binasea" style={{ width: '200px', height: '200px' }} />
  ) : (
    <p></p>
  )}
</div><div className="content">
  <h2 className="title-detail">I'm {data.firstName}</h2>

  <Tabs className="tf-tab">
    <TabList className="menu-tab">
      <Tab className="tab-title">
        <Link to="#">firstName</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">lastName</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">email</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">role</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">phoneNumber</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">level</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">speciality</Link>
      </Tab>
      
    </TabList>
    <TabPanel>
      <div className="tab-details">
        <p> {data.firstName}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{data.lastName}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{data.email}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{data.role}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p> {data.phoneNumber}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{data.level}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p> {data.speciality.join(', ')}</p>
      </div>
    </TabPanel>
  </Tabs>
</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>

                                    </section>



                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </section>
        </div>
    );
}

export default ShowUser;