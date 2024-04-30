import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { AiOutlineDownload } from "react-icons/ai";
import { jsPDF } from 'jspdf'
import SideProfile from './SideProfile';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import img from '../assets/images/BATTERIE.jpg'
EventTest.propTypes = {

};

function EventTest(props) {

  const [dataT, setDataT] = useState([]);
  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ticket data
        console.log("currenttt ", currentUser._id);
        const ticketResponse = await axios.get(`http://localhost:4000/tickets/user/${currentUser._id}`);
        setDataT(ticketResponse.data.tickets || []);

        // Fetch event data
        const eventPromises = ticketResponse.data.tickets.map(async (item) => {
          try {
            const eventResponse = await axios.get(`http://localhost:4000/events/${item.event_id}`);
            return eventResponse.data.event;
          } catch (error) {
            console.error('Error fetching event data:', error);
            return null;
          }
        });

        const eventResults = await Promise.all(eventPromises);
        setEvents(eventResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentUser._id) {
      fetchData();
    }
  }, [currentUser._id]);


  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const generateQRCodeData = (item, eventTitle) => {
    return `This ticket is for user ${currentUser.firstName} ${currentUser.lastName} for the event: ${eventTitle}, number of tickets: ${item.number}, total paid: ${item.amount}`;
  };



  const QrCodeDownload = () => {

    // Defines the pdf
    let pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [40, 40]
    })

    // Transforms the canvas into a base64 image
    let base64Image = document.getElementById('qrcode').toDataURL()

    // Adds the image to the pdf
    pdf.addImage(base64Image, 'png', 0, 0, 40, 40)

    // Downloads the pdf
    pdf.save('QR.pdf')

  }
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
      <div className="row">
        <div className="col-xl-3 col-lg-12 col-md-12">
          <SideProfile />
        </div>

        <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
          <section className="tf-page-title ">
            <div className="tf-container">
              <div className="row">
                <div className="col-md-12">


                  <h4 className="page-title-heading"></h4>
                </div>
              </div>
            </div>
          </section>

          <div className="table-ranking" style={{marginTop:'50px'}}>
            <div className="title-ranking">
              <div className="col-ranking">#</div>
              <div className="col-ranking">Date of Booking</div>
              <div className="col-ranking">Event</div>
              <div className="col-ranking"> tickets</div>
              <div className="col-ranking">Total Price</div>
              <div className="col-ranking">Your QrCode</div>
            </div>
          </div>
          <div className="table-ranking tf-filter-container">

            {
              dataT.map((item, index) => (

                <div className="content-ranking tf-loadmore 3d anime music" key={index} style={{ marginBottom: '10px' }} >
                  <div className="col-rankingg" style={{ marginRight: '100px' }}>{index}</div>
                  <div className="col-rankingg" style={{ marginRight: '100px' }}>
                    {new Date(item.createdAt).toLocaleDateString('en-GB')}
                  </div>
                  <div className="col-rankingg" style={{ marginRight: '100px' }}>{events[index]?.title}</div>
                  <div className="col-rankingg" style={{ marginRight: '100px' }}>{item.number}</div>
                  <div className="col-rankingg" style={{ marginRight: '100px' }}>{item.amount}</div>
                  <div className="col-rankingg" style={{ marginRight: '50px' }}>
                    <QRCodeCanvas
                      ref={canvasRef}
                      value={generateQRCodeData(item, events[index]?.title)}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={false}
                      id='qrcode' />

                  </div>
                  <div className="col-rankingg">
                    <button
                      onClick={() => QrCodeDownload()}
                      class="flex items-center justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
                    >
                      <AiOutlineDownload />
                      Download
                    </button>
                  </div>
                </div>
              ))

            }
</div>

</div>
      </div>
      </Tabs>
      </div>
      </section>

    </div>

  );
}

export default EventTest;