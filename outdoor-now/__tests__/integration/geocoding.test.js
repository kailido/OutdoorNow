import geocode from "../../src/helpers/googleAPI/geocode";
import { fetchWrapper } from "../../src/helpers/fetchWrapper";

test("Geocode API should return UVic lat and long", async() => {
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
            "address": '3800 Finnerty Rd, Victoria, BC V8P 5C2, Canada'
        })
    }


    await geocode(request, response);
    expect(json.mock.calls[0][0].output).toMatchObject({"lat": 48.4652238, "lng": -123.3084236});
});