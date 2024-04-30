import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import Dashboard from './Dashboard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {  isSameDay } from 'date-fns';
import SideProfile from './SideProfile';
import LessonsForm from '../components/LessonForm';

function View1(props) {
    const [initialEvents, setInitialEvents] = useState([]);
    const [holidayEvents, setHolidayEvents] = useState([]);
    const [freeTimeEvents, setFreeTimeEvents] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
  console.log("initialEvents:", initialEvents);



  useEffect(() => {
    fetchLessonData();
    fetchHolidayData();
    fetchFreeTimeData();
    }, []);
    
  const fetchLessonData = () => {
    const currentUser = getUserInfoFromCookie();
    fetch('http://localhost:4000/api/lesson/getByTeacher', {
      method: 'GET',
      headers: { 'teacher': currentUser._id },
    })
      .then(response => response.json())
      .then(data => {
        const events = data.map(lesson => ({
          id: lesson._id,
          title: lesson.course?.name || 'No Course',
          start: new Date(lesson.startLessonDate),
          end: new Date(lesson.endLessonDate),
          teacher: lesson.teacher,
          students: lesson.students,
          classroom: lesson.classroom.name,
          teacherFirstName: lesson.teacher.firstName,
          teacherLastName: lesson.teacher.lastName,
        }));
        setInitialEvents(events);
      })
      .catch(error => console.error('Error fetching lessons:', error));
  };
  const fetchHolidayData = () => {
    fetch('http://localhost:4000/api/holiday')
      .then(response => response.json())
      .then(data => {
        const holidays = data.map(holiday => ({
          title: 'Holiday',
          start: new Date(holiday.date),
          allDay: true,
          display: 'background',
          color: '#FF3633',
          overlap: false,
          constraint: 'availableForMeeting',
        }));
        setHolidayEvents(holidays);
  
      })
      .catch(error => console.error('Error fetching holidays:', error));
  };

  const fetchFreeTimeData = () => {
    const currentUser = getUserInfoFromCookie();
    fetch(`http://localhost:4000/api/freetime/${currentUser._id}`)
      .then((response) => response.json())
      .then(data => {
        const events = generateEvents(data);
        setFreeTimeEvents(events);
        console.log("Free Time Events:", events);
      })
      .catch(error => console.error('Error fetching free times:', error));
  };

  const generateEvents = (data) => {
    const events = [];
    const currentDate = new Date();
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0); // Generate events for the next 6 months

    data.forEach((free) => {
      const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 6].indexOf(free.day);
      let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (dayIndex + 1 - currentDate.getDay()) % 7);

      while (date <= endDate) {
        events.push({
          id: `${free._id}-${date}`,
          start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), free.start.split(':')[0], free.start.split(':')[1]),
          end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), free.end.split(':')[0], free.end.split(':')[1]),
          display: 'background',
          rendering: 'background',
          color: 'green',
          title:'Freetime'
        });
        date.setDate(date.getDate() + 7);
      }
    });

    return events;
  };


  const getUserInfoFromCookie = () => {
    const cookieValue = document.cookie.match(/(?:^|;) ?user=([^;]*)(?:;|$)/);
    return cookieValue ? JSON.parse(decodeURIComponent(cookieValue[1].replace(/\+/g, ' '))) : null;
  };

  function handleEventClick(clickInfo) {
    if (clickInfo.event.title !== 'Holiday' && clickInfo.event.title !== '') {
      console.log('modal true', clickInfo.event);
      setShowModal(true);
      setSelectedRange({ start: clickInfo.event.start, end: clickInfo.event.end });
      setSelectedEvent(clickInfo.event);
    }
  }

function handleCloseModal() {
    setShowModal(false);
    setSelectedRange(null);
    setSelectedEvent(null);
  }


  return (
    <div>
      <section className="tf-page-title">    
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <ul className="breadcrumbs">
                <li><Link to="/">Home</Link></li>
                <li>My calendar</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="thumb-pagetitle">
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
                        initialView="timeGridWeek"
                        editable={false}
                        selectable={true}
                        dayMaxEvents={true}
                        events={initialEvents.concat(holidayEvents).concat(freeTimeEvents)}
                        eventClick={handleEventClick}
                        contentHeight="auto"
                        slotMinTime="08:00:00"
                        slotMaxTime="20:00:00"
                        eventContent={renderEventContent}
                        selectMirror={true}


                        
                        selectOverlap={event => event.title === 'Freetime' ? true : false}


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
function renderEventContent(eventInfo) {
  const { event } = eventInfo;
  if (event.title === 'Holiday') {
    return <span style={{ color: 'white' }}>Holiday</span>;
  } else if (event.title == 'Freetime') {
    return <span style={{ color: 'white' }}>Freetime</span>; // Display nothing for free time events
  } else {
    return (
      <>
      {/* ${event.extendedProps.teacherFirstName} */}
        <span style={{ color: 'black' }}><b>{`${event.extendedProps.teacherLastName}`}</b> </span><br />
        <span style={{ color: 'black' }}>Course: <i>{event.title}</i></span>
        <br />
        <span style={{ color: 'black' }}>Room: {event.extendedProps.classroom}</span>
      </>
    );
  }
}

export default View1;