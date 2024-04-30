import React, { useState } from 'react'
import { useDeleteReplyMutation, useDeleteReplyQuery } from '../pages/redux/slices/commentsApi'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import EventReplyEdit from './EventReplyEdit'
import { Dialog, DialogContent, DialogTitle } from '@mui/material';


const Reply = ({ reply }) => {

    const [deleteReply] = useDeleteReplyMutation() || {};

    const deleteReplyhandler = () => {
        deleteReply({
            commentId: reply?.commentId,
            replyId: reply?._id
        });
    }

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleClosePopup = () => setIsPopupOpen(false);

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



    return (
        <div>
            <Dialog open={isPopupOpen} onClose={handleClosePopup}>
                <DialogTitle>Update Comment</DialogTitle>
                <DialogContent>
                    <EventReplyEdit initialValues={reply} onClose={handleClosePopup} />
                </DialogContent>
            </Dialog>

            <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px', marginLeft: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginX: '2px', paddingX: '2px', borderRadius: '5px', marginTop: '1px', paddingY: '0.5rem' }}>
                    <p style={{ display: 'inline-flex', alignItems: 'center', marginRight: '3px', fontSize: '0.875rem', color: '#4B5563' }}>
                        <img style={{ marginRight: '0.5rem', width: '1.5rem', height: '1.5rem', borderRadius: '9999px' }} src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />{reply?.username} :
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        <time pubdate datetime="2022-02-08" title="February 8th, 2022">{reply?.reply}</time>
                    </p>
                    {currentUser && currentUser._id === reply?.userid && (
                        <div>
                            <button
                                style={{
                                    color: '#EF4444',
                                    marginTop: '0.5rem',
                                    padding: '0.625rem 1rem',
                                    borderRadius: '0.375rem',
                                    marginLeft: '2rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    border: '1px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
                                    whiteSpace: 'nowrap',
                                    textDecoration: 'none',
                                    userSelect: 'none',
                                    backgroundColor: 'transparent',
                                }}
                                onClick={deleteReplyhandler}
                            >
                                <BsTrash style={{ fontSize: '1.5rem' }} />
                            </button>

                            <button
                                style={{
                                    color: '#10B981',
                                    marginTop: '0.5rem',
                                    padding: '0.625rem 1rem',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    border: '1px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
                                    whiteSpace: 'nowrap',
                                    textDecoration: 'none',
                                    userSelect: 'none',
                                    backgroundColor: 'transparent',
                                }}
                                onClick={() => setIsPopupOpen(true)}
                            >
                                <AiOutlineEdit style={{ fontSize: '2rem' }} />
                            </button>
                        </div>
                    )}
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        <time pubdate datetime="2022-02-08" title="February 8th, 2022"></time>
                    </p>
                </div>
            </footer >
        </div >
    )
}

export default Reply