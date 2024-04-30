import React , {useState,useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import Dashboard from './Dashboard';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import LessonsForm from '../components/LessonForm'; 

function ViewCalendar(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const calendarRef = useRef(null);
  useEffect(() => {
    fetch('http://localhost:4000/api/lesson/get')
      .then((response) => response.json())
      .then((data) => {
        const events = data.map((lesson) => ({
          id: lesson._id,
          title: `${lesson.course?.name || 'No Course'}`,
          start: new Date(lesson.startLessonDate),
          end: new Date(lesson.endLessonDate),
          teacher: lesson.teacher,
          students: lesson.students,
          classroomm: lesson.classroom?._id,
          classroom: lesson.classroom?.name,
          course: lesson.course,
          teacherfistname: lesson.teacher.firstName,
          teacherlastname: lesson.teacher.lastName ,
          
        }));
        setInitialEvents(events);
        setCurrentEvents(events); // Set current events initially

      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  // Filter events by search term when searchTerm state changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setCurrentEvents(initialEvents); // Reset to all events if search term is empty
    } else {
      const filteredEvents = initialEvents.filter((event) =>
        event.classroom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCurrentEvents(filteredEvents);
    }
  }, [searchTerm, initialEvents]);


  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();
    }
  }, [searchTerm]);

  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }
  function filterEvents(event) {
    const eventClassroom = event.classroom.toLowerCase();
    const search = searchTerm.toLowerCase();
    return eventClassroom.includes(search);
  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEventClick(clickInfo) {
              // eslint-disable-next-line no-restricted-globals
      console.log("modal true")
      console.log(clickInfo.event)
      setShowModal(true);
      setSelectedRange({ start: clickInfo.event.start, end: clickInfo.event.end });
      setSelectedEvent(clickInfo.event);
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
                      <li>All lessons</li>
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
        <Dashboard />
      </div>
      <div className="col-xl-10 col-lg-8 col-md-12">
        {/* Input field for search */}
      <input
        type="text"
        placeholder="Search by classroom name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <div className="row">          {showModal && (
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
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={weekendsVisible}
                  events={initialEvents.filter(filterEvents)}
                  select={(selectInfo) => {
                    setShowModal(true);
                    setSelectedRange(selectInfo);
                    setSelectedEvent(null);
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
            </div><div className="col-xl-12 col-lg-12 col-md-12"><Sidebar
                weekendsVisible={weekendsVisible}
                handleWeekendsToggle={handleWeekendsToggle}
                currentEvents={currentEvents}
              /></div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
);
}
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{`${eventInfo.event.extendedProps.teacherfistname} ${eventInfo.event.extendedProps.teacherfistname}`}</b> <br />
         {/*   <b>{`${eventInfo.event.extendedProps.teacher}`}</b> 

      <br />
      <br />*/}
            <i>{eventInfo.event.title}</i>
            <br />
      Classroom: {eventInfo.event.extendedProps.classroom}
    </>
  );
}

function Sidebar({ currentEvents }) {
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

export default ViewCalendar;