import React, { useState ,useEffect} from 'react';
import { Button, TextField } from '@mui/material';
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { editQuizz } from '../services/quizz';
import { getquizz } from '../services/quizz';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'; 
import {  getAllquestions } from '../services/question';

const styles = {
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '500px',
    width: '80%',
    zIndex: '9999',
  },
  textField: {
    marginBottom: '20px',
  },
  buttonS: {
    margin: '10px',
    minWidth: '120px',
  },
  buttonC: {
    //borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
    //margin: '10px',
    //minWidth: '120px',
    backgroundColor: "#6c757d",
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  footer: {
    textAlign: 'right',
    marginTop: '20px',
  },

};
function QuizzUpdate(props) {

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

  const [questionsE, setquestionsE] = useState('');
  const [showquestionsE, setshowquestionsE] = useState(false);

  const [tentativeE, setTentativeE] = useState('');
  const [showtentative, setshowtentative] = useState(false);
  const [titre, setTitre] = useState(props.initialValues.titre || '');
  const [description, setDescription] = useState(props.initialValues.description || '');
  const [duree, setDuree] = useState(props.initialValues.duree || '');
  const [dateDebut, setDatedebut] = useState(props.initialValues.dateDebut || '');
  const [dateFin, setDatefin] = useState(props.initialValues.dateFin || '');
  const [level, setLevel] = useState(props.initialValues.level || '');
  const [tentative, settentative] = useState(props.initialValues.tentative || '');

  const [questions, setQuestions] = useState(props.initialValues.questions || '');

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionList, setQuestionList] = useState([]);

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
  
const  quizz={
  titre,
  description,
  duree,
  dateDebut,
  dateFin,
  level,
  tentative,
 questions,
};

useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const quizzResult = await getquizz(props.initialValues._id);
      const questionsFromQuizz = quizzResult.data.quizz.questions;
      const selectedQuestions = questionsFromQuizz.map(question => ({
        value: question._id,
        label: question.ennonce
      }));
      const questionResult = await getAllquestions();
      const allQuestions = questionResult.data.map(question => ({
        label: question.ennonce,
        value: question._id
      }));

      let availableQuestions = allQuestions.filter(question => {
        return !selectedQuestions.find(selected => selected.value === question.value);
      });

      setSelectedOptions(selectedQuestions);
      setQuestionList(availableQuestions);
    } catch (error) {
      console.error("Erreur lors de la récupération des questions et du quizz:", error);
    }
  };

  fetchQuestions();
}, [props.initialValues._id]);

const handleSelect = (selected) => {
  setSelectedOptions(selected);
};
const handleQuestionDeselect = (removedOption) => {
  const newSelectedOptions = selectedOptions.filter(option => option !== removedOption);
  setSelectedOptions(newSelectedOptions);
};
const updateQuizz = async () => {
  if (!quizz.titre) {
    settitreErr('Please fill in the title');
    setshowtitre(true);
    return;  }
    if (!quizz.description) {
      setdescriptionErr('Please fill in the description');
      setshowdescription(true) ;
      return; }
    if (!quizz.duree) {
        setdureeErr('Please fill in the duration');
        setshowduree(true);
        return;  }
        if (!quizz.dateDebut) {
          setdebut('Please fill in the start date');
          setshowdebut(true);
          return;  }
          if (!quizz.dateDebut) {
            setfin('Please fill in the end date');
            setshowfin(true);
            return;  }
            if (!quizz.tentative) {
             setTentativeE('Please fill in the attempts');
              setshowtentative(true);
              return;  }
            if (!quizz.questions) {
              setquestionsE('Please fill in the questions');
              setshowquestionsE(true) ;
              return; }
  const updatedQuizz = {
    _id: props.initialValues._id,
    titre,
    description,
    duree,
    dateDebut,
    dateFin,
    level,
    tentative,
    questions: [...questions, ...selectedOptions.map(option => option.value)],
  };
  
  console.log("vvv",updatedQuizz);
  const result = await editQuizz(props.initialValues._id, updatedQuizz);
  console.log("result",result);

  if (result) {
    console.log("Quizz updated successfully");
    Swal.fire({
      icon: 'success',
      title: 'Quizz updated successfully!',
      showConfirmButton: false,
      timer: 1500 
    }).then(() => {
      if (props.onHide) {
        handleModalClose();
      }
    });
  }
};
const handleModalClose = () => {
  if (props.onHide) {
    props.onHide();
  }
};
  return (

    
    <Modal
    show={props.show}
    onHide={handleModalClose}    > 


      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Update Quizz</h3>

        <MDBContainer fluid>

          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Title</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='titre' type='text' value={titre}
                  onChange={(e) => { setTitre(e.target.value); 
                    settitreErr(''); }}
               />
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
    <textarea className='form-control form-control-lg' style={{ border: '1px solid', borderRadius: '20px' }}  name='description' value={description} 
      onChange={(e) => { setDescription(e.target.value); 
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
              <MDBInput size='lg' name='duree' type='number' value={duree}
                onChange={(e) => {
                  setDuree(  e.target.value );
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
              <h11 className="mb-0">Tentt</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='tentative' type='number' value={tentative}
                onChange={(e) => {
                  settentative(  e.target.value );
                   setTentativeE('');
                }} />
            </MDBCol>
          </MDBRow>
          {showtentative && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{tentativeE}</p>
              </MDBCol>
            </MDBRow>)}
        <MDBRow className='align-items-center pt-4 pb-3'>
  <MDBCol md='3' className='ps-5'>
    <h11 className="mb-0">Level</h11>
  </MDBCol>
  <MDBCol md='9' className='pe-5'>
    <select className='form-control form-control-lg' style={{ border: '1px solid', borderRadius: '20px' }} name='level' value={level} onChange={(e) => {
      setLevel( e.target.value );
    }}>
       <option value="non precise level">non precise level </option>
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

      selected={dateDebut? new Date(dateDebut) : null} 
      onChange={(dateD) => { 
        setDatedebut(dateD);
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
      selected={dateFin? new Date(dateFin) : null} 
      onChange={(dateF) => { 
        setDatefin(dateF);        
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
              options={questionList}
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />
              {console.log("r",selectedOptions)}

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
  <button  className="button-popup" onClick={updateQuizz} style={{ width: '100px', marginLeft: '450px' }} >Save</button>
</div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default QuizzUpdate;