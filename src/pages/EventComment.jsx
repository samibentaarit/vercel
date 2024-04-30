import React, { useState } from 'react'
import { useAddReplyMutation, useDeleteCommentMutation } from '../pages/redux/slices/commentsApi'
import Reply from './EventReply';
import { Button } from 'react-bootstrap';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import EventCommentEdit from './EventCommentEdit';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

const Comment = ({ comment }) => {

    const [deleteComment] = useDeleteCommentMutation() || {};

    const deleteCommenthandler = () => {
        deleteComment({
            commentId: comment?._id
        });
    }


    const [reply, setReply] = useState('');
    const [showReplyBox, setShowReplyBox] = useState(false);

    const [addReply, { isLoading, isSuccess }] = useAddReplyMutation() || {};


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

    const submitHandler = (e) => {
        e.preventDefault();

        addReply({
            commentId: comment?._id,
            data: {
                commentId: comment?._id,
                username: currentUser.firstName,
                userid: currentUser._id,
                reply: reply
            }

        })

        setReply('')
        setShowReplyBox(false);
    }


    const replyButtonClicked = () => {
        setShowReplyBox((prev) => !prev);
    }
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleClosePopup = () => setIsPopupOpen(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleOpenPopup = (item) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };


    return (
        <div>
            <Dialog open={isPopupOpen} onClose={handleClosePopup}>
                <DialogTitle>Update Comment</DialogTitle>
                <DialogContent>
                    <EventCommentEdit initialValues={comment} onClose={handleClosePopup} />
                </DialogContent>
            </Dialog>



            <article style={{ padding: '20px', marginBottom: '20px', fontSize: '16px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginLeft: '10px', width: 'calc(100% - 30px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ display: 'inline-flex', alignItems: 'center', marginRight: '15px', fontSize: '14px', color: '#333' }}>
                            <img style={{ marginRight: '8px', width: '24px', height: '24px', borderRadius: '50%' }} src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />
                            {comment?.username}
                        </p>
                        <p style={{ fontSize: '14px', color: '#666' }}>
                            <time pubdate dateTime="2022-02-08" title="February 8th, 2022">{comment?.createdAt}</time>
                        </p>
                    </div>
                    {currentUser && currentUser._id === comment?.userid && (
                        <div style={{ position: 'relative', display: 'inline-flex' }}>

                            <div style={{ position: 'absolute', top: '100%', right: '0', zIndex: '10', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
                                <button style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#f9f9f9', color: '#333', textDecoration: 'none' }}
                                    onClick={deleteCommenthandler}>  <BsTrash style={{ fontSize: '1.5rem' }} /></button>
                                <button style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#f9f9f9', color: '#333', textDecoration: 'none', marginTop: '10px' }} 
                                onClick={() => handleOpenPopup(comment)}>
                                    <AiOutlineEdit style={{ fontSize: '2rem' }} /></button>

                            </div>
                        </div>
                    )}

                </footer>

                <p style={{ color: '#666', marginBottom: '20px' }}>{comment?.comment}</p>
                {currentUser !== null && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <button onClick={replyButtonClicked} style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#666', textDecoration: 'underline', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', padding: '5px' }}>
                        <svg aria-hidden="true" style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Reply
                    </button>
                    {showReplyBox && (
                        <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                style={{ width: '200px', height: '30px', marginRight: '10px', fontSize: '14px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                type='text'
                                placeholder='Add a reply...'
                            />
                            <button style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', paddingTop: '0.625rem', paddingBottom: '0.625rem', paddingLeft: '1rem', paddingRight: '1rem', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', color: '#fff', backgroundColor: '#1e3a8a', borderRadius: '0.375rem', outline: 'none', cursor: 'pointer', transition: 'background-color 0.2s, border-color 0.2s, color 0.2s', border: '1px solid transparent' }}>Reply</button>
                        </form>
                    )}
                </div>
                )}
                {comment?.replies?.length >= 0 && comment?.replies?.map((reply, i) => {
                    return <Reply key={reply?._id} reply={reply} />
                })}
            </article>
        </div>
    )
}

export default Comment