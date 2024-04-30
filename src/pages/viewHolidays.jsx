import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg';
import Dashboard from './Dashboard';
import multimonthPlugin from '@fullcalendar/multimonth';

function Holidays(props) {
  useEffect(() => {
    fetchHolidaysFromDatabase();
  }, []);

  const fetchHolidaysFromDatabase = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/holiday');
      const data = await response.json();
      if (response.ok) {
        setHolidays(data);
      } else {
        console.error('Failed to fetch holidays');
      }
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  const [holidays, setHolidays] = useState([]);

  const holidayEvents = holidays.map((holiday) => ({
    title: 'Holiday',
    start: new Date(holiday.date),
    allDay: true,
    display: 'background',
    color: '#FF3633',
    overlap: false,
    constraint: 'availableForMeeting',
  }));

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const formattedClickedDate = new Date(clickedDate).toISOString().split('T')[0]; // Convert clicked date to 'YYYY-MM-DD' format
    const isHoliday = holidays.some((holiday) => {
      const formattedHolidayDate = new Date(holiday.date).toISOString().split('T')[0]; // Convert holiday date to 'YYYY-MM-DD' format
      return formattedHolidayDate === formattedClickedDate;
    });
  
    console.log('isHoliday:', isHoliday); 
    console.log('clickedDate:', clickedDate); 
  
    if (isHoliday) {
      alert('This date is already a holiday and cannot be selected.');
    } else {
      const confirmHoliday = window.confirm(`Are you sure you want to set "${clickedDate}" as a holiday?`);
      if (confirmHoliday) {
        createHolidayInDatabase(clickedDate);
      }
    }
  };



  const createHolidayInDatabase = async (date) => {
    try {
      const response = await fetch('http://localhost:4000/api/holiday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });
      if (response.ok) {
        console.log('Holiday created successfully');
        fetchHolidaysFromDatabase(); // Refresh holidays after creating a new one
      } else {
        console.error('Failed to create holiday');
      }
    } catch (error) {
      console.error('Error creating holiday:', error);
    }
  };

 
  return (
    <div>
      <section className="tf-page-title">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li><Link to="/">Home</Link></li>
                <li>All lessons</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="thumb-pagetitle">
                <img src={img} alt="images" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-dashboard tf-tab">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-lg-4 col-md-12">
              <Dashboard />
            </div>
            <div className="col-xl-10 col-lg-8 col-md-12">
              <div className="row">
                <div className={`col-xl-12 col-lg-12 col-md-12 overflow-table`}>
                  <div className="dashboard-content inventory content-tab">
                    <div className="demo-app-main">
                      <FullCalendar
                        plugins={[multimonthPlugin  , interactionPlugin]}
                        initialView="multiMonthYear"
                        selectable={false}
                        events={holidayEvents}
                        dateClick={handleDateClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Holidays;