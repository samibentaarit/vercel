import React,{useState} from 'react';
import { Button, TextField } from '@mui/material';
import {createLesson} from '../services/lesson';

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
function AddLessonForm({ onClose }) {
  const handleClosePopup = () => {
    onClose();
  };
  const [lessonItem, setLessonItem] = useState({
    teacher: "",
    students: [],
    startLessonDate: "",
    endLessonDate: "",
    course: "",
    typeLesson: "",
  });

  const onValueChange = (e, field) => {
    const value = e.target.value;
    setLessonItem({
      ...lessonItem,
      [field]: value,
    });
  };

  const addNewLesson = async () => {
    const result = await createLesson(lessonItem);
    if (result.status === 201) {
      // navigate("/events");
    }
  };

  return (
    <div style={styles.popup}>
      <div style={styles.title}>Add Lesson</div>
      <TextField
        fullWidth
        label="Teacher"
        variant="outlined"
        style={styles.textField}
        InputProps={{ style: { color: 'black' } }}
        onChange={(e) => onValueChange(e, 'teacher')}
        value={lessonItem.teacher}
      />
      {/* Add more TextFields for other fields in the lesson model */}
      {/* ... */}
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
          onClick={addNewLesson}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default AddLessonForm;