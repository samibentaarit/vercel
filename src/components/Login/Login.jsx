import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import img from '../../assets/images/conservatoire.jpg'
import { jwtDecode } from "jwt-decode";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Importez les icônes de l'œil
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
const Login = () => {


  const styles=  {

    footer: {
      textAlign: 'right',
      marginTop: '330px',
      },

      header :{
        marginTop : '200px'
      },
      inputGroupTextBtnShowPass: {
        cursor: 'pointer',
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: '10', // Make sure the icon stays above the input
        background: 'transparent', // Make the background transparent
        border: 'none', // Remove border
      },}
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour suivre la visibilité du mot de passe

  const googleAuth = () => {
		window.open(
			`http://localhost:4000/user/auth/google/callback`,
			"_self"
		);
	};

  const handleSubmit = async (e) => {
    e.preventDefault();

    
   
    try {
      const url = 'http://localhost:4000/user';
      const response = await axios.post(url, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        // Decode the JWT token
        const decodedToken = jwtDecode(response.data.data);

        // Store user information in cookies
 // Accessing user information

 // Store user information in cookies
 Cookies.set('user', JSON.stringify(decodedToken ), { expires: 7 }); // Set an expiration time if needed
        // Navigate to the dashboard
        navigate('/');
      } else {
        // Handle the case where the response status is not in the success range
        setError('An error occurred during login. Please try again later.');
      }
    } catch (error) {
      // Handle other errors related to the axios request
      console.error('Error during login:', error);

      // Check if the error has a response and contains data
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred during login.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'check your email and password ',
      });
    }
  };
   
  useEffect(() => {
    // Si l'utilisateur est déjà connecté, le rediriger vers la page 404
    if (cookies.user) {
      navigate('/');
    }
  }, [cookies.user, navigate]);



  return (

    <div >

      <section className="tf-page-title style-2">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li><Link to="/blog-v2">Home</Link></li>
                <li>Login</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
   
    <div className="login-page" style={{ marginTop: '100px' , alignItems: 'center' , marginLeft:'190px' }}>
      <div className="container">
  
        <div className="row">



        <div className="col-xl-3 col-lg-4 col-md-6">
                            <h5 className="title-preview"></h5>
                            <div className="sc-product style1">
                                <div className="top">
                                    <Link to="#" className="tag">EL KINDY CONSERVATORY </Link>
                                        <Link to="#" className="heart-icon"></Link>
                                   
                                </div>
                                <div className="features">
                                    <div className="product-media">
                                        <img src={img} alt="images" />
                                    </div>
                                 
                             
                                    

                                </div>
                            </div>
                        </div>



          <div className="col-md-6 ">
          <div >
          <div className="features">
           
          <h4 className="heading" style={{ marginTop: '100px', marginLeft:'100px' }}></h4>

          </div>

          

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label></label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="email"

                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              
              <div>
      <div className="form-group">
        <label></label>
        <div className="input-group">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="password"
            className="form-control"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            
          />
           <div className="input-group-append">
    <span
      className="input-group-text password-toggle"
      onClick={() => setPasswordVisible(!passwordVisible)}
    >
      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} style={{marginTop:'15px' , marginLeft: '10px' , height:'15px'  }} /> {/* Increase the size of the icon */}
    </span>
  </div> </div>
      </div>
    </div>
              <div className="row justify-content-center">
              <button type="submit" className="button-gg mb33">
                Submit
              </button>
              </div>

            </form>
            <span>
              <br></br>
            </span>
            
            <div className="row justify-content-center">
  <div className="text-center">
    <span>
      Did you forget your password? <Link to="/forgot-password">Forgot Password</Link>
      <br/><br/>
      Don't have an account? <Link to="/register">Register</Link>
    </span>
  </div>
</div>
<div style={styles.footer}>

</div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
  };

export default Login;




