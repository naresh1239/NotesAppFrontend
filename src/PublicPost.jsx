import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PublicPost = () => {
  const id = window.location.pathname.split('/')[2];
  const userData = useSelector((state) => state.AuthUserReducer.data);
  const [value, setValue] = useState('');
  const [titleDescription, setTitleDescription] = useState({ title: '', des: '' });

  useEffect(() => {
    const ReadNotes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/notes/readPublicNotes`, {
          params: {
            id: id,
            userId: userData.email,
          },
          withCredentials: true,
        });

        const { data, jsonData } = response.data.data;

        setValue(jsonData.content);
        setTitleDescription({
          title: data.title,
          des: data.des,
        });
      } catch (error) {
        console.error(error);
      }
    };

    ReadNotes();
  }, [id]);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <a  style={styles.logo}>📝 MyNotesApp</a>
        <div>
          <a href="/" style={styles.navLink}>Visit Our Website</a>
          <a  style={styles.navButton}>Create Your Own Notes</a>
        </div>
      </nav>

      {/* Title and Description */}
      <div style={styles.contentWrapper}>
        <h1 style={styles.title}>{titleDescription.title}</h1>
        <p style={styles.description}>{titleDescription.des}</p>
        <div
          style={styles.noteContent}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "98.7vw",
    minHeight: '120vh',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    width: '100%',
    padding: '15px 30px',
    backgroundColor: '#4A90E2',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },
  navLink: {
    marginRight: '20px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  navButton: {
    backgroundColor: '#fff',
    color: '#4A90E2',
    padding: '8px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  contentWrapper: {
    maxWidth: '800px',
    margin: '40px auto',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  noteContent: {
    fontSize: '16px',
    color: '#222',
    lineHeight: '1.6',
  },
};

export default PublicPost;
