import React, { useState, useContext, useEffect } from 'react';
import PageTitle from '../components/pagetitle/PageTitle';
import { Link } from 'react-router-dom';

import CardModal from './EventPayment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';
import { useAddCommentMutation, useFetchCommentsQuery } from '../pages/redux/slices/commentsApi';
import Comment from './EventComment';
import { useFetchEventsQuery, useGetEventIdQuery } from './redux/slices/eventsApi';

EFrontDetail.propTypes = {

};

function EFrontDetail(props) {

    const { id } = useParams();


    const [modalShow, setModalShow] = useState(false);

    let { data: data } = useGetEventIdQuery(id) || {};

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

    //COMMENT SECTION 
    const [comment, setComment] = useState('');
    let { data: comments } = useFetchCommentsQuery(id) || {};

    let totals = comments?.map((item) => item?.replies?.length)
    let ultimateTotal = totals?.reduce((acc, item) => acc + item, 0);
    ultimateTotal = ultimateTotal + comments?.length;


    // add comments 

    const [addComment, { isLoading, isError, error }] = useAddCommentMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('Event ID:', id);
        console.log('Comment:', comment);

        try {

            await addComment({
                eventId: id,
                data: {
                    eventId: id,
                    username: currentUser.firstName,
                    userid: currentUser._id,
                    comment: comment
                }
            });
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    //END COMMENT 

    if (!data) {

        return <p>Loading...</p>;
    }
    return (
        <div>

            <PageTitle sub='Event' title=' Detail' />

            <section className="tf-item-detail">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-item-detail-inner">
                                <div >
                                    <img src={data.event.image.url} alt="Binasea" style={{ marginLeft:'100px', width: '500px', height: '600px' }} />                                                        </div>
                                <div className="content"style={{marginLeft:'100px'}} >

                                    <h2 className="title-detail">Event {data.event.title}  </h2>
                                    <p className="except">Organized BY {data.event.organizer} .</p>

                                    <Tabs className="tf-tab">
                                        <TabList className="menu-tab ">
                                            <Tab className="tab-title "><Link to="#">Details</Link></Tab>
                                            <Tab className="tab-title "><Link to="#">Description</Link></Tab>

                                        </TabList>

                                        <TabPanel >
                                            <div className="tab-details">

                                                <p >Price: {data.event.price}</p>
                                                <br></br>
                                                <p >Number of Tickets: {data.event.maxPeople}</p>
                                                <br></br>
                                                <p >Location: {data.event.location}</p>
                                                <br></br>
                                                <p >Date & Time: {data.event.date}</p>
                                                <br></br>

                                            </div>
                                        </TabPanel>
                                        <TabPanel >
                                            <ul className="tab-bid">
                                                <p>{data.event.desc} </p>
                                            </ul>
                                        </TabPanel>

                                    </Tabs>

                                    <div className="content-bottom">
                                        <div className="heading">
                                            <h6>Get your ticket NOW</h6>
                                            <div className="price"><div className="icon"> <EventIcon fontSize="large" /></div></div>
                                        </div>
                                        {currentUser !== null && (
                                            <div className="button">
                                                <Link to="#" onClick={() => setModalShow(true)} className="tf-button" data-toggle="modal" data-target="#popup_bid" style={{ width: '100%', padding: '15px', fontSize: '18px' }}>
                                                    BOOK A TICKET
                                                </Link>
                                            </div>
                                        )}
                                        {currentUser == null && (
                                         <div className="button">
                                         <Link to="/login" onClick={() => setModalShow(true)} className="tf-button" data-toggle="modal" data-target="#popup_bid" style={{ width: '100%', padding: '15px', fontSize: '18px' }}>
                                            Login 
                                         </Link>
                                     </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <br></br>
<br></br>
<br></br>

            <section className='tf-explore-more'>
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading">
                                <h4 className="heading">Comment & Review</h4>
                            </div>
                        </div>

                        <section style={{ backgroundColor: 'white', marginTop: '4px', marginBottom: '2px', paddingTop: '8px', paddingBottom: '16px', color: '#333', fontFamily: 'Arial, sans-serif' }} class="bg-white mt-4 mb-2 dark:bg-gray-900 py-8 lg:py-16">
                            <div style={{ maxWidth: 'calc(100% - 2rem)', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '16px', paddingRight: '16px' }} class="max-w-2xl mx-auto px-4">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }} class="flex justify-between items-center mb-6">
                                    <h2 style={{ fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bold', color: '#333' }} class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({Number(ultimateTotal)})</h2>
                                </div>
                                {currentUser !== null && (
                                    <form onSubmit={submitHandler} style={{ marginBottom: '6px' }} class="mb-6">
                                        <div style={{ paddingTop: '8px', paddingRight: '16px', paddingBottom: '4px', paddingLeft: '16px', marginBottom: '4px', backgroundColor: 'white', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomRightRadius: '4px', borderBottomLeftRadius: '4px', border: '1px solid #ccc', color: '#333', fontFamily: 'Arial, sans-serif' }} class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                            <label for="comment" style={{ display: 'none' }} class="sr-only">Your comment</label>
                                            <textarea id="comment" rows="6" onChange={(e) => setComment(e.target.value)}
                                                style={{ width: '100%', padding: '0px', fontSize: '20px', color: '#333', border: '0', outline: 'none', backgroundColor: 'white' }}
                                                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                placeholder="Write a comment..." required value={comment} />
                                        </div>
                                        <button type="submit"
                                            style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', paddingTop: '0.625rem', paddingBottom: '0.625rem', paddingLeft: '1rem', paddingRight: '1rem', fontSize: '15px', fontWeight: 'bold', textAlign: 'center', color: '#fff', backgroundColor: '#1e3a8a', borderRadius: '0.375rem', outline: 'none', cursor: 'pointer', transition: 'background-color 0.2s, border-color 0.2s, color 0.2s', border: '1px solid transparent', whiteSpace: 'nowrap', textDecoration: 'none', userSelect: 'none' }}
                                            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                            Post comment
                                        </button>
                                    </form>)}

                                {
                                    comments?.map((comment) => {
                                        return <Comment key={comment?._id} comment={comment} />
                                    })
                                }
                            </div>
                        </section>


                    </div>
                </div>
                {currentUser !== null && (
                    <CardModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        event={data.event}
                        user={currentUser._id}
                    />
                )}

            </section>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
    );
}

export default EFrontDetail;