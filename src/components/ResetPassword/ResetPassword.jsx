import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
function ResetPassword() {

  const styles=  {
    
    footer: {
      textAlign: 'right',
      marginTop: '1000px',
      display: 'block' ,
  width: '50% ', 

      },

    formgroup: {
      textAlign: 'right',
      marginTop: '200px',
      weight : '100px'
      },
  
      header :{
        marginTop : '300px'
      }
  }
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:4000/user/users/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }
  

    return(
      <div style={styles.header}>

      <div className="center">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
          <div className="row justify-content-center">

        <h6>Reset Password</h6>
        <br/>
        <form onSubmit={handleSubmit}>
        <div className="formgroup" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <label htmlFor="email">
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
<br/>
          <button type="submit" className="submit">
            Update
          </button>

          </form>
          </div>
          </div> 

          <div style={styles.footer}>

</div>          </div> 


          </div> 
          </div> 
          </div>
)       
}

export default ResetPassword;