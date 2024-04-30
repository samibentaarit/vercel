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

function QuizzDetail(props) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/quizz/show/${id}`);
                setData(response.data.quizz);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // Ensure id is in the dependency array

    return (
        <div>
            <section className="tf-page-title ">    
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumbs">
                                <li><Link to="/">Home</Link></li>
                                <li>Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>  
                <div className="container-fluid"  style={{ width: '100%' }}>
                    <div className="row"  style={{ width: '100%' }}>
                        <div className="thumb-pagetitle"  style={{ width: '100%' }}>
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
                                <Dashboard/>
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                                <div className="dashboard-content inventory content-tab">
                                    <PageTitle sub='Explore' title='Item Details' />
                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div >
                                                        <div className="content">
                                                        <Tabs className="tf-tab">
    <TabList className="menu-tab">
        <Tab className="tab-title active"><Link to="#">Quizz</Link></Tab>
        <Tab className="tab-title"><Link to="#">Questions</Link></Tab>
    </TabList>
    <TabPanel>
        {data && (
            <div className="tab-details">
                <div>
                    <p><strong>Title: </strong> {data.titre}</p>
                    <p><strong>Description: </strong> {data.description}</p>
                    <p><strong>Duration:  </strong>{data.duree}</p>
                    <p><strong>Attempts: </strong> {data.tentative}</p>

                    <p><strong>Start Date : </strong> {new Date(data.dateDebut).toLocaleDateString()} {new Date(data.dateDebut).toLocaleTimeString()}</p>
                    <p><strong>End Date :  </strong>{new Date(data.dateFin).toLocaleDateString()} {new Date(data.dateFin).toLocaleTimeString()}</p>
                </div>
            </div>
        )}
    </TabPanel>
    <TabPanel>
  {data && data.questions.map((question, index) => (
    <div key={index} className="tab-details">
      <p><strong>Question {index + 1}: </strong>{question.ennonce}</p>
      {question.image.url && ( // Vérifiez si question.image existe
        <img src={question.image.url} height="200px" width="200px"  />
      )}
            <p><strong>Points : </strong>{question.point}</p>

      <p><strong>Réponses: </strong></p>
      <ul>
        {question.responses.map((response, index) => (
          <li key={index}>
            <strong>Contenu :</strong> {response.content}, <strong>est correcte :</strong> {response.isCorrect.toString()}
          </li>
        ))}
      </ul>
    </div>
  ))}
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

export default QuizzDetail;