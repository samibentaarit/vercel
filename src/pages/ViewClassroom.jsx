import React , {useState,useEffect } from 'react';
import {  Tabs,  TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import Swal from 'sweetalert2';


import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Dashboard from './Dashboard';
import { getAllclassrooms,deleteClassroom} from '../services/classroom';
import ClassroomAdd from './ClassroomAdd';
//import ClassroomUpdate from './ClassroomUpdate';


function ViewClassroom(props) {

  const DeleteConfirmation = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!',
        onHide: () => setUpdateShow(false)
    });
  
      if (result.isConfirmed) {
        
        await deleteClassroom(id);
        Swal.fire(
          'Deleted!',
          'Your classroom has been deleted.',
          'success'
      );
      const classroomResult= await getAllclassrooms();
      setclassroomList(classroomResult.data);
    }

    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire(
        'Error',
        'Failed to delete the classroom.',
        'error'
      );
    }
    
  };

const [addShow, setAddShow] = useState(false);
const [updateShow, setUpdateShow] = useState(false);

const handleOpenPopupUp = (item) => {
  setUpdateShow(true);
  console.log(updateShow);

};
const btnAdd = {
    marginLeft: "800px",
    backgroundColor: "#076fb9",
    borderRadius: "10px",
    display: 'flex', 
alignItems: 'center', 
justifyContent: 'center', 
textAlign:'center',

};
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

const btndelete = {
    backgroundColor: "#dc3545",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    outline: "none",
    transition: "background-color 0.3s",
   
  };
  
  const btnStyles = {
    padding: '6px 8px',
    fontSize: '12px',
    border: '1px black',
    borderRadius: '15px',
    cursor: 'pointer',
    background: '#e5e2e2',
    color: 'black',
    marginRight: '10px',
  };
  
  const selectStyle = {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    background: '#e5e2e2',
    cursor: 'pointer',

  };
  
  const btnHoverStyles = {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", 
   // backgroundColor: "#0971da",
  };
 
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [classroomList,setclassroomList] = useState([]);
useEffect(() =>{
const fetchClassrooms = async() =>{
const classroomResult= await getAllclassrooms();

setclassroomList(classroomResult.data);
}
fetchClassrooms();
},[]);

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(classroomList.length / itemsPerPage)));
  };
  
  const pageCount = Math.ceil(classroomList.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, classroomList.length);
 
  const handleHide = async () => {
    setAddShow(false);
    setUpdateShow(false);
      const classroomResult= await getAllclassrooms();
      setclassroomList(classroomResult.data);
    
  };
  

return (
  <div>
    <ClassroomAdd
      show={addShow}
      onHide={handleHide}
      style={{ backgroundColor: 'white' }}
    />  

    {/* {updateShow && (
      <ClassroomUpdate
       show={updateShow}
      initialValues={selectedItem}
      onHide={handleHide}
      />
    )} */}

    <section className="tf-page-title">    
      <div className="tf-container">
        <div className="row">
          <div className="col-md-12">
            <ul className="breadcrumbs">
              <li><Link to="/">Home</Link></li>
              <li>Profile</li>
            </ul>
          </div>
        </div>
      </div>  

      <div className="container-fluid" style={{ width: '100%' }}>
        <div className="row" style={{ width: '100%' }}>
          <div className="thumb-pagetitle" style={{ width: '100%' }}>
            <img src={img} alt="images" style={{ width: '100%' }}/>
          </div>
        </div>
      </div>                  
    </section>

    <section className="tf-dashboard tf-tab">
      <div className="tf-container">
        <Tabs className='dashboard-filter'>
          <div className="row">                 
            <div className="col-xl-3 col-lg-12 col-md-12">
              <Dashboard/>
            </div>
            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
              <div className="dashboard-content inventory content-tab">
                <button type='submit' style={btnAdd} onClick={() => setAddShow(true)}>
                  <svg viewBox="0 0 1024 1024" fill="currentColor" height="20px" width="20px">
                    <defs>
                      <style />
                    </defs>
                    <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                    <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
                  </svg>
                  Add
                </button>

                <TabPanel>
                  <div>
                    <div className="inner-content inventory">
                      <div className="title-dashboard">
                        <h4>Classrooms</h4>
                      </div>

                      <div className="table-ranking top">
                        <div className="title-ranking">
                          <div className="col-rankingg"><Link to="#">Name</Link></div>
                          <div className="col-rankingg"><Link to="#">Capacity</Link></div>
                          <div className="col-rankingg"><Link to="#">Actions</Link></div>
                        </div>
                      </div>

                      <div className="table-ranking">
                        {/* Affichage des éléments de la page actuelle */}
                        {console.log(classroomList)}
                        {classroomList.slice(startIndex, endIndex).map((item, index) => (
                          <div className="content-ranking" key={index}> 
                            <div className="col-rankingg">{item.name}</div>
                            <div className="col-rankingg">{item.capacity}</div>

                            <button type='submit' style={btnupdate} onClick={() => {
                              handleOpenPopupUp(item);
                              setUpdateShow(true);
                            }}>
                              <svg fill="none" viewBox="0 0 15 15" height="20px" width="20px">
                                <path fill="currentColor" fillRule="evenodd" d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z" clipRule="evenodd" />
                              </svg>
                            </button>

                            <button style={btndelete} onClick={() => DeleteConfirmation(item._id)}>
                              <svg viewBox="0 0 1024 1024" fill="currentColor" height="20px" width="20px">
                                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contrôles de pagination en bas du tableau */}
                    <div className="pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="pagination-controls" style={{ marginLeft: '20px' }}>
                          <select id="itemsPerPage" value={itemsPerPage} onChange={handleChangeItemsPerPage} style={selectStyle}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                          </select>
                        </div>

                        {/* Contrôles de pagination en bas du tableau */}
                        <div className="pagination-controls" style={{ marginLeft: 'auto', marginRight: '20px', textAlign: 'center' }}>
                          <button
                            onClick={handlePrevPage}
                            style={{ ...btnStyles, ...(currentPage === 1 ? { pointerEvents: "none" } : {}), ...(prevHover ? btnHoverStyles : {}) }}
                            onMouseEnter={() => setPrevHover(true)}
                            onMouseLeave={() => setPrevHover(false)}
                            disabled={currentPage === 1}
                          >
                            <FiChevronLeft style={{ fontSize: '20px' }} />
                          </button>
                          <span style={{marginRight:'6px', fontSize: '16px', fontWeight: 'bold' }}>{classroomList.length}</span>
                          <button
                            onClick={handleNextPage}
                            style={{ ...btnStyles, ...(currentPage === pageCount ? { pointerEvents: "none" } : {}), ...(nextHover ? btnHoverStyles : {}) }}
                            onMouseEnter={() => setNextHover(true)}
                            onMouseLeave={() => setNextHover(false)}
                            disabled={currentPage === pageCount}
                          >
                            <FiChevronRight style={{ fontSize: '20px' }} />
                          </button>
                        </div>
                      </div>
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

export default ViewClassroom;