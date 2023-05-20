function createPlanRequest(username, activity, date, time, position) {
    
    //converting = date+time into start_date and end_date
    let start_dt = new Date(date + 'T' + time + 'Z')
    let end_dt = new Date(start_dt);
    end_dt.setHours(end_dt.getHours() + 4);

    return {"username": username,
        "streetAddress": position,
        "startDate": start_dt.toJSON().slice(0,19) + 'Z',
        "endDate": end_dt.toJSON().slice(0,19) + 'Z',
        "activity": activity}
}

module.exports = createPlanRequest