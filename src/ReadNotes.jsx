import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { fetchSidebarlinks } from './store/Reducers/NavlinkReducer';

const ReadNotes = () => {
   const userData = useSelector((state) => state.AuthUserReducer.data)
   const {id} = useParams()
   const [value, setValue] = useState('')
   const [apiData, setapiData] = useState('')
    const [TitleDescription, setTitleDescription] = useState({
           title: '',
           des: ''
       })
   const dispatch = useDispatch()
   const redirect = useNavigate()

  useEffect(() => {
    const ReadNotes = async() =>{

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/notes/readNotes`,{
                params: {
                    id: id,
                    userId : userData.email
                },
                withCredentials: true
            }, );
      
            const {data, jsonData} = response.data.data
            setapiData(data)
            setValue(jsonData.content)
             setTitleDescription({
                  title: data.title,
                   des:  data.des
             })
            
          } catch (error) {
            toast.error('Failed to fetch note data. Please try again later.');
            console.error(error);
          }
    }
    ReadNotes()
    }, [id])


    const DeleteNoteByid = (id)=>{
      if (confirm("Are you sure you want to delete this note?")) {
        axios.delete(`${import.meta.env.VITE_URL}/notes/DeleteNote`, {
            params: {
                id: id
            },
            withCredentials: true
    }).then((res)=>{
        if(res.status === 200){
          dispatch(fetchSidebarlinks(userData.email))
            redirect('/')
        }
    }).catch((err)=>{
        console.error(err)
   
    })
    }
  }

  const ShareLink = ()=>{
    const link = `${window.location.origin}/readNotesPublic/${id}`
    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link copied to clipboard')
    }).catch((err) => {
      console.error('Failed to copy link:', err);
    }
    );
   
  }

 
  return (
    <div
    style={{
        width: "100%",
        height: "80vh"
    ,
    }}
    >
      <Toaster/>
        <div >
        <div style={{
          display : 'flex',
          gap : '10px',
          justifySelf : 'end'
        }}>
        <Button variant="contained"  onClick={()=>redirect(`/EditNotes/${id}`,{  state: {
                data: value,
                TitleDescription: TitleDescription,
            },}) }>
                Edit
         </Button>
         <Button variant='outlined' startIcon={<DeleteIcon/>} onClick={()=>DeleteNoteByid(id)}>Delete</Button>
        {apiData.is_public ? <Button variant="contained" endIcon={<SendIcon />} onClick={ShareLink}>Share</Button> : ""}
        </div>
        </div>
         <div
                    style={{      backgroundColor: '#fff', padding: '10px' }}
                    dangerouslySetInnerHTML={{ __html: value }}
                />
    </div>
  )
}

export default ReadNotes