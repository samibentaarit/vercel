import React, { useState, useContext, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { unselectTicket } from './redux/slices/ticketsSlice'


EventSuccess.propTypes = {

};

function EventSuccess(props) {

   
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <img src="https://storage.needpix.com/rsynced_images/check-37583_1280.png" style={{ width: '400px', height: '400px' }} alt=" image" />
            <h4>Your operation has been successfully completed!</h4>
            <p>You can view your tickets in your profile.</p>
        </div>

    );
}

export default EventSuccess;