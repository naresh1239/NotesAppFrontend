import { Outlet, useNavigate } from 'react-router-dom'
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Box, Button, Switch, TextField, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Editor from './Editor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSidebarlinks } from './store/Reducers/NavlinkReducer';
const PreviewScreen = lazy(()=> import( './PreviewScreen'));

const CreateNotes = () => {
    const userData = useSelector((state) => state.AuthUserReducer.data)
    const [value, setValue] = useState(''); 
    const [isPublic, setisPublic] = useState(false)
    const navigate = useNavigate()
    const [TitleDescription, setTitleDescription] = useState({
        title: '',
        des: ''
    })
   const dispatch = useDispatch()



    const CreateNote = async () => {
        if (!TitleDescription.title) {
       return toast.error('Title missing')
        
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL}/notes/CreateNotes`, {
                notesHTML: value,
                title : TitleDescription.title,
                des : TitleDescription.des,
                isPublic : isPublic,
                userData : userData.email
            },{ withCredentials: true});
            if(response){
             toast.success('Post successfully added!')
                 dispatch(fetchSidebarlinks(userData.email))
            navigate(`/readNotes/${response.data.id}`)
            }
        } catch (error) {
            // Handle error
          return  toast.error('Failed to add post')
         

        }
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <>  
         <Toaster />
            <Box sx={{display : 'flex', gap : '20px'}}>
                <Button variant="contained" onClick={CreateNote}>publish</Button>
                <Switch {...label} onClick={()=>setisPublic(!isPublic)}/>{!isPublic ? "Private" : 'Public'}

            </Box>
            <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                    padding: "13px",
                    gap: "27px",
                    border: "1px solid #ddd7d7",
                     margin: "18px 0px",
                 }}>

                <TextField style={{flex: 1}} required id="outlined-basic" label="Project Title" variant="outlined" size='small' value={TitleDescription.title}
                    onChange={(e) => setTitleDescription((pev) => ({ ...pev, title: e.target.value }))}
                />
                <TextareaAutosize
                   
                    value={TitleDescription.des}
                    onChange={(e) => setTitleDescription((pev) => ({ ...pev, des: e.target.value }))}
                    required
                    maxRows={10}
                    aria-label="maximum height"
                    placeholder="small description"
                    defaultValue=""
                    style={{ height: 100, flex : 1.5}}
                />
            </div>
           <div style={{marginBottom : '60px'}}>
           <Editor value={value} setValue={setValue}/>
           </div>

            <Suspense fallback={
                <Box sx={{ width: '100%' }}>
                    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Loading...</h1>
                    </div>
                </Box>
            }>
                 <PreviewScreen value={value}/>

            </Suspense>
           
        </>
    )
}

export default CreateNotes