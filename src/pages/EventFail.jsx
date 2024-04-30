import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import EventAuctions from './EventAuctions'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { unselectTicket } from './redux/slices/ticketsSlice'

EventFail.propTypes = {

};

function EventFail(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        const Endpoint = "http://localhost:4000/tickets/delete";
        fetch(Endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Tickets unsaved!');
                    dispatch(unselectTicket());
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Error saving tickets. Please try again.');
            });
    
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png" style={{ width: '400px', height: '400px' }} alt="Description de l'image" />
            <h4>Your operation has failed !</h4>
            <p>We're sorry, but there was an issue processing your payment. Please try again or contact support for assistance.</p>
        </div>
    );
}

export default EventFail;