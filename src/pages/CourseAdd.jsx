import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import Swal from 'sweetalert2';
import { addCourse } from '../services/course'; // Import course API function
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

function CourseAdd(props) {
  const [courseItem, setCourseItem] = useState({
    title: "",
    type:"",
    capacity: "",
  });

  const [showTitleError, setShowTitleError] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [showTypeError, setShowTypeError] = useState(false);
  const [typeError, setTypeError] = useState('');
  const [showCapacityError, setShowCapacityError] = useState(false);
  const [capacityError, setCapacityError] = useState('');
  const [showLevelError, setShowLevelError] = useState(false);
  const [levelError, setLevelError] = useState('');

  const handleModalClose = () => {
    setCourseItem({
      name: "",
      type: "",
      capacity: "",
      level:"",
    });
    setShowTitleError(false);
    setTitleError('');
    setShowTypeError(false);
    setTypeError('');
    setShowCapacityError(false);
    setCapacityError('');
    setShowLevelError(false);
    setLevelError('');

    if (props.onHide) {
      props.onHide();
    }
  };

  const addCourseItem = async () => {
    if (!courseItem.name) {
      setTitleError('Please fill in the title');
      setShowTitleError(true);
      return;
    }
    if (!courseItem.type) {
        setTypeError('Please fill in the type');
        setShowTypeError(true);
        return;
      }

    if (!courseItem.capacity) {
      setCapacityError('Please fill in the capacity');
      setShowCapacityError(true);
      return;
    }
    if (!courseItem.niveau) {
        setLevelError('Please fill in the level');
        setShowLevelError(true);
        return;
      }

    try {
      const result = await addCourse(courseItem);
      if (result.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Course added successfully!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          handleModalClose();
        });
      }
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error
    }
  };

  return (
    <Modal style={styles.popup} show={props.show} onHide={handleModalClose}>
      <Modal.Header closeButton></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3>Add Course</h3>
        <MDBContainer fluid>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">Matière</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput
                size='lg'
                name='name'
                type='text'
                value={courseItem.name}
                onChange={(e) => {
                  setCourseItem({ ...courseItem, name: e.target.value });
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
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">type</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput
                size='lg'
                name='type'
                type='text'
                value={courseItem.type}
                onChange={(e) => {
                  setCourseItem({ ...courseItem, type: e.target.value });
                  setShowTitleError(false);
                  setTitleError('');
                }}
              />
            </MDBCol>
          </MDBRow>
          {showTypeError && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{typeError}</p>
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
                value={courseItem.capacity}
                onChange={(e) => {
                  setCourseItem({ ...courseItem, capacity: e.target.value });
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
         

         <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5 '>
              <h11 className="mb-0">Level</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput
                size='lg'
                name='level'
                type='text'
                value={courseItem.niveau}
                onChange={(e) => {
                  setCourseItem({ ...courseItem, niveau: e.target.value });
                  setShowLevelError(false);
                  setLevelError('');
                }}
              />
            </MDBCol>
          </MDBRow>
          {showLevelError && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{levelError}</p>
              </MDBCol>
            </MDBRow>
          )}
         
          <div style={styles.footer}>
            <button className="button-popup" onClick={addCourseItem} style={{ width: '100px', marginLeft: '450px' }}>Save</button>
          </div>
        </MDBContainer>
      </div>
    </Modal>
  );
}

export default CourseAdd;