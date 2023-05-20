import reverseGeocode from "../../src/helpers/googleAPI/reverseGeocode";
import { fetchWrapper } from "../../src/helpers/fetchWrapper";

test("reverseGeocode API should return UVic Address", async() => {
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
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "lat": 48.4634,
            "long": -123.3117
            
        })
    }

    await reverseGeocode(request, response);
    expect(json.mock.calls[0][0].output).toBe('3800 Finnerty Rd, Victoria, BC V8P 5C2, Canada');
});

test("reverseGeocode API should return nothing, error 404", async() => {
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
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "lat": 91,
            "long": 181
        })
    }

    await reverseGeocode(request, response);
    expect(json.mock.calls[0][0].response).not.toBeTruthy();
});