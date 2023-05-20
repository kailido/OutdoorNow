import { Button, Box, Fab, MenuItem, Select, Typography, InputLabel, FormControl, ButtonGroup, TextField, Divider } from '@mui/material';
import { useAuth } from '../context/userAuth'
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useMemo, useEffect } from 'react';
import {fetchWrapper} from '../helpers/fetchWrapper';
import { GoogleMap, MarkerF, useLoadScript, InfoWindowF } from "@react-google-maps/api";
import createPlanRequest from '../helpers/plans/createPlanRequest';
//import createPlan from "./api/plan/createPlan";
//this file may seem large but this is intendtional and needed due to the useState variable representng search paramameters
//and the communication between the components and these useState variables
export default function home(){
    //setup user, router and api url for forntend - backend communication
    const userContext = useAuth();
    const router = useRouter();
    const user = userContext.currentUser();
    const baseUrl = `/api`
    
    //create use state vaiables to store search parameters and results accross reloads
    const [searchActivity, setSearchActivity] = useState('');
    const [location, setLocation] = useState('');
    const [minCond, setMinCond] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [clicked, setClicked] = useState('None');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [spots, setSpots] = useState([]);
    const [homeLoc, setHomeLoc] = useState();
    const [shareEmail, setShareEmail] = useState('')
    const [name, setName] = useState('');

    //Google Maps API stuff
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
    };
    const [activeMarker, setActiveMarker] = useState(null);
    
    const center = useMemo(() => ({lat: homeLoc?.lat ?? 0, lng: homeLoc?.long ?? 0}), [homeLoc]);
    const { isLoaded } = useLoadScript({
        id:'google-map-script',
        googleMapsApiKey: "AIzaSyBHTQI0opS0l6tlQzbUgqEljSw_Ieco7tI"
      });

    //functions to reroute user when requested
    const sendToLogin = () => {
        userContext.logout()
    }
    const 
    sendToProfile = () => {
        router.push("/profile")
    }

    //all handle fucntions take care of setting useState variables onChange or onClick
    const handleDate = (event) => {
        setDate(event.target.value)
    }

    const handleTime = (event) => {
        setTime(event.target.value)
    }

    const handleActivity = (event) => {
        setSearchActivity(event.target.value);
    };

    //this gets users current location and assigns it to location useState
    const handleCurrLoc = () => {
        //use js navigator.geolocation.getCurrentPosition() to get curr location
        navigator.geolocation.getCurrentPosition((position) => {
            const loc = {
              "lat": position.coords.latitude,
              "long": position.coords.longitude
            };
            setLocation(loc);
            setHomeLoc(loc)
            setClicked('Current Location')
          }, (error) => {console.error('error: ', error)}, {timeout: 60000});
    }
    //this uses this users saved location and assigns it to the location useState
    const handleSavedLoc = () => {
        setLocation(user.homeLocation);
        setHomeLoc(user.homeLocation)
        setClicked('Home Location')
    }

    const handleCond = (event) => {
       setMinCond(event.target.value);
    }

    const handleTemp = (event) => {
        setMinTemp(event.target.value);
    }

    //this handles when the user clicks the search button, this involves access the getHikingTrails, getBikingTrails, and filterByWeather Next.js API endpoints
    //these endpoints access external APIs
    const handleSearch = async () => {
        //parse min condition to fit expected input
        let cond;
        if(minCond.toLowerCase().includes('rain')){
            cond = 'rain';
        }else if(minCond.toLowerCase().includes('snow')){
            cond = 'snow';
        }else if(minCond.toLowerCase().includes('cloud')){
            cond = 'cloudy';
        }else if(minCond.toLowerCase().includes('sun')){
            cond = 'sunny'
        }

        var trails
        if(searchActivity === 'hiking'){
            trails = await fetchWrapper.post(`${baseUrl}/getTrails/getHikingTrails`, {"lat": location.lat, "lon": location.long, "radius": user.maxTravelRadius})
        }else if (searchActivity === 'biking'){
            trails = await fetchWrapper.post(`${baseUrl}/getTrails/getBikingTrails`, {"lat": location.lat, "lon": location.long, "radius": user.maxTravelRadius})
        }

        let filterTrails;
        if(minCond === '' || minTemp === ''){
            filterTrails = trails
            console.log('skipped');
        }else{
            const temp = await fetchWrapper.post(`${baseUrl}/filter/filterByWeather`, {"date": date, "time": time, "activities": trails, "minWeather": {"cond": cond, "minTemp": minTemp}})
            filterTrails = temp.output
            console.log(filterTrails);
            console.log("not skipped")
        }
        
        setSpots(filterTrails);
        console.log(filterTrails);
        if(filterTrails === []){alert("no trails found within your radius")}
    }

    const handleSharePlan = async (event) => {
        let name = event.target.value;
        const request_createPlan = await createPlanRequest(user.username, searchActivity, date, time, name);
        const response_createPlan = await fetchWrapper.post(`${baseUrl}/plan/createPlan`, request_createPlan);
        const request_sharePlan = {
            "plan": response_createPlan.newPlan,
            "inviteeEmail": shareEmail,
        }
        const response_sharePlan = await fetchWrapper.post(`${baseUrl}/plan/sharePlan`, request_sharePlan);

        console.log(response_sharePlan)
        setActiveMarker("null")
    }

    //this renders a dropdown menu with options for the activity to search for
    //this is it's own function as it needs to render only the activities for which searching is supported and that the user has as preferrred activities
    //this is not in a separate file as it needs to access a useState variable which might be difficult if this was in it's own file
    const drOptions = () => {
        if(user){
            if((user.favouriteActivities.includes("biking") && user.favouriteActivities.includes("hiking")) || (user.favouriteActivities.includes("Biking") && user.favouriteActivities.includes("Hiking"))){
                return(
                    <FormControl sx={{ m: 1, minWidth: 220}} size="small">
                        <InputLabel id="activitySelectLabel" sx={{ color: "black" }}>Activity</InputLabel>
                        <Select
                            labelId="activitySelectLabel"
                            id="selectActivity"
                            value={searchActivity}
                            label="Activity"
                            onChange={handleActivity}
                            sx={{ color: "black" }}
                            style={{backgroundColor: "white"}}
                        >
                            <MenuItem value={'hiking'} id="hiking">Hiking</MenuItem>
                            <MenuItem value={'biking'} id="biking">Biking</MenuItem>
                        </Select>
                    </FormControl>
                )
            }else if(user.favouriteActivities.includes("hiking") || user.favouriteActivities.includes("Hiking")){
                return(
                    <FormControl sx={{ m: 1, minWidth: 220}} size="small">
                        <InputLabel id="activitySelectLabel" sx={{ color: "black" }}>Activity</InputLabel>
                        <Select
                            labelId="activitySelectLabel"
                            id="selectActivity"
                            value={searchActivity}
                            label="Activity"
                            onChange={handleActivity}
                            sx={{ color: "black" }}
                            style={{backgroundColor: "white"}}
                        >
                            <MenuItem value={'hiking'} id="hiking">Hiking</MenuItem>
                        </Select>
                    </FormControl>
                )               
            }else if(user.favouriteActivities.includes("biking") || user.favouriteActivities.includes("Biking")){
                return(
                    <FormControl sx={{ m: 1, minWidth: 220}} size="small">
                        <InputLabel id="activitySelectLabel" sx={{ color: "black" }}>Activity</InputLabel>
                        <Select
                            labelId="activitySelectLabel"
                            id="selectActivity"
                            value={searchActivity}
                            label="Activity"
                            onChange={handleActivity}
                            sx={{ color: "black" }}
                            style={{backgroundColor: "white"}}
                        >
                            <MenuItem value={'biking'} id="biking">Biking</MenuItem>
                        </Select>
                    </FormControl>
                )
            }else{
                return(
                    <Typography><strong>Please Add Activities (Biking and Hiking are currently supported) in the Profile Page</strong></Typography>
                )
            }
        }
    }


    //this return renders all the JSX that is displayed to the user
    return (
        <div className={styles.homeMain}>
            <div className={styles.homeTopBar}>
                <Button onClick = {sendToLogin} variant='contained'>Logout</Button>
                <Typography>Before using <strong>OutdoorNow</strong> to search for activities below, please configure your profile preferences (activities, max distance, etc.)</Typography>
                <Fab variant="extended" color="primary" onClick = {sendToProfile}>
                    Profile
                    <AccountCircleIcon sx={{ ml: 1 }}/>
                </Fab>
            </div>
            <div className={styles.homeMainBox}>
                <div className={styles.halfBox}>
                    <Box sx={{                   
                            backgroundColor: "secondary.main",
                            height: '90%',
                            width: '80%',
                            borderRadius: '25px',
                            padding: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                    {!isLoaded ? (
                        <h1>Loading...</h1>
                        ) : (
                        <GoogleMap
                         mapContainerStyle={{ width: '100%', height: '100%',borderRadius: '25px' }}
                        center={center}
                        zoom={10}
                        onLoad={(map) => console.log('Map Loaded')}
                        key={spots}
                        >{
                        spots?.map(({name, lat, lon} ) => {
                            let latlng = {'lat':parseFloat(lat), 'lng': parseFloat(lon)}
                            return(
                            
                            <MarkerF
                            key={name} 
                            position={latlng}
                            onClick={()=>handleActiveMarker(name)
                            
                            }>
                            {activeMarker === name ? (
                                <InfoWindowF onClockClick={() => setActiveMarker(null)} >
                                    <Box sx={{width: 1, height: 1, display: 'flex', flexDirection:'column'}}>
                                        <Typography sx={{ color: "#000000" }}>{name}</Typography>
                                        <Typography sx={{ color: "#000000" }}>Enter email to share plan with</Typography>
                                        <TextField value={shareEmail} size="small" onChange= {(event) => {setShareEmail(event.target.value)}}/>
                                        <Button id='createPlanButton' value={name} onClick={handleSharePlan}>Share this Plan</Button>
                                    </Box>
                                </InfoWindowF>
                            ) : null}
                            </MarkerF>
                        )})}
                        </GoogleMap>
                    )}	
                    </Box>
                </div>
                <div className={styles.halfBox}>
                    <Box sx={{
                        backgroundColor: "secondary.main",
                        height: '90%',
                        width: '80%',
                        borderRadius: '25px',
                        padding: '25px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Box id= 'dateBox' sx={{width: '100%'}}>
                            <Typography>Select a date and time for your activity</Typography>
                            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TextField 
                                    value={date}
                                    onChange={handleDate}
                                    fullWidth
                                    hiddenLabel
                                    size="small"
                                    variant="filled" 
                                    sx={{
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "white"
                                        },
                                        "& .MuiFilledInput-root:hover": {
                                            backgroundColor: "white",
                                            "@media (hover: none)": {
                                              backgroundColor: "white"
                                            }
                                        },
                                        "& .MuiFilledInput-root.Mui-focused": {
                                            backgroundColor: "white"
                                        },
                                        width: '45%'
                                    }}/>
                                <TextField 
                                    value={time}
                                    onChange={handleTime}
                                    fullWidth
                                    hiddenLabel
                                    size="small"
                                    variant="filled" 
                                    sx={{
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "white"
                                        },
                                        "& .MuiFilledInput-root:hover": {
                                            backgroundColor: "white",
                                            "@media (hover: none)": {
                                              backgroundColor: "white"
                                            }
                                        },
                                        "& .MuiFilledInput-root.Mui-focused": {
                                            backgroundColor: "white"
                                        },
                                        width: '45%'
                                    }}/>
                            </div>  
                            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Typography sx={{width: '45%'}} variant="caption">YYYY-MM-DD</Typography>
                                <Typography sx={{width: '45%'}} variant="caption">Enter an hour value with 2 digits (06:30)</Typography>
                            </div>  
                        </Box>
                        <Box id='activityBox' sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                        }}>
                            <Typography>Select an activity to search for</Typography>
                            {drOptions()}
                        </Box>
                        <Box id='locationBox' sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                            <Typography>Select which location to use</Typography>
                            <ButtonGroup variant="contained" fullWidth>    
                                <Button id='currentLocationButton' onClick={handleCurrLoc}>Current Location</Button>
                                <Button id='savedLocationButton' onClick={handleSavedLoc}>Saved Location</Button>
                            </ButtonGroup>
                            <Typography variant="caption" id = "selectedLocation">SELECTED: {clicked}</Typography>
                        </Box>
                        <Box id="weatherBox" sx={{width: '100%'}}>
                            <Typography>Weather options</Typography>
                            <Divider sx={{marginBottom:'15px', bgcolor: "primary.main"}} light></Divider>
                            <div id="minConditions">
                                <Typography>Minimum condtions</Typography>
                                <TextField 
                                    id="minCond"
                                    value={minCond}
                                    onChange={handleCond}
                                    fullWidth
                                    hiddenLabel
                                    size="small"
                                    variant="filled" 
                                    sx={{
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "white"
                                        },
                                        "& .MuiFilledInput-root:hover": {
                                            backgroundColor: "white",
                                            "@media (hover: none)": {
                                              backgroundColor: "white"
                                            }
                                        },
                                        "& .MuiFilledInput-root.Mui-focused": {
                                            backgroundColor: "white"
                                        }
                                    }}/>
                                <Typography variant="caption">Select (one) from: sunny, cloudy, rainy, snowy, etc.</Typography>
                            </div>
                            <div id="minTemp" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: "10px"}}>
                                <Typography>Minimum temperature:</Typography>
                                <TextField 
                                    id="minTempy"
                                    value = {minTemp}
                                    onChange={handleTemp}
                                    hiddenLabel
                                    size="small"
                                    variant="filled" 
                                    sx={{
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: "white"
                                        },
                                        "& .MuiFilledInput-root:hover": {
                                            backgroundColor: "white",
                                            "@media (hover: none)": {
                                              backgroundColor: "white"
                                            }
                                        },
                                        "& .MuiFilledInput-root.Mui-focused": {
                                            backgroundColor: "white"
                                        }, 
                                        width: '1',
                                        marginLeft: '10px'
                                    }}/>
                            </div>
                        </Box>
                        <Button variant="contained" onClick={handleSearch}>Search</Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}