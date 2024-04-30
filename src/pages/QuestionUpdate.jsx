import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { editQuestion } from '../services/question';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBFile } from 'mdb-react-ui-kit';
import { Button, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
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
function QuestionUpdate(props) {
  const [ennonceErr, setEnnonceErr] = useState('');
  const [showErrE, setshowErrE] = useState(false);
  const [respErr, setrespErr] = useState('');
  const [showResp, setshowResp] = useState(false);
  const [pointErr, setpointErr] = useState('');
  const [showPoint, setshowPoint] = useState(false);
  const [ennonce, setEnnonce] = useState(props.initialValues.ennonce || '');
  const [point, setPoint] = useState(props.initialValues.point || '');
  const [responses, setResponses] = useState(props.initialValues.responses || []);
  const [Latestimage, setLatestimage] = useState(props.initialValues.image || '');
  const [image, setImage] = useState(null);

  const quest = {
    ennonce,
    image,
    point,
    responses,
  };

  const updateQuest = async () => {
    const responsesFilled = quest.responses.every(response => response.content.trim());
    if (!responsesFilled) {
      setrespErr(`Please fill in all responses`);
      setshowResp(true);
      return; 
    }
    quest.responses.forEach((response, index) => {
      if (!response.content.trim()) {
        setrespErr(`Please fill in response `);
        setshowResp(true);
        return; 
      }
    });

    if (!quest.ennonce) {
      setEnnonceErr('Please fill in the question');
      setshowErrE(true);
      return; 
    }

    if (!quest.point) {
      setpointErr('Please fill in the point');
      setshowPoint(true);
      return; 
    }
    const updatedQuest = {
      ...quest,
      responses: responses.map(response => ({ ...response })),
    };
    console.log("");
  console.log("quest", updatedQuest);
    const result = await editQuestion(props.initialValues._id, updatedQuest);
    //console.log("rrrrrrrrrr", props.initialValues);
   
    if (result) {
      console.log("yessss",result);
      Swal.fire({
        icon: 'success',
        title: 'Question updated successfully!',
        showConfirmButton: false,
        timer: 1500 
      }).then(() => {
        if (props.onHide) {
          handleModalClose();
        }
      });
    }
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChangeFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
    previewFiles(image);
  };

  const addResponse = () => {
    setResponses(prevResponses => [...prevResponses, { content: '', isCorrect: false }]);
    console.log("add",responses);
  };

  const removeResponse = (indexToRemove) => {
    setResponses(prevResponses => prevResponses.filter((_, index) => index !== indexToRemove));
    console.log("de",responses);

  };

  const onValueChange = (e, index) => {
    const { name, value } = e.target;
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      updatedResponses[index][name] = value;
      return updatedResponses;
    });
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
        <h3>Update Question</h3>
        <MDBContainer fluid>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Ennonce</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='ennonce' type='text' value={ennonce}
                onChange={(e) => {
                  setEnnonce(e.target.value);
                  setEnnonceErr('');
                }}
              />
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
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Point</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' name='point' type='number' value={point}
                onChange={(e) => {
                  setPoint(e.target.value);
                  setpointErr('');
                }}
              />
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
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Image</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              {image === null ? (
                <img className="img-fluid" src={Latestimage.url} alt="" />
              ) : (
                <img className="img-fluid" src={image} alt="" />
              )}
              <MDBFile size='lg' id='customFile' onChange={handleChangeFile} />
            </MDBCol>
          </MDBRow>

          <img src={image} alt="Preview" hidden />
          <Button
  variant="contained"
  onClick={() => addResponse()}
  style={{ marginBottom: '10px' }}
  startIcon={<AddCircleOutlineIcon />}
>
  Add Response
</Button>
          {responses.map((response, index) => (
            <div key={index}>
              <MDBRow className='align-items-center pt-4 pb-3'>
                <MDBCol md='3' className='ps-5'>
                  <h11 className="mb-0">Response</h11>
                </MDBCol>
                <div className='d-flex align-items-center'>
      <MDBInput
        size='lg'
        name="content"
        type='text'
        value={response.content}
        onChange={(e) => onValueChange(e, index)}
      />
      <FaMinusCircle
        onClick={() => removeResponse(index)}
        style={{ marginLeft: '10px', cursor: 'pointer' }}
        color="red"
      />
    </div>
              </MDBRow>
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
              {showResp && (
                <MDBRow className='align-items-center pt-4 pb-3'>
                  <MDBCol md='3' className='ps-5'>
                    <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
                  </MDBCol>
                  <MDBCol md='9' className='pe-5'>
                    <p style={{ color: 'red' }}>{respErr}</p>
                  </MDBCol>
                </MDBRow>)}
            </div>
          ))}
          <div style={styles.footer}>
            <button onClick={updateQuest} style={{ width: '100px', marginLeft: '450px' }} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Save</button>
          </div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default QuestionUpdate;
