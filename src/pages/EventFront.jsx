import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import EventAuctions from './EventAuctions'
import axios from 'axios';
import { useFetchEventsQuery } from './redux/slices/eventsApi';

EventFront.propTypes = {

};

function EventFront(props) {
    let { data: dataE } = useFetchEventsQuery() || {};


    return (
        <div className='page-liveauction'>
               
            <EventAuctions data={dataE} />

        </div>
    );
}

export default EventFront;