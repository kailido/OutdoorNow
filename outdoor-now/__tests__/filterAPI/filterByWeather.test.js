//import function to test
import filterByWeather from "../../src/pages/api/filter/filterByWeather";
//import fetchWrapper to mock
const fetchWrapper = require("../../src/helpers/fetchWrapper");
//mock fetchWeather
jest.mock("../../src/helpers/fetchWrapper");

/* test("filterByWeather API should return a response", () => {
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}

    //create request object
    const request = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "date": "2023-03-20",
            "time": "12:00:00",
            "activities": [{
                "name": "test1",
                "long": -123.3298,
                "lat": 48.4073
            }],
            "minWeather": {
                "cond": "cloudy",
                "minTemp": 10
            }
        })
    }
    //mock implementation needed to make test run
    fetchWrapper.get.mockImplementation(() => {
        return ({"data": [
            {
                "weather": {
                    "description": "cloudy"
                },
                "temp": 10,
                "timestamp_local": "2023-03-20T13:00:00"
            }
        ]})
    });

    //call api function
    filterByWeather(request, response);

    //response should have been called once
    expect(json.mock.calls).toHaveLength(1);
}); */

test('filterByWeather API should return the same activity if satisfies weather conditions', async () => {
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}
    //mock fetchWrapper get function so that the api is not being consumed,
    //after a certain number of requests this api is not free
    fetchWrapper.get.mockImplementation(() => {
        return ({"data": [
            {
                "weather": {
                    "description": "sunny"
                },
                "temp": 20,
                "timestamp_local": "2023-03-20T13:00:00"
            }
        ]})
    });

    //create request with acceptable weather conditons and the long and lat of the location
    const request = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "date": "2023-03-20",
            "time": "12:00:00",
            "activities": [{
                "name": "test",
                "long": -123.3298,
                "lat": 48.4073
            }],
            "minWeather": {
                "cond": "cloudy",
                "minTemp": 10
            }
        })
    }

    //call filterByWeather
    await filterByWeather(request, response);
    //expect response to contain the given activity
    expect(json.mock.calls[0][0].output).toMatchObject([
        {
        "name": "test",
        "long": -123.3298,
        "lat": 48.4073
    }])
});

test("filterByWeather API should return a list of activities satisfying weather condtions", async () => {
    //mock json object
    const json = jest.fn();
    //mock status containing JSON object
    const status = jest.fn(() => {
        return {json}
    });
    //build response object
    const response = {status}
    //mock fetchWrapper get function so that the api is not being consumed,
    //after a certain number of requests this api is not free
    fetchWrapper.get.mockImplementation(() => {
        return ({"data": [
            {
                "weather": {
                    "description": "sunny"
                },
                "temp": 20,
                "timestamp_local": "2023-03-20T13:00:00"
            }
        ]})
    });

    //create request with acceptable weather conditons and the long and lat of the location
    const request = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "date": "2023-03-20",
            "time": "12:00:00",
            "activities": [{
                "name": "test1",
                "long": -123.3298,
                "lat": 48.4073
            }, {
                "name": "test2",
                "long": -123.3298,
                "lat": 48.4073
            }, {
                "name": "test3",
                "long": -123.3298,
                "lat": 48.4073
            }],
            "minWeather": {
                "cond": "cloudy",
                "minTemp": 10
            }
        })
    }

    //call filterByWeather
    await filterByWeather(request, response);
    //expect response to contain the given activity
    expect(json.mock.calls[0][0].output).toMatchObject([{
            "name": "test1",
            "long": -123.3298,
            "lat": 48.4073
        }, {
            "name": "test2",
            "long": -123.3298,
            "lat": 48.4073
        }, {
            "name": "test3",
            "long": -123.3298,
            "lat": 48.4073
    }])
});

test("filterByWeather should filter out activities that do not saftisfy minWeather", async () => {
        //mock json object
        const json = jest.fn();
        //mock status containing JSON object
        const status = jest.fn(() => {
            return {json}
        });
        //build response object
        const response = {status}
        //mock fetchWrapper get function so that the api is not being consumed,
        //after a certain number of requests this api is not free
        //use mockImplementationOnce three times to represnt the three calls for test1, test2, test3
        fetchWrapper.get.mockImplementationOnce(() => { //test1 val
            return ({"data": [
                {
                    "weather": {
                        "description": "sunny"
                    },
                    "temp": 20,
                    "timestamp_local": "2023-03-20T13:00:00"
                }
            ]})
        }).mockImplementationOnce(() => { //test2 val
            return ({"data": [
                {
                    "weather": {
                        "description": "sunny"
                    },
                    "temp": 20,
                    "timestamp_local": "2023-03-20T13:00:00"
                }
            ]})
        }).mockImplementationOnce(() => { //test3 val
            return ({"data": [
                {
                    "weather": {
                        "description": "rain"
                    },
                    "temp": 5,
                    "timestamp_local": "2023-03-20T13:00:00"
                }
            ]})
        });
    
        //create request with acceptable weather conditons and the long and lat of the location
        //one location different to return different weather not saftisfying minWeather conditions
        const request = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "date": "2023-03-20",
                "time": "12:00:00",
                "activities": [{
                    "name": "test1",
                    "long": -123.3298,
                    "lat": 48.4073
                }, {
                    "name": "test2",
                    "long": -123.3298,
                    "lat": 48.4073
                }, {
                    "name": "test3",
                    "long": -124.1126,
                    "lat": 48.44039
                }],
                "minWeather": {
                    "cond": "cloudy",
                    "minTemp": 10
                }
            })
        }
    
        //call filterByWeather
        await filterByWeather(request, response);
        //expect response to contain the given activity
        expect(json.mock.calls[0][0].output).toMatchObject([{
                "name": "test1",
                "long": -123.3298,
                "lat": 48.4073
            }, {
                "name": "test2",
                "long": -123.3298,
                "lat": 48.4073
            }])
});