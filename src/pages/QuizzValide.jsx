import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAllquizzs } from '../services/quizz';
import { getuser } from '../services/question';
import SideProfile from './SideProfile';
import img from '../assets/images/BATTERIE.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Container, Grid, Typography, makeStyles,CardContent,Card } from "@material-ui/core";

import 'sweetalert2/src/sweetalert2.scss';

function QuizzValide() {
    const { id } = useParams();
    const [quizData, setQuizData] = useState();

  const [user, setUser] = useState({});
  const [quizzList, setQuizzList] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [resultResponse, setResultResponse] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showExist, setshowExist] = useState(false);


  function getUserInfoFromCookie() {
    var cookieValue = document.cookie.match(/(?:^|;) ?user=([^;]*)(?:;|$)/);

    if (cookieValue) {
      var decodedValue = decodeURIComponent(cookieValue[1].replace(/\+/g, ' '));

      var userObject = JSON.parse(decodedValue);

      return userObject;
    } else {
      return null;
    }
  }

   var currentUser = getUserInfoFromCookie();
  useEffect(() => {
    const fetchQuizData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/quizz/show/${id}`);
            setQuizData(response.data.quizz); 
        } catch (error) {
            console.error('Error fetching quiz data:', error);
        }
    };
    if (id) {
        fetchQuizData();
    }
}, [id]);
if (!quizData) {
    return <div>Loading...</div>;
}
  console.log('rrrrrr',quizData);
  console.log("ih",currentUser);
 const quizzItemStyle = {
  color:'black',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    alignItems: 'center',
  };
  const result= async () =>{
    const response = await axios.get(`http://localhost:4000/result/user/${currentUser._id}/quiz/${id}`);
    const userAttempts = response.data.length;
    if (userAttempts){
     setResultResponse(response.data);
      setShowResults(true);
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You dont have pass the quizz",
        footer: '<a href="#">Why do I have this issue?</a>',
        showCancelButton: true,
      
    });
      
    }
  }
  const handleStartQuiz = async () => {
    if (quizData) {
        const currentDate = new Date();
        const startDate = new Date(quizData.dateDebut);
        const endDate = new Date(quizData.dateFin);

        if (currentDate >= startDate && currentDate <= endDate) {
            try { 
                const response = await axios.get(`http://localhost:4000/result/user/${currentUser._id}/quiz/${id}`);
                const userAttempts = response.data.length;
                console.log("userAttempts", userAttempts);
                console.log("quizData", quizData.tentative);

                if (userAttempts < quizData.tentative) {
                    setShowQuiz(true);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You have exceeded the number of attempts for this quiz",
                    footer: '<a href="#">Why do I have this issue?</a>',
                    showCancelButton: true,
                  
                });
                  
                }
                                

               
            } catch (error) {
                console.error('Error fetching user attempts:', error);
                
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "expiré ou pas encore",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }
}

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
    <div className="row">                 
      <div className="col-12 col-md-3">
        <SideProfile/>
      </div>
      <div className="col-12 col-md-9">
        <div className="dashboard-content inventory content-tab">
          <section className="tf-item-detail">
            <div className="tf-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="tf-item-detail-inner">
                  <div className="content text-center col-md-12">
                  
                      <div style={quizzItemStyle}>
                        <h3>{quizData.titre}</h3>
                        <p style={{ color: 'black' }}>{quizData.description}</p>
                        <p>Start Date:   {new Date(quizData.dateDebut).toLocaleString()}</p> 
                      
                        <p>Duration: {quizData.duree} minutes</p> 
                        <p>Number of questions: {quizData.questions.length}</p> 
                        {!showQuiz && (
                                                                <Button variant="contained" color="primary" onClick={handleStartQuiz}>
                                                                    Commencer le quiz
                                                                </Button>
                                                            )}
                                                            {showQuiz && (
                                                                <Link to={`/quizz/${id}`}>
                                                                    <Button variant="contained" color="primary">
                                                                        Commencer le quiz
                                                                    </Button>
                                                                 
                                                                </Link>
                                                            )}
                                                        <Button variant="contained" color="info" onClick={result}>
                                                                        Results
                                                                    </Button>
                                                          </div>
                                                          </div>
                                                          </div>
                                                          
                                                          {showResults && (
  <div className="tf-item-detail-inner">
    <div className="content text-center col-md-12">
      <div style={quizzItemStyle}>
        <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', color: '#4155c2', fontSize: '24px', marginBottom: '20px' }}>
          Result
        </Typography>
        <Typography variant="body1" gutterBottom style={{ marginBottom: '1rem', fontSize: '18px', fontWeight: 'bold' }}>
          Title of quizz: {quizData && quizData.titre}
        </Typography>
        {resultResponse && resultResponse.map((response, index) => (
          <Card key={index} style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '20px' }}>
                Attempt : {index + 1}
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '18px' }}>
                Score : {response.score}
              </Typography>
              {response.responses.map((questionResponse, i) => {
                const question = questionResponse.questionId;
                const selectedOptions = questionResponse.selectedOptions || [];
                const correctResponses = question.responses || [];

                // Vérifier si la question est correcte ou incorrecte
                const isQuestionCorrect = correctResponses.every(response => {
                  return selectedOptions.includes(response.content) === response.isCorrect;
                });

                return (
                  <div key={i} style={{ marginBottom: '1rem' }}>
                    <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold', fontSize: '16px' }}>
                      Question {i + 1}:  {question ? question.ennonce : ''}
                    </Typography>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '0.5rem' }}>
                      <li style={{ fontWeight: 'bold' }}>
                        Responses :
                        {questionResponse.questionId.responses.map((response, index) => (
                          <span key={index} style={{ marginRight: '1rem' }}>
                            {response.content} : {response.isCorrect ? 'Correcte' : 'Incorrecte'}
                          </span>
                        ))}
                      </li>
                      <li style={{ fontWeight: 'bold' }}>
                        Options selected :
                        {selectedOptions.length > 0 ? (
                          <div>
                            {selectedOptions.map((option, j) => (
                              <div key={j}>
                                <span style={{ marginRight: '1rem' }}>{option},</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span>none selected</span>
                        )}
                        <p style={{ fontWeight: 'bold', color: isQuestionCorrect ? 'green' : 'red' }}>
                          Your response is {isQuestionCorrect ? 'correct' : 'incorrect'}
                        </p>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
)}


                     
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}

export default QuizzValide;
