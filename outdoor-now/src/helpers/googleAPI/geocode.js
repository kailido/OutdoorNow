import { fetchWrapper } from "../fetchWrapper"; 

export default async function geocode(req, res){
    const data = JSON.parse(req.body);
    var output;
    let address = data.address.replace(", ", "%20");
    
    const key =  '';
       const headers = {
    };
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    try{
        var latlngs = await fetchWrapper.get(url, headers);
    } catch(error){
        res.status(404).json({})
    }
    if (!latlngs){
        res.status(404).json({});
    } else{
        output = latlngs.results[0].geometry.location
        if (!output){
            res.status(404).json({})
        }else{
            res.status(200).json({output});
        }
    }
    
}