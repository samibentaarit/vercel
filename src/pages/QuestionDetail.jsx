import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import Dashboard from './Dashboard';
import img from '../assets/images/BATTERIE.jpg'
import PropTypes from 'prop-types';
import img1 from '../assets/images/item-details.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function QuestionDetail(props) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/question/show/${id}`);
                console.log("response",response);
                setData(response.data.question);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // Ensure id is in the dependency array
    console.log('Current data:', data);

    return (
        <div>
            <section class="tf-page-title ">    
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumbs">
                                <li><Link to="/">Home</Link></li>
                                <li>Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>  
                <div class="container-fluid"  style={{ width: '100%' }}>
                    <div class="row"  style={{ width: '100%' }}>
                        <div class="thumb-pagetitle"  style={{ width: '100%' }}>
                            <img src={img} alt="images"   style={{ width: '100%' }}/>
                        </div>
                    </div>
                </div>                  
            </section>
            <section className="tf-dashboard tf-tab">
                <div className="tf-container">
                    <Tabs className='dashboard-filter'>
                        <div className="row ">                 
                            <div className="col-xl-3 col-lg-12 col-md-12">
                                <Dashboard/>
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                                <div className="dashboard-content inventory content-tab">
                                    <PageTitle sub='Explore' title='Item Details' />
                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="tf-item-detail-inner">
                                                        <div className="image">
                                                        {data && data.image.url && (
        <img src={data.image.url}  height="500px" width="500px"/>
    )}                                                        </div>
                                                        <div className="content">
                                                            <Tabs className="tf-tab">
                                                                <TabList className="menu-tab ">
                                                                    <Tab className="tab-title active"><Link to="#">Question</Link></Tab>
                                                                </TabList>
                                                                <TabPanel >
                                                                {data && (
    <div className="tab-details">
        <div>
            <p><strong>Ennonce: </strong>{data.ennonce}</p>
           
            <p><strong>Responses :</strong></p>
<ul>
    {data.responsesData.map((response, index) => (
          <li key={index}>
        <strong>  Content: </strong>{response.content},  <strong> Is Correct:</strong> {response.isCorrect.toString()}
      </li>

    ))}
</ul>
        </div>
       
        
    </div>
)}
                                                                </TabPanel>
                                                            </Tabs> 
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

export default QuestionDetail;
