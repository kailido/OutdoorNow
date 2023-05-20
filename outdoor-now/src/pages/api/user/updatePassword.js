import updateUser from "../../../helpers/user/updateUser";

export default function userPassword(req, res) {
    
    const reqBody = req.body
    if(typeof reqBody === 'string'){
        const userPassword = JSON.parse(reqBody);
        updateUser(userPassword.username, "password", userPassword.password);
    }else{
        updateUser(reqBody.username, "password", reqBody.password);
    }
    res.status(200).json({});
}