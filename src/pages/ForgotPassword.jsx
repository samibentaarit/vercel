import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';

function ForgotPassword() {

  const styles=  {

    footer: {
      textAlign: 'right',
      marginTop: '400px',
      },

      header :{
        marginTop : '200px'
      }
  }
    const [email, setEmail] = useState()
    const navigate = useNavigate()
 
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/user/users/forgot-password', {email})
        .then(res => {
            if(res.data.Status === "Success") {
              Swal.fire({
                title: 'Heyy!',
                text: 'Verify your email',
                customClass: {
                  popup: 'my-custom-popup-class' // Classe CSS personnalisée pour la boîte de dialogue
                }})

            }
        }).catch(err => console.log(err))
    }

    return(

      <div style={styles.header}>
      
      <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
          <div className="row justify-content-center">

        <h6 className="heading">Forgot Password</h6> 
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="row justify-content-center">

          <button type="submit" className="submit">
            Send
          </button>
          </div>
          </form>
         
          <div style={styles.footer}>

</div>
</div>
   </div>
    </div>
      </div>
      </div>
    )
}

export default ForgotPassword;