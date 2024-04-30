import { Button, TextField } from '@mui/material';
import { FiIconName } from 'react-icons/fi';
import { useUpdateReplyMutation } from './redux/slices/commentsApi';
import React, { useState, useContext, useEffect } from 'react';

const styles = {
    popup: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '500px',
        width: '80%',
        zIndex: '9999',

    },
    textField: {
        marginBottom: '20px',

    },
    buttonS: {
        margin: '10px',
        minWidth: '120px',

    },
    buttonC: {
        //borderRadius: "25px",
        border: "none",
        cursor: "pointer",
        padding: "5px",
        outline: "none",
        transition: "background-color 0.3s",
        //margin: '10px',
        //minWidth: '120px',
        backgroundColor: "#6c757d",


    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    footer: {
        textAlign: 'right',
        marginTop: '20px',
    },

};

function EventReplyEdit({ initialValues, onClose }) {
    const handleClosePopup = () => {
        onClose();
    };


    const [comment, setComment] = useState(initialValues.reply || '');
    const [updateReply] = useUpdateReplyMutation();

    const handleSave = async (e) => {
        e.preventDefault();
    
        try {
            await updateReply({
                commentId: initialValues.commentId,
                replyId: initialValues._id,
                data: {
                    reply: comment
                }
            });
           onClose();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div style={styles.popup}>
            <div style={styles.title}>Update your comment</div>

            <TextField
                fullWidth
                label="Answer"
                variant="outlined"
                style={styles.textField}
                InputProps={{ style: { color: 'black' } }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <div style={styles.footer}>
                <Button
                    type="button"
                    variant="contained"
                    onClick={handleClosePopup}
                    style={styles.buttonC}
                >
                    Close
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    style={styles.buttonS}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default EventReplyEdit;
