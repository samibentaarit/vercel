import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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
  checkbox :{
    height:"30px" ,
    padding: "5px " ,
    font_size: "16px" ,
    border_radius: "5px" ,
    border: "1px solid #ccc" , 
    width: "100%" ,
   
  }}
  



function AddUserForm( props ) {
  const [show, setShow] = useState(props.show || false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('non precise level'); // Set default level

  const [phoneNumber, setPhoneNumber] = useState('');
 
  const [specialite, setSpecialite] = useState([]);

  const [role, setRole] = useState('student'); // Set default role
  const [image, setImage] = useState('');
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
 
 const [errimg, setErrimg] = useState('');
 const [showerrimg, setShowerrimg] = useState(false);

 const [errRole, setErrRole] = useState('');
 const [showErrRole, setShowErrRole] = useState(false);
 const isNumber = (value) => !isNaN(Number(value));
 const levelOptions = [
  'nonpreciselevel',

  'gradelevel1',
  'gradelevel2',
  'gradelevel3',
  'gradelevel4',
  'gradelevel5',
  'gradelevel6',
  'gradelevel7',
 
];
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
      if (!password) {
        setErrPassword('Please fill in password');
        setShowerrPassword(true);
      }
      
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
        setErrimg('Please fill in all fields');
        setShowerrimg(true)
  
  
      } 

    const addUserEndpoint = "http://localhost:4000/user/users/addUser"; // Replace with your actual backend endpoint

    fetch(addUserEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        level,
        role: role || 'student',
        specialite,
        image,
      }),
    }
    )

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response); // Log the response


        return response.json();
      })
      .then(data => {
        console.log(data); 
        // Log the data received from the server
        if (data && data.user) {
          Swal.fire({
            title: 'User Saved!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500, // Close after 1.5 seconds
          });
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        Swal.fire({
          title: 'Error saving User , or email used!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500, // Close after 1.5 seconds
        });
      });

};
console.log('image',image); // Log the data received from the server

const handleImage = (e) => {
  const file = e.target.files[0];
  setFileToBase(file);
  console.log(file);
  setErrimg('');
}
const setFileToBase = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImage(reader.result);
  } }
const handleModalClose = () => {
  setEmail('');
  setPassword('');
  setLastName('');
  setFirstName('');
  setRole('');
  setLevel('');
  setPhoneNumber('');
  setSpecialite('');
  if (props.onHide) {
    props?.onHide?.();  }
};

  return (
    <Modal show={props?.show} onHide={handleModalClose}>


    <Modal.Header closeButton></Modal.Header>
    <div className="modal-body space-y-20 pd-40">
      <h3>Add User</h3>

      <MDBContainer fluid>

      <MDBRow className='align-items-center pt-4 pb-3'>
            <MDBCol md='3' className='ps-5'>
              <h11 className="mb-0">email</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='email' type='text' value={email}
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
              <h11 className="mb-0">password</h11>
            </MDBCol>
            <MDBCol md='9' className='pe-5'>
              <MDBInput size='lg' id='password' type='text' value={password}
                onChange={(e) =>{ setPassword(e.target.value); setErrPassword('')}} />
            </MDBCol>
          </MDBRow>
          {showerrPassword && (
            <MDBRow className='align-items-center pt-4 pb-3'>
              <MDBCol md='3' className='ps-5'>
                <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
              </MDBCol>
              <MDBCol md='9' className='pe-5'>
                <p style={{ color: 'red' }}>{errPassword}</p>
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
                    <option value="student">student</option>

          <option value="admin">admin</option>
          <option value="teacher">teacher</option>
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
       <option value="nonpreciselevel">non precise level </option>
<option value="gradelevel1">grade level 1</option>
      <option value="gradelevel2">grade level 2</option>
      <option value="gradelevel3">grade level 3</option>
      <option value="gradelevel4">grade level 4</option>
      <option value="gradelevel5">grade level 5</option>
      <option value="gradelevel6">grade level 6</option>
      <option value="gradelevel7">grade level 7</option>
    </select>
  </MDBCol>
  </MDBRow>

  
)}
  {role === 'teacher' && (
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
         checked={specialite.includes(option)}
         onChange={(e) => {
           const checked = e.target.checked;
           setSpecialite((prevSpecialite) =>
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



)}

<MDBRow className='align-items-center pt-4 pb-3'>

<MDBCol md='3' className='ps-5'>
  <h11 className="mb-0">Image</h11>
</MDBCol>

<MDBCol md='9' className='pe-5'>
  <img className="img-fluid" src={image} alt="" />
  <MDBFile size='lg' id='customFile' onChange={handleImage} />


</MDBCol>

</MDBRow>

{showerrimg && (
<MDBRow className='align-items-center pt-4 pb-3'>
  <MDBCol md='3' className='ps-5'>
    <h1 className="mb-0" style={{ color: 'red' }}>   </h1>
  </MDBCol>
  <MDBCol md='9' className='pe-5'>
    <p style={{ color: 'red' }}>{errimg}</p>
  </MDBCol>
</MDBRow>)}


<div style={styles.footer}>

<Link to="#"  onClick={handleSave} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Save </Link>

</div>
</MDBContainer>
</div>
</Modal>
  );
}

export default AddUserForm;
