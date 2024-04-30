import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { getAllquizzs } from '../services/quizz';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg';
import { getuser } from '../services/question';
import SideProfile from './SideProfile';
import { FiLogIn } from 'react-icons/fi';

function QuizzComp() {
  const [user, setUser] = useState({});
  const [quizzList, setQuizzList] = useState([]);

  function getUserInfoFromCookie() {
    // Obtenez la valeur du cookie actuel (vous pouvez remplacer document.cookie par la méthode que vous utilisez pour récupérer les cookies)
    var cookieValue = document.cookie.match(/(?:^|;) ?user=([^;]*)(?:;|$)/);

    if (cookieValue) {
      // Décodez la chaîne JSON
      var decodedValue = decodeURIComponent(cookieValue[1].replace(/\+/g, ' '));

      // Convertissez la chaîne JSON en objet JavaScript
      var userObject = JSON.parse(decodedValue);

      // Retournez l'objet utilisateur
      return userObject;
    } else {
      // Retournez null si le cookie n'est pas trouvé
      return null;
    }
  }

  // Utilisez la fonction pour obtenir les informations de l'utilisateur
   var currentUser = getUserInfoFromCookie();
   console.log("r",currentUser);
 // setUser(currentUser);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzResult = await getAllquizzs();
        const filteredQuizzes = quizzResult.data.filter(quiz => quiz.level === currentUser.level);
        setQuizzList(filteredQuizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
  
    fetchQuizzes();
  }, [currentUser.level]);

  const quizzItemStyle = {
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    color:'black',
  };

  const quizzTitleStyle = {
    marginBottom: '5px',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  };

  const quizzLinkStyle = {
    color: '#15a5e6',
    textDecoration: 'none',
    marginLeft: '10px',
  };
  const title = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
    //textTransform: 'uppercase',
    letterSpacing: '2px',
  };
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
        <div className="container-fluid" style={{ width: '100%' }}>
          <div className="row" style={{ width: '100%' }}>
            <div className="thumb-pagetitle" style={{ width: '100%' }}>
              <img src={img} alt="images" style={{ width: '100%' }}/>
            </div>
          </div>
        </div>                     
      </section>

      <section className="tf-dashboard tf-tab">
        <div className="tf-container">
          <Tabs className='dashboard-filter'>
            <div className="row ">                 
              <div className="col-xl-3 col-lg-12 col-md-12">
                <SideProfile/>
              </div>
              <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                <div className="dashboard-content inventory content-tab">
                  <section className="tf-item-detail">
                    <div className="tf-container">
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <div className="tf-item-detail-inner">
                            <div className=" col-md-2" ></div>
                            <div className="content  col-md-6">
                            <h2 style={title} className="title-detail"></h2>
                              {quizzList && quizzList.map((item, index) => (                             
                                <div key={index} style={quizzItemStyle}>
                                  <h3 style={quizzTitleStyle}>
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      height="1em"
                                      width="1em"
                                    >
                                      <path d="M20.315 4.319l-8.69 8.719-3.31-3.322-2.069 2.076 5.379 5.398 10.76-10.796zM5.849 14.689L0 19.682h24l-5.864-4.991h-3.2l-1.024.896h3.584l3.072 2.815H3.417l3.072-2.815h2.688l-.896-.896z" />
                                    </svg>                                   
                                    <Link to={`/quizz/validation/${item._id}`} style={quizzLinkStyle}>
                                      {item.titre}
                                    </Link>
                                  </h3>
                                  <p>{item.description}</p>
                                </div>
                              ))}
                            </div>
                            <div className=" col-md-4" ></div>
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

export default QuizzComp;
