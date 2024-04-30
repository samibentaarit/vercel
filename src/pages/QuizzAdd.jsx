import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2';
import {  getAllquestions } from '../services/question';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'; 

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
  MDBInputGroup
}
  from 'mdb-react-ui-kit';
const styles = {
    popup: {        
        backgroundColor: 'trasparent',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',        
      },
  buttonS: {
    margin: '10px',
    minWidth: '120px',

  },
  buttonC: {
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
    backgroundColor: "#6c757d",


  },
  footer: {
    textAlign: 'right',
    marginTop: '20px',
  },
  


};


function QuizzAdd(props) {

  // ERROR CONSTANT 
  
  
  const [titreErr, settitreErr] = useState('');
  const [showtitre, setshowtitre] = useState(false);
 
  const [descriptionErr, setdescriptionErr] = useState('');
  const [showdescription, setshowdescription] = useState(false);

  const [dureeErr, setdureeErr] = useState('');
  const [showduree, setshowduree] = useState(false);
 
  const [fin, setfin] = useState('');
  const [showfin, setshowfin] = useState(false);

  const [debut, setdebut] = useState('');
  const [showdebut, setshowdebut] = useState(false);
  const [tentative, setTentative] = useState('');
  const [showtentative, setshowtentative] = useState(false);


  const [questionsE, setquestionsE] = useState('');
  const [showquestionsE, setshowquestionsE] = useState(false);
  
  
   const [quizzItem, setquizzItem] = useState({
     titre: "",
     description: "",
     duree: "",
     dateDebut: "",
     dateFin: "",
     level: "non precise level",
     tentative:"",
     questions:"",
     total:0,
   });
  
   const [questionList, setQuestionList] = useState([]);
   const [List, setList] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionResult = await getAllquestions();
        setQuestionList(questionResult.data.map(question => ({
          label: question.ennonce, 
          value: question._id 
        })));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  function handleSelect(data) {
    setSelectedOptions(data);
    setquizzItem(quizzItem => ({
      ...quizzItem,
      questions: data
    }));

   setquestionsE(' ');
  }
   const navigate = useNavigate();

   const onValueChange = (e, index) => {
     const { name, value } = e.currentTarget; 
     setquizzItem({ ...quizzItem });
   };
 
   const handleModalClose = () => {
    setquizzItem({
      titre: "",
      description: "",
      duree: "",
      dateDebut: "",
      dateFin: "",
      level: "",
      tentative:"",
      questions:"",
    });
    settitreErr('');
    setdescriptionErr('');
    setdureeErr('');
    setdebut('');
    setfin('');
setquestionsE('')   ;
 setTentative('');

    if (props.onHide) {
      props.onHide();
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      border: '1px solid #ced4da',
    }),
  };
  const url = "http://localhost:4000/quizz";
 
   const AddQuizz = async (e) => {
    if (!quizzItem.titre) {
      settitreErr('Please fill in the title');
      setshowtitre(true) }
      if (!quizzItem.description) {
        setdescriptionErr('Please fill in the description');
        setshowdescription(true) }
      if (!quizzItem.duree) {
          setdureeErr('Please fill in the duration');
          setshowduree(true) }
          if (quizzItem.duree<=0) {
            setdureeErr('Please fill in the duration >= 0 ');
            setshowduree(true) ;return;
          }
          if (!quizzItem.dateDebut) {
            setdebut('Please fill in the start date');
            setshowdebut(true) }
            if (!quizzItem.dateFin) {
              setfin('Please fill in the end date');
              setshowfin(true) }
              if (!quizzItem.tentative) {
                setTentative('Please fill in the tent');
                setshowtentative(true) }
                if (quizzItem.tentative<=0) {
                  setTentative('Please fill in the attempt >= 0');
                  setshowtentative(true);return;
              }
              if (!quizzItem.questions) {
                setquestionsE('Please fill in the questions');
                setshowquestionsE(true) ;
             }

     e.preventDefault();
     
     try {
      const formData = new FormData();
       formData.append("titre", quizzItem.titre);
       formData.append("description", quizzItem.description);
       formData.append("duree", quizzItem.duree);
       formData.append("dateDebut", quizzItem.dateDebut);
       formData.append("dateFin", quizzItem.dateFin);
       formData.append("level", quizzItem.level);
       formData.append("tentative", quizzItem.tentative);
       formData.append("total", quizzItem.total);

       formData.append("questions", JSON.stringify(quizzItem.questions));
      // console.log(formData.);
      formData.forEach(function(value, key){
       console.log(key + ': ' + value);
   });  
console.log("dddd",quizzItem);
       const result = await axios.post(`${url}/add`, quizzItem);
       console.log("dddd222",result);

       if (result.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Quizz added successfully!',
          showConfirmButton: false,
          timer: 1500 
        }).then(() => {
          if (props.onHide) {
           handleModalClose();
          }
         
        });
               }
     } catch (error) {
       console.log(error);
     }
   };
   
  return (

    <Modal style={styles.popup}
    show={props.show}
    onHide={handleModalClose}
    >

      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Add Quizz</h3>

        <MDBContainer fluid>

          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Title</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='titre' type='text' value={quizzItem.titre}
                onChange={(e) => {
                    setquizzItem({ ...quizzItem, titre: e.target.value });
                   settitreErr('');
                }} />
            </MDBCol>
          </MDBRow>
          {showtitre && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{titreErr}</p>
              </MDBCol>
            </MDBRow>)}
          <MDBRow className='align-items-center pt-4 pb-3'>
  <MDBCol md='3' className='ps-5'>
    <h11 className="mb-0">Description</h11>
  </MDBCol>
  <MDBCol md='9' className='pe-5'>
    <textarea className='form-control form-control-lg' style={{ border: '1px solid', borderRadius: '20px' }}  name='description' value={quizzItem.description} onChange={(e) => {
      setquizzItem({ ...quizzItem, description: e.target.value });
      setdescriptionErr('');
    }} />
  </MDBCol>
</MDBRow>
{showdescription && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{descriptionErr}</p>
              </MDBCol>
            </MDBRow>)}
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Duration(minute)</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='duree' type='number' value={quizzItem.duree}
                onChange={(e) => {
                  setquizzItem({ ...quizzItem, duree: e.target.value });
                   setdureeErr('');
                }} />
            </MDBCol>
          </MDBRow>
          {showduree && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{dureeErr}</p>
              </MDBCol>
            </MDBRow>)}
            <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Tentatives</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='duree' type='number' value={quizzItem.tentative}
                onChange={(e) => {
                  setquizzItem({ ...quizzItem, tentative: e.target.value });
                   setTentative('');
                }} />
            </MDBCol>
          </MDBRow>
          {showtentative && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{tentative}</p>
              </MDBCol>
            </MDBRow>)}
        <MDBRow className='align-items-center pt-4 pb-3'>
  <MDBCol md='3' className='ps-5'>
    <h11 className="mb-0">Level</h11>
  </MDBCol>
  <MDBCol md='9' className='pe-5'>
    <select className='form-control form-control-lg' style={{ border: '1px solid', borderRadius: '20px' }} name='level' value={quizzItem.level} onChange={(e) => {
      setquizzItem({ ...quizzItem, level: e.target.value });
    }}>
       <option value="nonpreciselevel">non precise level </option>
      <option value="gradelevel1">gradelevel1</option>
      <option value="gradelevel2">gradelevel2</option>
      <option value="gradelevel3">gradelevel3</option>
      <option value="gradelevel4">gradelevel4</option>
      <option value="gradelevel5">gradelevel5</option>
      <option value="gradelevel6">gradelevel6</option>
      <option value="gradelevel7">gradelevel7</option>
    </select>
  </MDBCol>
</MDBRow>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Start Date </h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
            <DatePicker
      selected={quizzItem.dateDebut} 
      onChange={(dateD) => { 
        setquizzItem({ ...quizzItem, dateDebut: dateD });
        setdebut('');
      }}
     
     name='dateDebut'
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        calendarClassName="custom-calendar"
        dateFormat="dd/MM/yyyy h:mm aa"
        />
    
            </MDBCol>
          </MDBRow>
          {showdebut && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{debut}</p>
              </MDBCol>
            </MDBRow>)}
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">End Date </h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
            <DatePicker
      selected={quizzItem.dateFin} 
      onChange={(dateF) => { 
        setquizzItem({ ...quizzItem, dateFin: dateF });
        setfin('');
      }}
      name='dateFin'
      showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="dd/MM/yyyy h:mm aa"
        />
            </MDBCol>
          </MDBRow>
          {showfin && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{fin}</p>
              </MDBCol>
            </MDBRow>)}

    
    
          <div className="app">
      <h3>Choose your questions</h3>
      <div className="dropdown-container">
        <Select
          styles={customStyles}
          options={questionList}
          placeholder="Select questions"
          value={selectedOptions}
          onChange={handleSelect}
        
          isSearchable={true}
          isMulti
        />
        {console.log(selectedOptions)}

      </div>
    </div>
          
    {showquestionsE && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{questionsE}</p>
              </MDBCol>
            </MDBRow>)}
          <div style={styles.footer}>
  <button  className="button-popup" onClick={AddQuizz} style={{ width: '100px', marginLeft: '450px' }} >Save</button>
</div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default QuizzAdd;