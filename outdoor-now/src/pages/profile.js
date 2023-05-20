import { Container, Grid, TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../context/userAuth'
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import { useState } from 'react';
import {fetchWrapper} from '../helpers/fetchWrapper.js';


export default function home(){
    const userContext = useAuth();
    const router = useRouter();
    const user = userContext.currentUser();
    const baseUrl = `/api`
    
    const sendHome = () => {
        router.push("/home")
    }

    const save = () => {
        userContext.logout()
    }

        const [password, setPassword] = useState('');
        const [activities, setActivities] = useState('');
        const [latitude, setLatitude] = useState('');
        const [longitude, setLongitude] = useState('');
        const [radius, setRadius] = useState('');
  
        var passwords
    const handleUpdatePassword = async () => {
        passwords = await fetchWrapper.post(`${baseUrl}/user/updatePassword`,{"username": user.username, "password": password})
        setPassword('')
      };

        var activity
      const handleUpdateActivities = async () => {
        const activitiesToSend = user?.favouriteActivities
        activitiesToSend.push(activities)
        activity = await fetchWrapper.post(`${baseUrl}/user/updateActivities`,{"username": user.username, "favouriteActivities": activitiesToSend})
        setActivities('')
      };
    
        var homeLocation
      const handleUpdateLocation = async () => {
        homeLocation = await fetchWrapper.post(`${baseUrl}/user/updateLocation`,{"username": user.username, "lat": location.lat, "lon": location.long})
        setLatitude('')
        setLongitude('')
      };
        var rad
      const handleUpdateRadius = async () => {
        const radiusNUM = Number(radius)
        rad = await fetchWrapper.post(`${baseUrl}/user/updateRadius`,{"username": user.username,"radius": radiusNUM})
        setRadius('')
      };

    return (
        <div className={styles.homeMain}>
            <div className={styles.homeTopBar}>
                <Button onClick = {sendHome} variant='contained'>Back</Button>
            </div>
            <Container maxWidth="xl" sx={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', }}>
            <Box mt={4} sx={{borderRadius: '10px', backgroundColor: '#edb586', padding: '10px'}}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    label="Password"
                    //type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography color={'black'}>Current activities: {user?.favouriteActivities.join(', ') ?? 'None'}</Typography>
                    <TextField
                    label="Activities"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    fullWidth
                    />
                    <Typography variant='caption' color={'black'}>Please add activities one at a time</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography color={'black'}>Enter your preferred location in lattidue and longitude</Typography>
                    <TextField
                    label="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography color={'black'}>Or use your current location</Typography>
                    <TextField
                    label="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography color={'black'}>Current radius: {user?.maxTravelRadius ?? 'None'}</Typography>
                    <TextField
                    label="Radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    fullWidth
                    />
                    <Typography variant='caption' color={'black'}>Please specify the max radius you are willing to travel for an activity.</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleUpdatePassword}>
                    Update Password
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleUpdateActivities}>
                    Update Activities
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleUpdateLocation}>
                    Update Location
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleUpdateRadius}>
                    Update Radius
                    </Button>
                </Grid>
                </Grid>
            </Box>
            <Typography color={'black'} sx={{margin:'15px'}}>Use the above buttons to make changes to each preferrence. Once you are done updating your preferrences, save your changes with the button below</Typography>
            <Button variant="contained" color="primary" onClick={save}>Save Changes</Button>
            <Typography color={'black'} variant='caption'>This action will log you out</Typography>
            </Container>
        </div>
    )
}