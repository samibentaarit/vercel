import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2';
import { addClassroom } from '../services/classroom'; // Import classroom API function
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';

const styles = {
  popup: {        
    backgroundColor: 'transparent',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',        
  },
  footer: {
    textAlign: 'right',
    marginTop: '20px',
  },
};

function ClassroomAdd(props) {
  const [classroomItem, setClassroomItem] = useState({
    title: "",
    capacity: "",
  });

  const [showTitleError, setShowTitleError] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [showCapacityError, setShowCapacityError] = useState(false);
  const [capacityError, setCapacityError] = useState('');

  const handleModalClose = () => {
    setClassroomItem({
      name: "",
      capacity: "",
    });
    setShowTitleError(false);
    setTitleError('');
    setShowCapacityError(false);
    setCapacityError('');

    if (props.onHide) {
      props.onHide();
    }
  };

  const addClassroomItem = async () => {
    if (!classroomItem.name) {
      setTitleError('Please fill in the title');
      setShowTitleError(true);
      return;
    }

    if (!classroomItem.capacity) {
      setCapacityError('Please fill in the capacity');
      setShowCapacityError(true);
      return;
    }

    try {
      const result = await addClassroom(classroomItem);
      if (result.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Classroom added successfully!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          handleModalClose();
        });
      }
    } catch (error) {
      console.error('Error adding classroom:', error);
      // Handle error
    }
  };

  return (
    <Modal style={styles.popup} show={props.show} onHide={handleModalClose}>
      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Add Classroom</h3>
        <MDBContainer fluid>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Name</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput
                size='lg'
                name='name'
                type='text'
                value={classroomItem.name}
                onChange={(e) => {
                  setClassroomItem({ ...classroomItem, name: e.target.value });
                  setShowTitleError(false);
                  setTitleError('');
                }}
              />
            </MDBCol>
          </MDBRow>
          {showTitleError && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{titleError}</p>
              </MDBCol>
            </MDBRow>
          )}
         
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Capacity</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput
                size='lg'
                name='capacity'
                type='number'
                value={classroomItem.capacity}
                onChange={(e) => {
                  setClassroomItem({ ...classroomItem, capacity: e.target.value });
                  setShowCapacityError(false);
                  setCapacityError('');
                }}
              />
            </MDBCol>
          </MDBRow>
          {showCapacityError && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{capacityError}</p>
              </MDBCol>
            </MDBRow>
          )}
         
          <div style={styles.footer}>
            <button className="button-popup" onClick={addClassroomItem} style={{ width: '100px', marginLeft: '450px' }}>Save</button>
          </div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default ClassroomAdd;