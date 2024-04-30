import React, { useState, useEffect } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddLessonModal from './components/LessonForm';

export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/lesson/get')
      .then((response) => response.json())
      .then((data) => {
        const events = data.map((lesson) => ({
          id: lesson._id,
          title: `${lesson.typeLesson} - ${lesson.course?.name || 'No Course'}`,
          start: new Date(lesson.startLessonDate),
          end: new Date(lesson.endLessonDate),
          teacher: lesson.teacher,
          students: lesson.students,
          classroom: lesson.classRoom,
          course: lesson.course,
        }));
        setInitialEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEventClick(clickInfo) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const eventId = clickInfo.event.id;
      fetch(`http://localhost:4000/api/lesson/delete/${eventId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          clickInfo.event.remove();
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    } else {
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
    <div className='demo-app'>
      <Sidebar weekendsVisible={weekendsVisible} handleWeekendsToggle={handleWeekendsToggle} currentEvents={currentEvents} />
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={initialEvents}
          select={(selectInfo) => {
            setShowModal(true);
            setSelectedRange(selectInfo);
            setSelectedEvent(null);
          }}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          contentHeight="auto"
        />
      </div>
      <AddLessonModal
        show={showModal}
        selectedRange={selectedRange}
        selectedEvent={selectedEvent}
        onClose={handleCloseModal}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      {/*<b>{`${eventInfo.event.extendedProps.teacher.firstName} ${eventInfo.event.extendedProps.teacher.lastName}`}</b> */}
            <b>{`${eventInfo.event.extendedProps.teacher}`}</b> 

      <br />
      <i>{eventInfo.event.title}</i>
      <br />
      Classroom: {eventInfo.event.extendedProps.classroom}
    </>
  );
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to edit or delete it</li>
        </ul>
      </div>

      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
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