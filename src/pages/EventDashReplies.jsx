import React, { useState, useContext, useEffect } from 'react';
import { Tabs, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Dashboard from './Dashboard';
import { useParams } from 'react-router-dom';



function EventsDashReplies(props) {

    const { id } = useParams();
    const [data, setData] = useState(null);


    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:4000/comment/${id}`)
                .then((response) => {
                    setData(response.data);

                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id]);
    console.log("dataaa", data)
   // console.log("repliesss", data[0].replies)

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
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data?.length / itemsPerPage)));
    };

    const pageCount = Math.ceil(data?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data?.length);




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
                                                <h4 className="title-dashboard">Comments</h4>

                                                <div className="pagination-controls" style={{ marginBottom: '20px' }}>
                                                    <select id="itemsPerPage" value={itemsPerPage} onChange={handleChangeItemsPerPage} style={selectStyle}>
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                    </select>
                                                </div>

                                                <div className="table-ranking top">
                                                    <div className="title-ranking">
                                                        <div className="col-rankingg"><Link to="#">User Name</Link></div>
                                                        <div className="col-rankingg"><Link to="#">Comment</Link></div>
                                                        <div className="col-rankingg"><Link to="#">date</Link></div>

                                                    </div>
                                                </div>
                                                <div className="table-ranking">
                                                    {data && data[0].replies && data[0].replies.map((reply, index) => (
                                                        <div className="content-ranking" key={index}>
                                                            <div className="col-rankingg">{reply.username}</div>
                                                            <div className="col-rankingg">{reply.reply}</div>
                                                            <div className="col-rankingg">{reply.CreatedAt}</div>

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

                                                <span style={{ marginLeft: '10px' }}>{data?.length}</span>
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

export default EventsDashReplies;