import updateUser from "../../../helpers/user/updateUser";

export default function userLocation(req, res) {
    
    const reqBody = req.body
    if(typeof reqBody === 'string'){
        const userLocation = JSON.parse(reqBody);
        updateUser(userLocation.username, "homeLocation", userLocation.homeLocation);
    }else{
        updateUser(reqBody.username, "homeLocation", reqBody.homeLocation);
    }
    res.status(200).json({});
}