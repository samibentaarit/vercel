import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg';
import Dashboard from './Dashboard';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import LessonsForm from '../components/LessonForm';
import {  isSameDay } from 'date-fns';
import SideProfile from './SideProfile';

function ViewCalendarTeacher(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    function getUserInfoFromCookie() {
      var cookieValue = document.cookie.match(/(?:^|;) ?user=([^;]*)(?:;|$)/);
  
      if (cookieValue) {
        var decodedValue = decodeURIComponent(cookieValue[1].replace(/\+/g, ' '));
  
        var userObject = JSON.parse(decodedValue);
  
        return userObject;
      } else {
        return null;
      }
    }
  
    var currentUser = getUserInfoFromCookie();
  
    console.log("user id",currentUser._id);
  
    // Fetch lessons for the teacher
    fetch('http://localhost:4000/api/lesson/getByTeacher', {
      method: 'GET',  
      headers: {
        'teacher': currentUser._id
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const events = data.map((lesson) => ({
          id: lesson._id,
          title: `${lesson.course?.name || 'No Course'}`,
          title: `${lesson.course?.name || 'No Course'}`,
          start: new Date(lesson.startLessonDate),
          end: new Date(lesson.endLessonDate),
          teacher: lesson.teacher,
          students: lesson.students,
          classroomm: lesson.classroom._id,
          classroom: lesson.classroom.name,
          classroomm: lesson.classroom._id,
          classroom: lesson.classroom.name,
          course: lesson.course,
          teacherfistname: lesson.teacher.firstName,
          teacherlastname: lesson.teacher.lastName ,
          teacherlastname: lesson.teacher.lastName ,
        }));
        setInitialEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  
    // Fetch holidays
    fetch('http://localhost:4000/api/holiday')
      .then((response) => response.json())
      .then((data) => {
        const holidayEvents = data.map((holiday) => ({
          title: 'Holiday',
          start: new Date(holiday.date),
          allDay: true,
          display: 'background',
          color: '#FF3633',
          overlap: false,
          constraint: 'availableForMeeting',
        }));
        setHolidayEvents(holidayEvents);
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
      });
      
      
  }, []);
  
  useEffect(() => {
  }, [initialEvents, holidayEvents]);
  

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEventClick(clickInfo) {
    if (clickInfo.event.title !== 'Holiday') {
      console.log('modal true');
      console.log(clickInfo.event);
  
      setShowModal(true);
      setSelectedRange({ start: clickInfo.event.start, end: clickInfo.event.end });
      setSelectedEvent(clickInfo.event);
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedRange(null);
    setSelectedEvent(null);
  }
  



 


      
   
 


      
   
return (

   
  <div>
  <section class="tf-page-title">    
      <div class="tf-container">
          <div class="row">
              <div class="col-md-12">
                  <ul class="breadcrumbs">
                      <li><Link to="/">Home</Link></li>
                      <li>My calendar</li>
                  </ul>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                  <div class="thumb-pagetitle">
                      <img src={img} alt="images" style={{ width: '100%' }}/>
                  </div>
              </div>
          </div>
      </div>
  </section>

  <section className="tf-dashboard tf-tab">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-lg-4 col-md-12">
              <SideProfile />
            </div>
     {/*      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        {renderPdf()}
</PDFViewer> */} 
            <div className="col-xl-10 col-lg-8 col-md-12">
              <div className="row">
                {showModal && (
                  <div className="col-xl-3 col-lg-12 col-md-12">
                    <LessonsForm
                      show={showModal}
                      selectedRange={selectedRange}
                      selectedEvent={selectedEvent}
                      onClose={handleCloseModal}
                    />
                  </div>
                )}
                <div className={`col-xl-${showModal ? '9' : '12'} col-lg-12 col-md-12 overflow-table`}>
                  <div className="dashboard-content inventory content-tab">
                    <div className="demo-app-main">
                      <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                          left: 'prev,next today',
                          center: 'title',
                          right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        initialView="dayGridMonth"
                        editable={false}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={weekendsVisible}
                        events={[...initialEvents, ...holidayEvents]}

                        selectOverlap={false}
                        
                        select={(selectInfo) => {
                          const selectedStart = selectInfo.start;
                          const selectedEnd = selectInfo.end;
                        
                          // Check if the selected range overlaps with any holiday
                          const overlapsWithHoliday = holidayEvents.some((holidayEvent) => {
                            const holidayStart = holidayEvent.start;
                            const holidayEnd = holidayEvent.end || holidayStart;
                        
                            // Check if the selected range is on the same day as the holiday
                            const isSameStartDay = isSameDay(selectedStart, holidayStart);
                            const isSameEndDay = isSameDay(selectInfo.end, holidayEnd);
                        
                            return (
                              (isSameStartDay && isSameEndDay) || // Selected range is on the same day as the holiday
                              (selectedStart >= holidayStart && selectedStart < holidayEnd) || // Selected start is within the holiday range
                              (selectedEnd > holidayStart && selectedEnd <= holidayEnd) || // Selected end is within the holiday range
                              (selectedStart <= holidayStart && selectedEnd >= holidayEnd) // Selected range encompasses the holiday range
                            );
                          });
                        
                          if (overlapsWithHoliday) {
                            alert('Cannot add an event on a holiday date.');
                          } else {
                            setShowModal(true);
                            setSelectedRange(selectInfo);
                            setSelectedEvent(null);
                          }
                        }}
                        eventContent={renderEventContent}
                        eventClick={handleEventClick}
                        eventsSet={handleEvents}
                        contentHeight="auto"
                        slotMinTime="08:00:00"
                        slotMaxTime="20:00:00"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <Sidebar
                    weekendsVisible={weekendsVisible}
                    handleWeekendsToggle={handleWeekendsToggle}
                    currentEvents={currentEvents}
                  />
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </section>
    </div>
  );
}

function renderEventContent(eventInfo) {
  const { event } = eventInfo;
  if (event.title === 'Holiday') {
    return <span>Holiday</span>;
  } else {
    return (
      <>
        <b>{`${event.extendedProps.teacherfistname} ${event.extendedProps.teacherlastname}`}</b> <br />
        <i>{event.title}</i>
        <br />
        Classroom: {event.extendedProps.classroom}
      </>
    );
  }
}


function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to edit or delete it</li>
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>
  );
}

export default ViewCalendarTeacher; 