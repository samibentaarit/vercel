import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { addTicketReducer, selectTicket } from './redux/slices/ticketsSlice';
import { useSelector, useDispatch } from "react-redux";



const CardModal = (props) => {

    const [event_id, setId] = useState(props.event._id || '');
    const [user_id, setUser] = useState(props.user || '');
    const [price, setPrice] = useState(props.event.price || '');
    const [maxPeople, setMaxPeople] = useState(props.event.maxPeople || '');
    const [reserved, setReserved] = useState(props.event.tickets || '');

    const [amount, setAmount] = useState(0);
    const [err, setErr] = useState('you have exceeded the number of tickets available');
    const [showerr, setShow] = useState(false);
    const [number, setNumber] = useState(0);
    const dispatch = useDispatch();

    const handleAmount = (e) => {
        const value = e.target.value;
        setNumber(value);
        const prix = value * price;
        setAmount(prix)
        console.log(amount)
        setShow(false)
        if (value > (maxPeople - reserved)) {
            setShow(true)
        }
    }
    const payload = {
        user_id,
        event_id,
        number,
        amount
    };
    
    const onsubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4000/api/payment', payload)
            .then((res) => {
                const { result } = res.data;
               
                dispatch(selectTicket(payload));
                dispatch(addTicketReducer(payload));
                console.log('Ticket after dispatch:', payload);
                window.location.href = result.link;
            })
            .catch((err) => console.error(err));

            axios.post('http://localhost:4000/tickets/addUpdate', payload)
            .then((res) => {
                console.log('Ticket after dispatch:', payload);  
            })
            .catch((err) => console.error(err));

    }



    return (

        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body space-y-20 pd-40">
                <h3>BOOK NOW</h3>
                <p className="text-center sub-heading">How many tickets you want ?</p>
                <p className="label-1">Enter quantity. <span className="color-popup">{(maxPeople - reserved)} available</span></p>

                <input type="number" className="form-control" onChange={handleAmount}
                />
                {showerr && <p className="label-1" style={{ color: 'red' }}>{err}</p>}
                <br></br>

                <div className="d-flex justify-content-between detail-3">
                    <p> Total amount:</p>
                    <p className="text-right price color-popup"> {amount} DT </p>
                </div>
                <Link to="/wallet-connect" className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close" onClick={onsubmit} disabled={(maxPeople - reserved) < number || number == 0}> Pay </Link>
            </div>


        </Modal>

    );
};

export default CardModal;
