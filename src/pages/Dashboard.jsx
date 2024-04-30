import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, Route, Routes } from 'react-router-dom';

import { createPortal } from 'react-dom';
import img from '../assets/images/background/thumb-pagetitle.jpg'
import img1 from '../assets/images/logo.png'

import ViewUser from './viewUser';
import Swal from 'sweetalert2';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {

  Dialog,
  DialogContent,
  DialogTitle,

} from '@mui/material';




function Dashboard(props) {

  return (



    <div className="dashboard-user">
      <div className="dashboard-infor">
        <div className="avatar">
          <img src={img1} alt="images" />
        </div>
        <div className="name">El kindy </div>

        <ul className="social-item">
          <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
          <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
        </ul>
      </div>
      <TabList className='filter-menuu menu-tab'>


   
       
       
        <div style={{ marginBottom: '20px', textAlign: 'center' , alignItems:'center' }}>

<Dropdown>

<Dropdown.Toggle variant="primary" id="dropdown-basic">

Dashboard
</Dropdown.Toggle>

<Dropdown.Menu>
<Dropdown.Item>

<Link to="/dash">dashboard</Link>
</Dropdown.Item>

</Dropdown.Menu>
</Dropdown>

</div> 
        <div style={{ marginBottom: '20px', textAlign: 'center' , alignItems:'center' }}>

<Dropdown>

<Dropdown.Toggle variant="primary" id="dropdown-basic">

User Management
</Dropdown.Toggle>

<Dropdown.Menu>
<Dropdown.Item>

<Link to="/users">users</Link>
</Dropdown.Item>

</Dropdown.Menu>
</Dropdown>

</div> 


<div style={{ marginBottom: '20px', textAlign: 'center' , alignItems:'center' }}>
    
        <Dropdown>

<Dropdown.Toggle variant="primary" id="dropdown-basic">
 
  Calendar Management
</Dropdown.Toggle>

<Dropdown.Menu>

  <Dropdown.Item>

    <Link to="/classroom">courses</Link>
  </Dropdown.Item>
  <Dropdown.Item>
    <Link to="/lesson">lessons</Link>
  </Dropdown.Item>
  <Dropdown.Item>
    <Link to="/calendar">calendar</Link>
  </Dropdown.Item>

  <Dropdown.Item>
    <Link to="/holidays">holidays</Link>
  </Dropdown.Item>


</Dropdown.Menu>
</Dropdown>
</div>
<div style={{ marginBottom: '20px', textAlign: 'center' , alignItems:'center' }}>

      <Dropdown>

<Dropdown.Toggle variant="primary" id="dropdown-basic">
 
  Event Management
</Dropdown.Toggle>

<Dropdown.Menu>
  <Dropdown.Item>

    <Link to="/event">Events</Link>
  </Dropdown.Item>
  <Dropdown.Item>
    <Link to="/ticket">Events Tickets</Link>
  </Dropdown.Item>
  <Dropdown.Item>
  {/* <Link to="/comments">Event Comments</Link>*/} 
    <Link to="/satisfaction">Events Satisfaction</Link>

  </Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
</div>

</TabList >

    </div>
  );
}

export default Dashboard;