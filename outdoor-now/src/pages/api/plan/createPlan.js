const writeJSON = require("../../../helpers/JSON_utils/writeJSON");

function createPlan(req, res) {
    const reqBody = req.body;
    let newPlan;
    if (typeof reqBody === 'string'){
        newPlan = JSON.parse(reqBody);
    } else{
        newPlan = reqBody;
    }

    writeJSON('plans.json', newPlan, 'a')
    res.status(200).json({newPlan});
}

module.exports = createPlan