import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Swal from 'sweetalert2';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Importez les icônes de l'œil
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importez FontAwesome pour utiliser les icônes
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebaseConfig';

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
 
function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, le rediriger vers la page 404
    if (cookies.user) {
      navigate('/404');
    }
  }, [cookies.user, navigate]);

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('non precise level'); // Set default level

  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');


  const [role, setRole] = useState('student'); // Set default role
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

  const [errConfirmPassword, setErrConfirmPassword] = useState('');
  const [showErrConfirmPassword, setShowErrConfirmPassword] = useState(false);


  const [passwordVisible, setPasswordVisible] = useState(false); // État pour suivre la visibilité du mot de passe

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // État pour suivre la visibilité du mot de passe

  // Fonction pour basculer la visibilité du mot de passe
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevVisible) => !prevVisible);
  };



  const isNumber = (value) => !isNaN(Number(value));



  const isValidEmail = (value) => {
    // You can use a regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };


  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
  
      const popup = window.open('about:blank', '_blank', 'width=600,height=600');
  
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('Please allow popups for this site');
        return;
      }
  
      window.addEventListener('message', (event) => {
        if (event.origin === 'http://localhost:4000') {
          console.log('Received data from popup:', event.data);
          
          // Close the popup
          popup.close();
        }
      });
  
      popup.postMessage({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }, 'http://localhost:4000');
  
      const res = await fetch('http://localhost:4000/user/users/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: 'include',
      });
      if (res.status === 400) {
        // Email already exists
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: 'Email already in use',
        });
        return;

      }
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Please enter your credentials.',
      }

    );
    

      const data = await res.json();
      console.log(data);
    


    } catch (error) {
      console.error('Could not login with Google:', error.message);
      console.log("Firebase app:", app);
    }


  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!isNumber(phoneNumber)) {
      setErrPhoneNumber('Ensure phone number is a number');
      setShowErrPhoneNumber(true);
    } 
     if (phoneNumber.length !== 8) {
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
      setShowerrFirstName(true)
    }

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
    if (!confirmPassword) {
      setErrConfirmPassword('Please confirm your password');
      setShowErrConfirmPassword(true);
    } else if (confirmPassword !== password) {
      setErrConfirmPassword('Passwords do not match');
      setShowErrConfirmPassword(true);
    }

 



    try {
      const payload = { email, password, firstName, lastName, phoneNumber, level, confirmPassword };
      console.log(payload);
    
      await axios.post("http://localhost:4000/user/users", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Please verify your email.',
      });
      navigate('/login');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      Swal.fire({
        title: 'password should contain upper ,lower case , number  and special letter  !',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500, 
      });
    }
  }    

  return (
    <div>
      <section className="tf-page-title style-2">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li><Link to="/blog-v2">Home</Link></li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="tf-login">
        <div className="tf-container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="tf-heading style-2">
                <h4 className="heading">Register</h4>
              </div>
            </div>
            <div className="col-xl-6 col-lg-9 col-md-12">
              <form onSubmit={(e) => handleSubmit(e)} id="contactform">
                <fieldset>
                  <input
                    id="firstName"
                    name="firstName"
                    tabIndex="3"
                    aria-required="true"
value={firstName}
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => {setFirstName(e.target.value)   ; setErrFirstName ('')} }
                    />
                </fieldset>
                {showerrFirstName && (
                  <div className='error-message'>
                    <p style={{ color: 'red' }}>{errFirstName}</p>
                  </div>
                )}
                <fieldset>
                  <input
                    id="lastName"
                    name="lastName"
                    tabIndex="4"
                    aria-required="true"
                    value={lastName}

                    type="text"
                    autoComplete='off'

                    placeholder="Last Name"
                    onChange={(e) => {setLastName(e.target.value)   ; setErrLastName ('')}}
                  />

                </fieldset>

                {showErrLastName && (
                  <div className='error-message'>
                    <p style={{ color: 'red' }}>{errLastName}</p>
                  </div>)}
                <fieldset>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    tabIndex="4"
                    aria-required="true"
                    value={phoneNumber}

                    type="text"
                    placeholder="phoneNumber"
                    onChange={(e) => {setPhoneNumber(e.target.value) ; setErrPhoneNumber ('')}}
                  />
                </fieldset>

                {showErrPhoneNumber && (
                  <div className='error-message'>
                    <p style={{ color: 'red' }}>{errPhoneNumber}</p>
                  </div>)}
                <fieldset >
                  <select className={styles['level-fieldset']}
                    id="level"
                    name="level"
                    tabIndex="5"
                    aria-required="true"

                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value="non precise level">non precise level </option>
                    <option value="gradelevel1">gradelevel1</option>
                    <option value="gradelevel2">gradelevel2</option>
                    <option value="gradelevel3">gradelevel3</option>
                    <option value="gradelevel4">gradelevel4</option>
                    <option value="gradelevel5">gradelevel5</option>
                    <option value="gradelevel6">gradelevel6</option>
                    <option value="gradelevel7">gradelevel7</option>

                  </select>
                </fieldset>
                <fieldset>
                  <input
                    id="email"
                    name="email"
                    tabIndex="1"
                    aria-required="true"
                    value={email}

                    type="text"
                    placeholder="Email"
                    onChange={(e) => {setEmail(e.target.value); setErrEmail ('')}}
                  />
                  {showerrEmail && (
                    <div className='error-message'>
                      <p style={{ color: 'red' }}>{errEmail}</p>
                    </div>)}


                </fieldset>
                <fieldset>
  <input
    id="password"
    name="password"
    tabIndex="2"
    aria-required="true"
    value={password}
    type={passwordVisible ? "text" : "password"} // Utilisez le type dynamique en fonction de la visibilité du mot de passe
    placeholder="Password"
    onChange={(e) => { setPassword(e.target.value); setErrPassword(''); }}
  />
  {/* Icône pour basculer la visibilité du mot de passe */}
  <span className="btn-show-pass" onClick={togglePasswordVisibility}>
    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
  </span>
  {showerrPassword && (
    <div className='error-message'>
      <p style={{ color: 'red' }}>{errPassword}</p>
    </div>
  )}
</fieldset>


                
<fieldset>
  <input
    id="confirmpassword"
    name="confirmpassword"
    tabIndex="3"
    value={confirmPassword}
    type={ConfirmPasswordVisible ? "text" : "password"} // Utilisez le type dynamique en fonction de la visibilité du mot de passe
    aria-required="true"
    placeholder="Confirm Password"
    onChange={(e) => { setconfirmPassword(e.target.value); setErrConfirmPassword(''); }}
  />
  {/* Icône pour basculer la visibilité du mot de passe */}
  <span className="btn-show-pass" onClick={toggleConfirmPasswordVisibility}>
    <FontAwesomeIcon icon={ConfirmPasswordVisible ? faEyeSlash : faEye} />
  </span>
  {showErrConfirmPassword && (
    <div className='error-message'>
      <p style={{ color: 'red' }}>{errConfirmPassword}</p>
    </div>
  )}
</fieldset>





                <div className="forgot-pass-wrap">
                 
                </div>
                <div className="title-login">Or login with social</div>
                <div className="button-gg">
                  <Link to="#"><i className="fab fa-facebook"></i>Facebook</Link>
                </div>
                <div className="button-gg mb33" onClick={handleGoogleClick}>
                  <Link to="#"><i className="fab fa-google"></i>Google</Link>
                </div>

                <button className="submit" type="submit">Register</button>
                <div className="row justify-content-center">
                  <span>
                    Already have an account? <Link to="/login">Login</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;