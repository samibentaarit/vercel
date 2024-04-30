import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/BATTERIE.jpg'
import Dashboard from './Dashboard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import SideProfile from './SideProfile';

function ViewFreeTime(props) {
  const [weekendsVisible] = useState(true);
  const [initialEvents, setInitialEvents] = useState([]);
  console.log("initialEvents:", initialEvents);

  const [formData, setFormData] = useState({
    day: '',
    start: '',
    end: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const currentUser = getUserInfoFromCookie();
    console.log("user id", currentUser._id);
    const teacherId = currentUser._id; // Static teacher ID

    fetch(`http://localhost:4000/api/freetime/${teacherId}`)
      .then((response) => response.json())
      .then((data) => {
        const events = generateEvents(data);
        setInitialEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  const getUserInfoFromCookie = () => {
    var cookieValue = document.cookie.match(/(?:^|;) ?user=([^;]*)(?:;|$)/);
    if (cookieValue) {
      var decodedValue = decodeURIComponent(cookieValue[1].replace(/\+/g, ' '));
      var userObject = JSON.parse(decodedValue);
      return userObject;
    } else {
      return null;
    }
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
          color: 'red',
        });
        date.setDate(date.getDate() + 7);
      }
    });

    return events;
  };

  function handleEventClick(clickInfo) {
              // eslint-disable-next-line no-restricted-globals
  }
  function handleEvents(events) {
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
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
        const teacherId = currentUser._id; // Static teacher ID

      const response = await fetch(`http://localhost:4000/api/freeTime/${teacherId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([formData])
      });
      if (!response.ok) {
        throw new Error('Failed to submit free time');
      }
      alert('Free time submitted successfully!');
      // Optionally, you can redirect the user or perform any other action here
      
    } catch (error) {
      console.error(error);
      alert('Failed to submit free time');
    }
  }

  const handleTimeSlotSelection = (selectInfo) => {
    const selectedStart = selectInfo.start;
    const selectedEnd = selectInfo.end;
  
    // Convert selected start and end times to desired format
    const formattedStart = formatTime(selectedStart);
    const formattedEnd = formatTime(selectedEnd);
  
    // Get the day of the week from the selected start time
    const dayOfWeek = selectedStart.toLocaleString('en-us', { weekday: 'long' });
  
    // Prepare the data to be sent to the server
    const freeTime = {
      day: dayOfWeek,
      start: formattedStart,
      end: formattedEnd,
    };
  
    // Show a confirmation dialog before saving
    const confirmFreeTime = window.confirm(`Are you sure you want to set "${dayOfWeek}" from "${formattedStart}" to "${formattedEnd}" as a free time?`);
  
    if (confirmFreeTime) {
      createFreeTimeInDatabase(freeTime);
    }
  };
  
  // Helper function to format time in the desired format (e.g., "09:00")
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const createFreeTimeInDatabase = async (freeTime) => {
    try {
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
        const teacherId = currentUser._id; // Static teacher ID
      const response = await fetch(`http://localhost:4000/api/freeTime/${teacherId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([freeTime]),
      });
  
      if (response.ok) {
        console.log('Free time created successfully');
        // Optionally, you can refresh the list of free times after creating a new one
        fetchData()
      } else {
        console.error('Failed to create free time');
      }
    } catch (error) {
      console.error('Error creating free time:', error);
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
                <div className={`col-xl-12 col-lg-12 col-md-12 overflow-table`}>
                  <div className="dashboard-content inventory content-tab">
                    <div className="demo-app-main">
                    <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay',
  }}
  initialView="timeGridWeek"
  editable={true}
  selectable={true}
  dayMaxEvents={true}
  weekends={weekendsVisible}
  events={initialEvents}
  eventClick={handleEventClick}
  eventsSet={handleEvents}
  contentHeight="auto"
  slotMinTime="08:00:00"
  slotMaxTime="20:00:00"
  select={handleTimeSlotSelection}
/>
                      <form id="freeTimeForm" onSubmit={handleSubmit}>
                      <label htmlFor="day">Day:</label>
                      <select id="day" name="day" value={formData.day} onChange={handleChange}>
                        <option value="">Select day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select><br />
                      <label htmlFor="start">Start Time:</label>
                      <input type="time" id="start" name="start" value={formData.start} onChange={handleChange} /><br />
                      <label htmlFor="end">End Time:</label>
                      <input type="time" id="end" name="end" value={formData.end} onChange={handleChange} /><br />
                      <button type="submit">Submit</button>
                    </form>
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

export default ViewFreeTime;