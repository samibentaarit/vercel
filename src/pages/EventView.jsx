import React, { useState, useContext, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import axios from 'axios';
import Swal from 'sweetalert2';
import AddEventForm from './EventAdd';
import UpdateEventForm from './EventUpdate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Dashboard from './Dashboard';



function ViewQuestion(props) {

  const [addShow, setAddShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const DeleteConfirmation = (id) => {
    console.log("id:", id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:4000/events/delete/${id}`);
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          );
          axios.get('http://localhost:4000/events/')
            .then((response) => {
              setData(response.data);
            })

        } catch (error) {
          console.error('Error deleting the event:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the event.',
            'error'
          );
        }
      }
    });
  };

  const btnAdd = {
    marginLeft: "800px",
    backgroundColor: "#076fb9",
    borderRadius: "10px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

  };
  const btnupdate = {
    backgroundColor: "#28a745",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer",
    padding: "5px", // Ajustez le padding pour réduire l'espace autour de l'icône
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
  const iconStyles = {
    fontSize: "1.5rem",
    color: "#333",
  };
  const btnHoverStyles = {
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)", 
    backgroundColor: "grey",
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenPopupUp = (item) => {
    setSelectedItem(item);
    setUpdateShow(true);
    console.log(updateShow);

  };

  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const [isPopupOpenUp, setIsPopupOpenUp] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isPopupOpenUp && !isPopupOpen) {
      axios.get('http://localhost:4000/events/')
        .then((response) => {
          setData(response.data);

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [isPopupOpenUp, isPopupOpen]);



  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage)));
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const close = () => {
    setAddShow(false);
    setUpdateShow(false)
    axios.get('http://localhost:4000/events/')
      .then((response) => {
        setData(response.data);
      })
  }
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
};
  return (


    <div>




      <AddEventForm
        show={addShow}
        //onHide={() => setAddShow(false)}
        onHide={close}
      />

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
        <div class="container-fluid" style={{ width: '100%' }}>
          <div class="row" style={{ width: '100%' }}>
            <div class="thumb-pagetitle" style={{ width: '100%' }}>
              <img src={img} alt="images" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="tf-dashboard tf-tab">
        <div className="tf-container">
          <Tabs className='dashboard-filter'>
            <div className="row ">
              <div className="col-xl-3 col-lg-12 col-md-12">
                <Dashboard />
              </div>
              <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                <div className="dashboard-content inventory content-tab">

                  <button type='submit' style={btnAdd} onClick={() => setAddShow(true)}   >
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="20px"
                      width="20px"

                    >
                      <defs>
                        <style />
                      </defs>
                      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                      <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
                    </svg>
                    Add</button>

                  <TabPanel>
                    <div>
                      <div className="inner-content inventory">
                        <h4 className="title-dashboard">Events</h4>


                        <div className="table-ranking top">
                          <div className="title-ranking">
                            <div className="col-rankingg"><Link to="#">Image</Link></div>

                            <div className="col-rankingg"><Link to="#">Title </Link></div>
                            <div className="col-rankingg"><Link to="#">Organizer</Link></div>

                             {/*<div className="col-rankingg"><Link to="#">description</Link></div>*/}
                            <div className="col-rankingg"><Link to="#">Price & Tickets</Link></div>
                            <div className="col-rankingg"><Link to="#">location</Link></div>
                            <div className="col-rankingg"><Link to="#">Date & Time</Link></div>
                            <div className="col-rankingg"><Link to="#">Action</Link></div>
                          </div>
                        </div>

                        <div className="table-ranking">
                          {/* Affichage des éléments de la page actuelle */}
                          {data.slice(startIndex, endIndex).map((item, index) => (
                            <div className="content-ranking" key={index}>
                              <div className="col-rankingg"><img src={item.image.url} alt="Image Description"></img></div>
                              <div className="col-rankingg">{item.title} </div>
                              <div className="col-rankingg"> {item.organizer}</div>

                              {/* <div className="col-rankingg">{item.desc}</div>*/}
                              <div className="col-rankingg">{item.price} | {item.maxPeople}</div>
                              <div className="col-rankingg">{item.location}</div>
                              <div className="col-rankingg">{formatDate(item.date)}</div>
                              <div>
                                <button type='submit' style={btnupdate}

                                  onClick={() => {
                                    handleOpenPopupUp(item);
                                    setUpdateShow(true);
                                  }
                                  }>
                                  <svg fill="none" viewBox="0 0 15 15" height="20px" width="20px" {...props}>
                                    <path
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                                {updateShow && (
                                  <UpdateEventForm
                                    show={updateShow}
                                    initialValues={selectedItem}
                                    //  onHide={() => setUpdateShow(false)}
                                    onHide={close}

                                  />
                                )}
                              </div>
                              <Link to={`/eventDetail/${item._id}`}>
                                <button type="button" style={btnshow}>
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
                                </button>
                              </Link>


                              <button type='submit' style={btndelete} onClick={() => DeleteConfirmation(item._id)}>
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
    <span style={{marginRight:'6px', fontSize: '16px', fontWeight: 'bold' }}>{data.length}</span>

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

export default ViewQuestion;