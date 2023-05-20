const {createICS, sendInvite} = require("../../../helpers/plans/sharePlan.js");

async function sharePlan(req, res) {

    //parse request body data
    var plan; 
    var inviteeEmail;

    if(typeof(req.body) == "string"){
        const data = JSON.parse(req.body);
        plan = data.date;
        inviteeEmail = data.time;
    }else{
        plan = req.body.plan;
        inviteeEmail = req.body.inviteeEmail;
    }

    const icsContent = createICS(plan)
    const sent = await sendInvite(inviteeEmail, icsContent);

    res.status(200).json({sent});
}

module.exports = sharePlan;