import React, { useState, useContext, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import Cookies from 'js-cookie';
import img from '../assets/images/BATTERIE.jpg'


import SideProfile from './SideProfile';
import UpdateProfile from './UpdateProfile';




function Profile(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUserInfoFromCookie = () => {
      const cookieValue = document.cookie.match(/(?:^|;)?\s*user\s*=\s*([^;]+)(?:;|$)/);
      if (cookieValue) {
        const decodedValue = decodeURIComponent(cookieValue[1]);
        const userObject = JSON.parse(decodedValue);
        setCurrentUser(userObject);
      } else {
        // Redirect to 404 page if user data is not found in cookies
        return <Navigate to="/404" replace />;
      }
    };

    getUserInfoFromCookie();
  }, []);
      
      // Vérifiez si les informations de l'utilisateur existent
      if (currentUser) {
        // Affichez les informations de l'utilisateur
        console.log("First Name:", currentUser.firstName);
        console.log("Last Name:", currentUser.lastName);
        console.log("Email:", currentUser.email);
        console.log("Role:", currentUser.role);
        console.log("Phone Number:", currentUser.phoneNumber);
        console.log("Image:", currentUser.image);
        console.log("Level:", currentUser.level);
        console.log("Speciality:", currentUser.speciality);
      } else {
        console.log("Les informations de l'utilisateur ne sont pas disponibles.");
      }
      const btnupdate = {
        backgroundColor: "#28a745",
        borderRadius: "25px",
        border: "none",
        cursor: "pointer",
        padding: "5px",
        outline: "none",
        transition: "background-color 0.3s",
        marginRight: "5px",
      };

      
  const handleOpenPopupUp = (item) => {
    setSelectedItem(item);
    setUpdateFormOpen(true);
  };

  const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
  const [isPopupOpenUp, setIsPopupOpenUp] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [updateShow, setUpdateShow] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClosePopupUp = () => {
    setIsPopupOpenUp(false);
  };

 

  
  const handleOpenupdate = () => {
    isPopupOpenUpdate(true);
  };

  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
   
return (
 <>
  {currentUser ? (

    <div>

        <section class="tf-page-title ">    
            <div class="tf-container">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="breadcrumbs">
                            <li><Link to="/">Home</Link></li>
                            <li>Profile</li>
                        </ul>
                    </div>
                </div>
            </div>  
            <div class="container-fluid"  style={{ width: '100%' }}>
                <div class="row"  style={{ width: '100%' }}>
                    <div class="thumb-pagetitle"  style={{ width: '100%' }}>
                    <img src={img} alt="images"   style={{ width: '100%' }}/>
                    </div>
                </div>
            </div>                     
        </section>

        <section className="tf-dashboard tf-tab">
            <div className="tf-container">
                <Tabs className='dashboard-filter'>
                    <div className="row ">                 
                        <div className="col-xl-3 col-lg-12 col-md-12">
                            <SideProfile/>
                        </div>
                        <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                                <div className="dashboard-content inventory content-tab">




                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                <div className="tf-item-detail-inner">
                                                       

                                                       <div className="content">
  <h2 className="title-detail"></h2>

  <Tabs className="tf-tab">
    <TabList className="menu-tab">
      <Tab className="tab-title">
        <Link to="#">firstName</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">lastName</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">email</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">role</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">phoneNumber</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">level</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">speciality</Link>
      </Tab>
      <Tab className="tab-title">
        <Link to="#">actions</Link>
      </Tab>
    </TabList>
    
    <TabPanel>
      <div className="tab-details">
        <p>{currentUser.firstName} </p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{currentUser.lastName}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{currentUser.email}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
        <p>{currentUser.role}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
      <p>{currentUser.phoneNumber}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
      <p>{currentUser.level}</p>
      </div>
    </TabPanel>

    <TabPanel>
      <div className="tab-details">
   <p>{currentUser.speciality}</p>
      </div>
    </TabPanel>

    <TabPanel>
<button type='submit' style={btnupdate}

onClick={() => {
  handleOpenPopupUp();
  setUpdateShow(true);
}
}

>
                                <svg fill="none" viewBox="0 0 15 15" height="30px" width="100px" {...props}>
                                  <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                
                              </button>   {updateShow && (
                                  <UpdateProfile
                                    show={updateShow}
                                    initialValues={currentUser} // Make sure to pass the correct user object
                                    onHide={() => setUpdateShow(false)}
                                  /> 
                                )}</TabPanel>
                            
  </Tabs>
  
</div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>



                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </section>
        </div>

) : (
  // If user data is not available, show loading or error message
  <div>404 NOT FOUND</div> // You can customize this message as needed
)}
</>
);
}
export default Profile;