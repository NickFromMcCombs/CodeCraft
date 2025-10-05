import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { AppContext } from '../context/AppContext';
import cheersImg from '../assets/cheers.png';
import groupPhotoImg from '../assets/group-photo.png';

const Home = () => {
  const { setWelcomeName } = useContext(AppContext);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setWelcomeName(input.trim());
  };

    return (
      <Container sx={{ py: 4 }}>
  <Paper elevation={0} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Highlights</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt:2 }}>Remember to live out our values</Typography>
          <ol style={{ marginTop: 8, marginBottom: 16, paddingLeft: 20 }}>
            <li>Relentless Learning and Growth</li>
            <li>Creative Problem Solving</li>
            <li>Curiosity-Driven Exploration</li>
          </ol>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mt:2 }}>Upcoming Events</Typography>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            <li><b>Feb 7:</b> Employee Hack-a-ston</li>
            <li><b>Mar 7:</b> Food Bank Volunteering</li>
            <li><b>Apr 4:</b> Company Retreat</li>
          </ul>
        </Paper>
  <Paper elevation={0} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Latest Event</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis animi laudantium eos atque sed debitis eum deleniti cumque saepe aut voluptatibus, dolores commodi corporis quibusdam numquam perferendis, molestias tenetur suscipit.
          </Typography>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid size={{ xs:12, sm:6, md:4 }}>
              <Box component="img" src={cheersImg} alt="Team celebrating with a cheers" sx={{ width: '100%', borderRadius: 3, objectFit: 'cover' }} />
            </Grid>
            <Grid size={{ xs:12, sm:6, md:4 }}>
              <Box component="img" src={groupPhotoImg} alt="Company group photo" sx={{ width: '100%', borderRadius: 3, objectFit: 'cover' }} />
            </Grid>
          </Grid>
        </Paper>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField size="small" label="Enter your name here" variant="outlined" value={input} onChange={(e)=>setInput(e.target.value)} />
          <Button type="submit" variant="contained">Update Header</Button>
        </Box>
      </Container>
    );
};

export default Home;
