import React, { useState , useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios  from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

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

  import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
  import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
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



function UpdateProfile(props ) {

    const [email, setEmail] = useState(props.initialValues?.email || '');
    const [firstName, setFirstName] = useState(props.initialValues?.firstName || '');
    const [lastName, setLastName] = useState(props.initialValues?.lastName || '');
    const [level, setLevel] = useState(props.initialValues?.level || '');
    const [first_image, setFirstImage] = useState(props.initialValues?.image || '');
    const [image, setImage] = useState(props.initialValues?.image || '');

    const [phoneNumber, setPhoneNumber] = useState(props.initialValues?.phoneNumber || '');
    const [role, setRole] = useState(props.initialValues?.role || '');
    const [verified, setVerified] = useState(props.initialValues?.verified || false);
    const [speciality, setSpeciality] = useState(props.initialValues?.specialite || []);
    
  useEffect(() => {
    console.log('Initial Values:', props.initialValues);
  }, [props.initialValues]);

  const userId = props.initialValues?._id;
  console.log('User ID for update:', userId);
  

 //control saisie 
 const [errEmail, setErrEmail] = useState('');
 const [showerrEmail, setShowerrEmail] = useState(false);

 const [errPassword, setErrPassword] = useState('');
 const [showerrPassword, setShowerrPassword] = useState(false);

 const [errFirstName, setErrFirstName] = useState('');
 const [showerrFirstName, setShowerrFirstName] = useState(false);

 const [errLastName, setErrLastName] = useState('');
 const [showErrLastName, setShowErrLastName] = useState(false);
 
 const [errLevel, setErrLevel] = useState('');
 const [showErrLevel, setShowErrLevel] = useState(false);
 
 const [errPhoneNumber, setErrPhoneNumber] = useState('');
 const [showErrPhoneNumber, setShowErrPhoneNumber] = useState(false);
 
 const [errImage, setErrImage] = useState('');
 const [showErrImage, setShowErrImage] = useState(false);

  const [refreshToken, setRefreshToken] = useState('');

 const [errRole, setErrRole] = useState('');
 const [showErrRole, setShowErrRole] = useState(false);
 const isNumber = (value) => !isNaN(Number(value));




 
  const specialiteOptions = [
    'Robotique',
    'Peinture',
    'Solfege',
    'Piano',
    'Guitare',
    'Vocalise',
    'Batterie',
    'Violon',
    'Violoncelle',
    'Contrebasse',
    'Saxophone',
    'Oud',
    'Synthétiseur',
    'Qanun',
    'Trompette',
    'Alto',
    'Clarinette',
    'Cajon',
    'Darbouka'
  ];
 const isValidEmail = (value) => {
  // You can use a regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

  const handleSave = () => {
     if (!isNumber(phoneNumber)) {
    setErrPhoneNumber('Ensure phone number is a number');
    setShowErrPhoneNumber(true);
  } else if (phoneNumber.length !== 8) {
    setErrPhoneNumber('Phone number must be 8 digits');
    setShowErrPhoneNumber(true);
  }


    if (!isValidEmail(email)) {
      setErrEmail('Please enter a valid email address');
      setShowerrEmail(true);
    }
    //input 
    if (!firstName) {
      setErrFirstName('Please fill in first name');
      setShowerrFirstName(true) }

      if (!email) {
        setErrEmail('Please fill in email');
        setShowerrEmail(true);
      }
      
      // Validate password
     
      
      // Validate first name
      if (!firstName) {
        setErrFirstName('Please fill in first name');
        setShowerrFirstName(true);
      }
      
      // Validate last name
      if (!lastName) {
        setErrLastName('Please fill in last name');
        setShowErrLastName(true);
      }
      
      // Validate level (adjust the condition as needed)
      if (!level) {
        setErrLevel('Please select a level');
        setShowErrLevel(true);
      }
      
      // Validate phone number
      if (!phoneNumber) {
        setErrPhoneNumber('Please fill in phone number');
        setShowErrPhoneNumber(true);
      }
      
      // Validate role (adjust the condition as needed)
      if (!role) {
        setErrRole('Please select a role');
        setShowErrRole(true);
      }
      if (!image) {
        setErrImage('Please select a picture');
        setShowErrImage(true);
      }
      const payload = {
        id: userId, // Utilisez 'id' au lieu de '_id' si c'est le nom de la clé attendu par le serveur
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        phoneNumber: phoneNumber,
        level: level,
        speciality: speciality,
     
        image : image ,
      };

      axios.put('http://localhost:4000/user/users/updateUser', payload)
      .then(response => {
        console.log('user updated successfully:', response.data);
        console.log('User ID for update:', userId);
        if (response.status >= 200 && response.status < 300) {
          // Récupérer les nouvelles informations utilisateur des cookies de session
          const updatedUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            level: level,
            phoneNumber: phoneNumber,
            role: role,
            verified: verified,
            speciality: speciality,
            image: image,
          };
       

          // Store user information in cookies
   // Accessing user information
  
   // Store user information in cookies
          Swal.fire({
          title: 'Success',
          text: 'login again to see modifications',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      }})
      .catch(error => {
        console.error('Error updating user:', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
          console.log('User ID for update:', userId);

        }
        Swal.fire({
          title: 'Error',
          text: 'Error updating user',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });


}
const handleImage = (e) => {
  const file = e.target.files[0];
  setFileToBase(file);
  console.log(file);
  

}
const setFileToBase = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImage(reader.result);
  }}
  return (
    
    
    <Modal
    show={props.show}
    onHide={props.onHide}
  >

    <Modal.Header closeButton></Modal.Header>
    <div className="modal-body space-y-20 pd-40">
      <h3>Profile</h3>
    
      <MDBContainer fluid>

      <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">email</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='email' type='text' value={email} readOnly
                onChange={(e) => {setEmail(e.target.value) ; setErrEmail('')} }/>
            </MDBCol>
          </MDBRow>
          {showerrEmail && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errEmail}</p>
              </MDBCol>
            </MDBRow>)}

       
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">firstName</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='firstName' type='text' value={firstName}
                onChange={(e) => {setFirstName(e.target.value)   ; setErrFirstName ('')} }
                />
            </MDBCol>
          </MDBRow>
          {showerrFirstName && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errFirstName}</p>
              </MDBCol>
            </MDBRow>)}

          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">LastName</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='LastName' type='text' value={lastName}
                onChange={(e) => {setLastName(e.target.value) ; setErrLastName ('')}} />
            </MDBCol>
          </MDBRow>
           {showErrLastName && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errLastName}</p>
              </MDBCol>
            </MDBRow>)}


          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">phone Number</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='phoneNumber' type='text' value={phoneNumber}
                onChange={(e) => {setPhoneNumber(e.target.value) ; setErrPhoneNumber ('')} }/>
            </MDBCol>
          </MDBRow>
          {showErrPhoneNumber && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errPhoneNumber}</p>
              </MDBCol>
            </MDBRow>)}


            <MDBRow className='align-items-center pt-4 pb-3'>
          <MDBCol md='3' className='checkbox'>
        <h11 className="mb-0">Role</h11>
      </MDBCol>
      <MDBCol md='9' className='pe-5'>
        <select
      className="form-control"
      value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </MDBCol>
      </MDBRow>
      {role === 'student' && (
      <MDBRow className='align-items-center pt-4 pb-3'>
  <MDBCol md='3' className='checkbox'>
    <h11 className="mb-0">Level</h11>
  </MDBCol>
  <MDBCol md='9' className='pe-5'>
    <select
      className="form-control"
      value={level}
      onChange={(e) => setLevel(e.target.value)}
    >
      <option value="gradeLevel1">Grade Level 1</option>
      <option value="gradeLevel2">Grade Level 2</option>
      <option value="gradeLevel3">Grade Level 3</option>
      <option value="gradeLevel4">Grade Level 4</option>
      <option value="gradeLevel5">Grade Level 5</option>
      <option value="gradeLevel6">Grade Level 6</option>
      <option value="gradeLevel7">Grade Level 7</option>
      <option value="non precise level">Non Precise Level</option>
    </select>
  </MDBCol>

 
</MDBRow>
  )}

{role === 'teacher' && (
        <>
          <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='checkbox'>
              <h11 className="mb-0">Speciality</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              {specialiteOptions.map((option) => (
                <div key={option}>
                  <input
                    type="checkbox"
                    id={option}
                    value={option}
                    checked={speciality.includes(option)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSpeciality((prevSpecialite) =>
                        checked
                          ? [...prevSpecialite, option]
                          : prevSpecialite.filter((item) => item !== option)
                      );
                    }}
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </MDBCol>
          </MDBRow>
        </>
      )}



        
        <MDBRow className='align-items-center pt-4 pb-3'>

<MDBCol md='3' className='ps-5'>
  <h11 className="mb-0">Image</h11>
</MDBCol>

<MDBCol md='9' className='pe-5'>
  {image === null ? (
    <img className="img-fluid" src={first_image.url} alt="" />
  ) : (
    <img className="img-fluid" src={image} alt="" />
  )}          <MDBFile size='lg' id='customFile' onChange={handleImage} />
</MDBCol>

</MDBRow>

{showErrImage && (
<MDBRow className='align-items-center pt-4 pb-3'>
  <MDBCol md='3' className='ps-5'>
    <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
  </MDBCol>
  <MDBCol md='9' className='pe-5'>
    <p style={{ color: 'red' }}>{errImage}</p>
  </MDBCol>
</MDBRow>)}


                         

<div style={styles.footer}>

<Link to="#" onClick={() => handleSave()} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Save </Link>


</div>
</MDBContainer>
</div>
</Modal>
  );
}

export default UpdateProfile;