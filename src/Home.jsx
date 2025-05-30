// Home.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const redirect = useNavigate()
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width : '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: '100%',
          boxShadow: 4,
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
        }}
      >
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <NoteAddIcon color="primary" sx={{ fontSize: 60 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Welcome to Notes
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create your first note and capture what matters most.
            </Typography>
            <Button variant="contained" size="large" startIcon={<NoteAddIcon />} sx={{ mt: 2 }} onClick={()=> redirect('/CreateNotes')}>
              Create Note
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
