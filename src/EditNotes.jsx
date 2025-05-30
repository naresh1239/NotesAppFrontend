import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import {
  Button,
  TextareaAutosize,
  TextField,
  Box,
  Typography,
  Switch,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Toggle } from './store/Reducers/CounterReducer';
import { fetchSidebarlinks } from './store/Reducers/NavlinkReducer';
import { toast } from 'react-hot-toast';
import PreviewScreen from './PreviewScreen';

const EditNotes = () => {
  const userData = useSelector((state) => state.AuthUserReducer.data);
  const [value, setValue] = useState('');
  const [isPublic, setisPublic] = useState(false)
  const [TitleDescription, setTitleDescription] = useState({
    title: '',
    des: '',
  });

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(state)
  useEffect(() => {
    if (state?.TitleDescription && state?.data) {
      dispatch(Toggle(0));
      setTitleDescription(state.TitleDescription);
      setValue(state.data);
      
    } else {
      toast.error('Invalid note state');
      navigate('/');
    }
  }, []);

  const UpdateNote = async () => {
    if (!TitleDescription.title.trim()) {
      return toast.error('Title is required');
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/notes/EditNotes`,
        {
          notesHTML: value,
          title: TitleDescription.title,
          des: TitleDescription.des,
          id,
          isPublic: isPublic,
        },
        {
          withCredentials: true,
        }
      );

      if (response?.data?.id) {
        dispatch(fetchSidebarlinks(userData.email));
        navigate(`/readNotes/${response.data.id}`);
        toast.success('Note updated');
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      toast.error('Failed to update note');
      console.error(error);
    }
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <Box sx={{ marginTop: '10px', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Edit Note
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField
          required
          label="Project Title"
          variant="outlined"
          size="small"
          value={TitleDescription.title}
          onChange={(e) =>
            setTitleDescription((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextareaAutosize
          minRows={3}
          placeholder="Short description"
          value={TitleDescription.des}
          onChange={(e) =>
            setTitleDescription((prev) => ({ ...prev, des: e.target.value }))
          }
          style={{ width: '100%', padding: 10, fontFamily: 'inherit' }}
        />
      </Box>

      <Button variant="contained" onClick={UpdateNote}>
        Update Note
      </Button>
      <Switch {...label} onClick={()=>setisPublic(!isPublic)}/>{!isPublic ? "Private" : 'Public'}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Box sx={{ flex: 1 }}>
        <div style={{marginBottom : '60px'}}>
          <Editor value={value} setValue={setValue} />
          </div>
        </Box>
        
      </Box>
      <PreviewScreen value={value}/>
    </Box>
  );
};

export default EditNotes;
