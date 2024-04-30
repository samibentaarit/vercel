import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";

import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import {  getAllquestions } from '../services/question';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

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
import ViewQuestion  from "./viewQuestion";
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


function QuestionAdd(props) {

  
  
  const [ennonceErr, setEnnonceErr] = useState('');
  const [showErrE, setshowErrE] = useState(false);
 
  const [respErr, setrespErr] = useState('');
  const [showResp, setshowResp] = useState(false);

  const [pointErr, setpointErr] = useState('');
  const [showPoint, setshowPoint] = useState(false);
  
  
   const [questionItem, setQuestionItem] = useState({
     ennonce: "",
     image: "",
     point:"",
     responsesData: [{ content: "", isCorrect: false ,img:""}]
   });
   const [image, setImage] = useState("");

   const navigate = useNavigate();
 
   const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

  const handleChangeFile = (e) => {
    const imageFile = e.target.files[0];
    previewFiles(imageFile);
  };
   const removeResponse = (indexToRemove) => {
    setQuestionItem(prevQuestionItem => ({
        ...prevQuestionItem,
        responsesData: prevQuestionItem.responsesData.filter((_, index) => index !== indexToRemove)
    }));
};

 
   const onValueChange = (e, index) => {
     const { name, value } = e.currentTarget;
     const updatedResponses = [...questionItem.responsesData];
     updatedResponses[index][name] = name === "isCorrect" ? value === "true" : value;
  
  setQuestionItem({ ...questionItem, responsesData: updatedResponses });
   };
 
   const handleAddResponse = () => {
     setQuestionItem({
       ...questionItem,
       responsesData: [...questionItem.responsesData, { content: "", isCorrect: false }]
     });
   };
 
   const url = "http://localhost:4000/question";
 
   const AddQuestion = async (e) => {

  questionItem.responsesData.forEach((response, index) => {
    if (!response.content.trim()) {
      setrespErr(`Please fill in response `);
      setshowResp(true);
    }
  });
 
     if (!questionItem.ennonce  ) {
       setEnnonceErr('Please fill in the question');
       setshowErrE(true) }
    
    if (!questionItem.point) {
          setpointErr('Please fill in the point');
          setshowPoint(true) }
          if (questionItem.point<=0) {
            setpointErr('Please fill in the point >= 0');
            setshowPoint(true) ;
            return;
          }
 
     try {
      const formData = new FormData();
formData.append("ennonce", questionItem.ennonce);
formData.append("point", questionItem.point);

if (image) {
  formData.append("image", image);
}
formData.append("responsesData", JSON.stringify(questionItem.responsesData));
/*questionItem.responsesData.map((response, index) => {
  if (response.img) {
    formData.append(`img[${index}]`, response.img);
  }
  formData.append("responsesData", JSON.stringify(questionItem.responsesData[index]));
 
});*/

       
      // console.log(formData.);
     formData.forEach(function(value, key){
       console.log(key + ': ' + value);
   });  
  
       const result = await axios.post(`${url}/add`, formData, {
         headers: {
           'Content-Type': 'multipart/form-data'
         }
       });
       console.log("result",result);
       if (result.status === 201) {
       
        Swal.fire({
          icon: 'success',
          title: 'Question added successfully!',
          showConfirmButton: false,
          timer: 1500 
        }).then(() => {
          if (props.onHide) {
            handleModalClose();
          }
          navigate('/question'); 
        });
      }
     } catch (error) {
       console.log(error);
     }
   };
  
  const handleModalClose = () => {
    setQuestionItem({
      ennonce: "",
      image: "",
      point:"",
      responsesData: [{ content: "", isCorrect: false }]
    });
    setEnnonceErr('');
    setpointErr('');
    setrespErr('');

    if (props.onHide) {
      props.onHide();
    }
  };

  return (

    <Modal style={styles.popup}
      show={props.show}
      onHide={handleModalClose}
    >
    

      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Add Question</h3>

        <MDBContainer fluid>

          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Ennonce</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='ennonce' type='text' value={questionItem.ennonce}
                onChange={(e) => {
                    setQuestionItem({ ...questionItem, ennonce: e.target.value });
                    setEnnonceErr('');
                }} />
            </MDBCol>
          </MDBRow>

          {showErrE && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{ennonceErr}</p>
              </MDBCol>
            </MDBRow>)}

            <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Point</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='point' type='number' value={questionItem.point}
                onChange={(e) => {
                    setQuestionItem({ ...questionItem, point: e.target.value });
                    setpointErr('');
                }} />
            </MDBCol>
          </MDBRow>
          {showPoint && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{pointErr}</p>
              </MDBCol>
            </MDBRow>)}

     <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Image</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' className="img-fluid" name="image" type='file' src={image}  accept="image/*"
             onChange={handleChangeFile}
                       />
            </MDBCol>
          </MDBRow>
         
          
      
          <Button
  variant="contained"
  onClick={handleAddResponse}
  style={{ marginBottom: '10px' }}
  startIcon={<AddCircleOutlineIcon />}
>
  Add Response
</Button>
      {questionItem.responsesData.map((response, index) => (
        <div key={index}>
            <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Response</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
            <div className='d-flex align-items-center'>
              <MDBInput size='lg' name="content" type='text' value={response.content}
                 onChange={(e) => { 
                  onValueChange(e, index); 
                 setrespErr(' ');
                }} />
                <FaMinusCircle
        onClick={() => removeResponse(index)}
        style={{ marginLeft: '10px', cursor: 'pointer' }}
        color="red"
      />
    </div>
           
            </MDBCol>
          </MDBRow>
          {showResp && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{respErr}</p>
              </MDBCol>
            </MDBRow>)}
          
          <select
    className="form-select form-select-lg"
    style={{ padding: '0.5rem', borderRadius: '0.3rem', border: '1px solid #ced4da' }}
    value={response.isCorrect ? "true" : "false"}
    onChange={(e) => onValueChange(e, index)}
    name="isCorrect"
  >
    <option value="true">True</option>
    <option value="false">False</option>
  </select>
        </div>
      ))} 
          <div style={styles.footer}>
  <button  onClick={AddQuestion}  style={{ width: '100px', marginLeft: '450px' }} className="button-popup">Save</button>
</div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default QuestionAdd;