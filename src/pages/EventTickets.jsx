import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import img from '../assets/images/BATTERIE.jpg'

//import avt from '../assets/images/logo1.png'

import axios from 'axios';

import Swal from 'sweetalert2';
import AddEventForm from './EventAdd';
import UpdateEventForm from './EventUpdate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Dashboard from './Dashboard';
import CardModal from '../components/layouts/CardModal';
import EventTest from './EventTest'




function EventTickets(props) {


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

    const [prevHover, setPrevHover] = useState(false);
    const [nextHover, setNextHover] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [data, setData] = useState([]);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/tickets/getTickets');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventPromises = data.map(async (item) => {
                try {
                    const response = await axios.get(`http://localhost:4000/events/${item.event_id}`);
                    return response.data.event;
                } catch (error) {
                    console.error('Error fetching event data:', error);
                    return null;
                }
            });

            const eventResults = await Promise.all(eventPromises);
            setEvents(eventResults);
        };

        fetchEvents();
    }, [data]);



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

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/users//getAllUsers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const getUserNameById = (userId) => {
        console.log(userId); // Ensure userId is correct
        const user = users.find(user => user._id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown'; // Use template literal to concatenate first name and last name
    };


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

                                    <TabPanel>
                                        <div>
                                            <div className="inner-content inventory">
                                                <h4 className="title-dashboard">Tickets</h4>



                                                <div className="table-ranking top">
                                                    <div className="title-ranking">
                                                        <div className="col-rankingg"><Link to="#">Booking Date</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Event</Link></div>
                                                        <div className="col-rankingg"><Link to="#">User</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Number of tickets</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Total Amount</Link></div>
                                                    </div>
                                                </div>

                                                <div className="table-ranking">
                                                    {/* Affichage des éléments de la page actuelle */}
                                                    {data.map((item, index) => (
                                                        <div className="content-ranking" key={index}>
                                                            <div className="col-rankingg">
                                                                {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                                            </div>
                                                            <div className="col-rankingg">{events[index]?.title}</div>
                                                            <div className="col-rankingg">{getUserNameById(item.user_id)}</div>
                                                            <div className="col-rankingg">{item.number}</div>
                                                            <div className="col-rankingg">{item.amount}</div>
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
                                                        <span style={{ marginRight: '6px', fontSize: '16px', fontWeight: 'bold' }}>{data.length}</span>

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

export default EventTickets;