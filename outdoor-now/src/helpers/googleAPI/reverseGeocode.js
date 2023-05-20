const fetchWrapper = require("../fetchWrapper");
async function reverseGeocode(req, res){
    const {lat, long} = JSON.parse(req.body);
    var output;
    var latlng = lat + ',' + long;

    const key =  '';
       const headers = {
    };
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=' + key;
    try{
        var address = await fetchWrapper.get(url, headers);
    } catch(error){
        res.status(404).json({})
    }
    if (!address){
        res.status(404).json({});
    } else{
        for (let obj of address.results){
            if (obj.types.includes('street_address')){
                output = obj.formatted_address;
            }
        }
        if (!output){
            res.status(404).json({})
        }else{
            res.status(200).json({output});
        }
    }
    
}

module.exports = reverseGeocode