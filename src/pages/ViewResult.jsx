import React , {useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import img from '../assets/images/BATTERIE.jpg'
//import img from '../assets/images/externe piano.jpg'
//import { useNavigate } from "react-router-dom";
//import avt from '../assets/images/logo1.png'
import Swal from 'sweetalert2';


import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {Dialog, DialogContent,DialogTitle} from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Dashboard from './Dashboard';
import { getAllRes } from '../services/question';
import CardModal from '../components/layouts/CardModal';
import { addQuizz ,getAllquizzs,deleteRes} from '../services/quizz';
import QuizzAdd from './QuizzAdd';
import SideProfile from './SideProfile';

function ViewResult(props) {


  const DeleteConfirmation = async (id) => {
    try {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        });
  
        if (result.isConfirmed) {
            await deleteRes(id);
            Swal.fire(
                'Deleted!',
                'The reult  has been deleted.',
                'success'
            );
            const Result= await getAllRes();
setresultList(Result.data);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        Swal.fire(
            'Error',
            'Failed to delete the question.',
            'error'
        );
    }
  };
  


const btndelete = {
    backgroundColor: "#dc3545",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
   
  };
  const btnshow = {
    backgroundColor: "#ffc107",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
    marginRight: "5px",
  };
const btnStyles = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
  };
  
  const iconStyles = {
    fontSize: "1.5rem",
    color: "#333",
  };
  const btnHoverStyles = {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)", 
    backgroundColor: "grey",
  };
  const selectStyle = {
    padding: '5px', 
    borderRadius: '5px',
    border: '1px solid #ccc', 
    backgroundColor: '#fff', 
    transition: 'box-shadow 0.3s', 
    marginLeft:"15px",
    marginBottom:"5px",
  };
  
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
 
  const [selectedItem, setSelectedItem] = useState(null);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [resultList,setresultList] = useState([]);

useEffect(() =>{
const fetchResults = async() =>{
const Result= await getAllRes();

setresultList(Result.data);
}
fetchResults();
console.log("Result",resultList);
},[]);

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(resultList.length / itemsPerPage)));
  };
  
  const pageCount = Math.ceil(resultList.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, resultList.length);
 

return (

   
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
                                                            
                            

<TabPanel>
<div>
<div className="inner-content inventory">
  <h4 className="title-dashboard">Question</h4>
  
  <div className="pagination-controls" style={{ marginBottom: '20px' }}>
    <select id="itemsPerPage" value={itemsPerPage} onChange={handleChangeItemsPerPage} style={selectStyle}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  </div>

  <div className="table-ranking top">
    <div className="title-ranking">
      <div className="col-rankingg"><Link to="#">LastName</Link></div>
      <div className="col-rankingg"><Link to="#">FirstName</Link></div>
      <div className="col-rankingg"><Link to="#">level</Link></div>
      <div className="col-rankingg"><Link to="#">Title Quizz</Link></div>
      <div className="col-rankingg"><Link to="#">Score</Link></div>
      <div className="col-rankingg"><Link to="#"> Date </Link></div>
      <div className="col-rankingg"><Link to="#"> Actions </Link></div>


    </div>
  </div>
 
  <div className="table-ranking">
    {/* Affichage des éléments de la page actuelle */}
    {resultList.slice(startIndex, endIndex).map((item, index) => (
  <div className="content-ranking" key={index}> 
    <div className="col-rankingg">{item.userId.lastName}</div>
    <div className="col-rankingg">{item.userId.firstName}</div>
    <div className="col-rankingg">{item.userId.level}</div>

    <div className="col-rankingg">{item.quizId.titre}</div>
    <div className="col-rankingg">{item.score}</div>
    <div className="col-rankingg">{item.date}</div>

    
<Link to={`/ResultDetail/${item._id}`}>
<button type='submit'   style={btnshow}>
<svg
  viewBox="0 0 24 24"
  fill="currentColor"
  height="20px"
  width="20px"
  {...props}
>
  <path d="M12 9a3.02 3.02 0 00-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z" />
  <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z" />
</svg>
</button></Link>
<button     style={btndelete} onClick={() => DeleteConfirmation(item._id)} >
<svg
  viewBox="0 0 1024 1024"
  fill="currentColor"
  height="20px"
  width="20px"
  {...props}
>
  <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
</svg>
</button>
      </div>
    ))}
  </div>
</div>

{/* Contrôles de pagination en bas du tableau */}
<div className="pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
  <button
    onClick={handlePrevPage}
    style={{ ...btnStyles, ...(currentPage === 1 ? { pointerEvents: "none" } : {}), ...(prevHover ? btnHoverStyles : {}) }}
    onMouseEnter={() => setPrevHover(true)}
    onMouseLeave={() => setPrevHover(false)}
    disabled={currentPage === 1}
  >
    <FiChevronLeft style={iconStyles} />
  </button>
  
  <button
    onClick={handleNextPage}
    style={{ ...btnStyles, ...(currentPage === pageCount ? { pointerEvents: "none" } : {}), ...(nextHover ? btnHoverStyles : {}) }}
    onMouseEnter={() => setNextHover(true)}
    onMouseLeave={() => setNextHover(false)}
    disabled={currentPage === pageCount}
  >
    <FiChevronRight style={iconStyles} />
  </button>

  <span style={{ marginLeft:'10px'}}>{resultList.length}</span>
</div>
</div>
</TabPanel>

                                  
                               
                                
                                                    
                                
                                
                            </div>
                        </div>
                    </div>
                </Tabs> 
                
            </div>
        </section>
        
    </div>
);
}

export default ViewResult;