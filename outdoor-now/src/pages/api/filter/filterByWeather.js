/*
* This API takes a list of activities and their locations, planned date, and minimum acceptable weather
* conditions  (for example: cloudy and 20 degrees) and returns a list of activities that
* satisfy the specified minimum weather conditions
* DEPENDS ON fetchWrapper.js TO FUNCTION PROPERLY
*/
import { fetchWrapper } from "../../../helpers/fetchWrapper";
import isAcceptable from "../../../helpers/filer/acceptable";

export default async function filterByWeather(request, res){
    //parse request body data
    var date; 
    var time; 
    var activities;
    var minWeather;
    if(typeof(request.body) == "string"){
        const data = JSON.parse(request.body);
        date = data.date;
        time = data.time;
        activities = data.activities;
        minWeather = data.minWeather;
    }else{
        date = request.body.date;
        time = request.body.time;
        activities = request.body.activities;
        minWeather = request.body.minWeather;
    }

    //create varibale to store output
    var output = [];
    //define fetch headers
    const headers = {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    };
    //itterate over activity list
    for(let activity of activities){
        //get lat and long
        var lat = activity.lat;
        var long = activity.lon;
        const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${long}`
        //get weather for each individual location
        var weather = await fetchWrapper.get(url, headers);
        var weatherData = weather.data;
        var wTime;
        var wDate;
        var dateTimeSplit;
        var datetimeString;
        //remove activities that violate the weather conditions
        for(let forecast of weatherData){
            //get forecast date and time
            datetimeString = forecast.timestamp_local
            dateTimeSplit = datetimeString.split("T");
            wDate = dateTimeSplit[0];
            wTime = dateTimeSplit[1];
            //match against plan date and time 
            //time is sure to be between the previous and current 3 hour forcasts when time < wTime since forecasts in crono order
            if(wDate === date && time < wTime) {
                //compare conditions
                if(isAcceptable(minWeather.cond, forecast.weather.description)){
                    //if conditions are acceptable check temps
                    if(minWeather.minTemp <= forecast.temp){
                        output.push(activity)
                    }
                }
                break;
            };
        }
    }
    //return matching response with success code and activities
    res.status(200).json({output});
}