import React, { useState, useContext, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import axios from 'axios';
import Dashboard from './Dashboard';
import ReactApexChart from 'react-apexcharts';


function EventSatisfaction(props) {


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
    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/events/ma/stat');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const btnAdd = {
        marginLeft: "800px",
        backgroundColor: "#076fb9",
        borderRadius: "10px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    };
    class ApexChart extends React.Component {


        constructor(props) {
            super(props);

            this.state = {
                series: [],
                options: {
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        stackType: '100%'
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0
                            }
                        }
                    }],
                    xaxis: {
                        categories: [],
                    },
                    fill: {
                        opacity: 1
                    },
                    legend: {
                        position: 'right',
                        offsetX: 0,
                        offsetY: 50
                    },
                }
            };
        }

        async componentDidMount() {
            // Fetch data and update state
            await this.fetchChartData();
        }

        async fetchChartData() {
            try {
                const { data } = await axios.get('http://localhost:4000/events/ma/stat');
                const categories = data.map(item => item.eventName);
                const series = [
                    {
                        name: 'NEUTRAL',
                        data: data.map(item => item.neutralComments)
                    },
                    {
                        name: 'GOOD',
                        data: data.map(item => item.goodComments)
                    },
                    {
                        name: 'BAD',
                        data: data.map(item => item.badComments)
                    }
                ];

                this.setState({
                    series,
                    options: {
                        ...this.state.options,
                        xaxis: {
                            ...this.state.options.xaxis,
                            categories
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        }

        render() {
            return (
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                </div>
            );
        }
    }


    const handleAnalysisClick = () => {
        setShow(true);
        axios.post('http://localhost:4000/events/analyze')
            .then(response => {
                console.log(response.data.message);

            })
            .catch(error => {
                console.error('An error occurred:', error.response.data.message);
            });
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

                                <button type='submit' style={btnAdd} onClick={handleAnalysisClick}   >
                                    
                                    Recent analysis </button>
                                <TabPanel>
                                    <div className="inner-content inventory">
                                        <h4 className="title-dashboard">Events</h4>
                                    </div>
                                </TabPanel>
                            
                                <div className="dashboard-content inventory content-tab">

                                    {show && (
                                        <>
                                            <ApexChart />
                                            <div id="html-dist"></div>
                                        </>
                                    )}

                                </div>
                            </div>
                            </div>
                        </div>
                    </Tabs>

                </div>
            </section>

        </div>
    );
}

export default EventSatisfaction;