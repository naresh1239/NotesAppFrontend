import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const OtpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const ref = useRef([])
  const {mail} = useParams();
  
  const navigate = useNavigate()
  // Handle OTP change
  const handleChange = (e, index) => {
    let newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < otp.length - 1) {
        ref.current[index + 1].focus();
      }
  };


  useEffect(() => {
    const handlePaste = (event) => {
        const pastedData = event.clipboardData.getData('text');
        setOtp(pastedData.split(''))
      };
    
      window.addEventListener('paste', handlePaste);
    
      return () => {
        window.removeEventListener('paste', handlePaste);
      };
  }, [])
  
  // Handle submit (can be customized)
  const handleSubmit = async() => {
    try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/verify`,
          {
            otp : otp.join(''),
            email : mail
          },
          { withCredentials: true }
        );
        if (response.status == 200) {
          navigate(`/LoginToNotes`);
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        width: 300,
        backgroundColor: 'background.paper',
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Enter OTP
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {otp.map((digit, index) => {
           
           return (
          <TextField
            key={index}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            inputRef={(el) => (ref.current[index] = el)}
            sx={{
              width: 40,
              height: 40,
              textAlign: 'center',
              '& input': {
                textAlign: 'center',
                fontSize: '20px',
                padding: '0px',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'gray',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
            inputProps={{
              maxLength: 1,
              pattern: '[0-9]*',
            }}
          />
        )})}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '100%', mt: 2 }}
        onClick={handleSubmit}
        disabled={otp.some((digit) => digit === '')}
      >
        Submit
      </Button>
    </Box>
  );
};

export default OtpVerify;
