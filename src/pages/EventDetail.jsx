import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import Dashboard from './Dashboard';
import img from '../assets/images/BATTERIE.jpg'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function EventDetail(props) {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [dataT, setDataT] = useState([]);

    useEffect(() => {
        const fetchDataT = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/tickets/event/${id}`);
                // Assuming response.data.tickets is an array of tickets
                setDataT(response.data.tickets || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (id) {
            fetchDataT();
        }

    });
    console.log("data of tickett ", dataT);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/events/${id}`);
                setData(response.data.event);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]); // Ensure id is in the dependency array
    console.log('Current data:', data);




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
        marginLeft: "15px",
        marginBottom: "5px",
    };



    const [prevHover, setPrevHover] = useState(false);
    const [nextHover, setNextHover] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleChangeItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(dataT.length / itemsPerPage)));
    };

    const pageCount = Math.ceil(dataT.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataT.length);
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} , ${hours}:${minutes}`;
    };
    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <section class="tf-page-title ">
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumbs">
                                <li><Link to="/dash">Home</Link></li>
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



                                    <PageTitle sub='Event' title=' Detail' />

                                    <section className="tf-item-detail">
                                        <div className="tf-container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="tf-item-detail-inner">
                                                        <div className="image">
                                                            <img src={data.image.url} alt="Binasea" style={{ width: '500px', height: '400px' }} />                                                        </div>
                                                        <div className="content">

                                                            <h2 className="title-detail">Event {data.title}  </h2>
                                                            <p className="except">Organized BY {data.organizer} .</p>

                                                            <Tabs className="tf-tab">
                                                                <TabList className="menu-tab ">
                                                                    <Tab className="tab-title "><Link to="#">Details</Link></Tab>
                                                                    <Tab className="tab-title "><Link to="#">Description</Link></Tab>

                                                                </TabList>

                                                                <TabPanel >
                                                                    <div className="tab-details">

                                                                        <p >Price: {data.price}</p>

                                                                        <p >Number of Tickets: {data.maxPeople}</p>

                                                                        <p >Location: {data.location}</p>

                                                                        <p >Date & Time: {formatDate(data.date)} </p>


                                                                        <p> Number of reserved tickets : {data.tickets}</p>

                                                                    </div>
                                                                </TabPanel>
                                                                <TabPanel >
                                                                    <ul className="tab-bid">
                                                                        <p>{data.desc} </p>
                                                                    </ul>
                                                                </TabPanel>

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
            {/*  <section className="tf-dashboard tf-tab">
                <div className="tf-container">
                    <Tabs className='dashboard-filter'>
                        <div className="row ">
                            <div className="col-xl-3 col-lg-12 col-md-12">
                            </div>
                            <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">

                                <div className="dashboard-content inventory content-tab">

                                    <TabPanel>
                                        <div>
                                            <div className="inner-content inventory">
                                                <h4 className="title-dashboard">Tickets</h4>

                                                <div className="pagination-controls" style={{ marginBottom: '20px' }}>
                                                    <select id="itemsPerPage" value={itemsPerPage} onChange={handleChangeItemsPerPage} style={selectStyle}>
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                </div>

                                                <div className="table-ranking top">
                                                    <div className="title-ranking">
                                                        <div className="col-rankingg"><Link to="#">Booking Date</Link></div>
                                                        <div className="col-rankingg"><Link to="#">User</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Number of tickets</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Total Amount</Link></div>
                                                    </div>
                                                </div>

                                                <div className="table-ranking">
                                                    {dataT.map((item, index) => (
                                                        <div className="content-ranking" key={index}>
                                                            <div className="col-rankingg">
                                                                {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                                            </div>
                                                            <div className="col-rankingg">{item.user_id}</div>
                                                            <div className="col-rankingg">{item.number}</div>
                                                            <div className="col-rankingg">{item.amount}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            
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

                                                <span style={{ marginLeft: '10px' }}>{dataT.length}</span>
                                            </div>
                                        </div>
                                    </TabPanel>

                                </div>
                            </div>
                        </div>
                    </Tabs>

                </div>
                                                </section>*/}
        </div>
    );
}

export default EventDetail;