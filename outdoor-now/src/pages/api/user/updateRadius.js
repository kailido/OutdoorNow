import updateUser from "../../../helpers/user/updateUser";

export default function updateRadius(req, res) {
    
    const reqBody = req.body
    if(typeof reqBody === 'string'){
        const userRadius = JSON.parse(reqBody);
        updateUser(userRadius.username, "maxTravelRadius", userRadius.radius);
    }else{
        updateUser(reqBody.username, "maxTravelRadius", reqBody.radius);
    }
    res.status(200).json({});
}