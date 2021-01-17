const express = require('express');

const router = express.Router();

const Checkins = require('../models/Checkins');
const Users = require('../models/Users')

/**
 * @name POST/api/checkins/
 * @param {string} location - location to checkin
 * @param {string} userName - username of user checking in
 * @param {string} timeslot - timeslot to check-in to
 * @throws {401} - if user is not logged in
 * @throws {400} - if timeslot is full
 */
router.post("/", (req, res)=> {
    userName = req.session.username;
    // timeslot = req.params.timeslot;
    location = req.body.location;
    timeslot = req.body.timeslot;
    if (userName === undefined) {
		res.status(401).json({ message: 'Must be logged in to reserve time slot' });
    }
    else{
        try_checkin = Checkins.addCheckin(location, timeslot, Users.getUserId(userName));
        if (try_checkin === undefined){
            res.status(400).json({ message: 'This time slot is full'});
        }
        else{
            res.status(200).json({ message: 'Check in success!'})
        }
    }
})

/**
 * @name GET/api/checkins/
 * @param location - location of timeslots
 * @param timeslot - timeslot to get number of check-ins
 * @throws {400} - if unable to get number of check-ins (invalid timeslot)
 */
router.get("/:location/:timeslot?", (req, res) => {
    location = req.params.location;
    timeslot = req.params.timeslot;
    thiscount = Checkins.getCount(location, timeslot);
    //console.log(thiscount);
    if (thiscount === undefined) {
        res.status(400).json({ message: 'Unable to get count for ' + timeslot + ' at ' + location});
    } else {
        res.status(200).json({ count: thiscount});
    }
        
})


/**
 * @name DELETE/api/checkins/
 * @param userName - username of user removing their check-in
 * @param timeSlot - timeslot to remove check-in from
 * @throws {401} - if user not logged in
 * @throws {400} - if user has not been checked-in to that timeslot
 */
router.delete("/:location/", (req, res) => {
    userName = req.session.username;
    location = req.params.location;
    timeSlot = req.body.timeSlot;
    if (userName === undefined) {
		res.status(401).json({ message: 'Must be logged in to delete time slot' });
    }
    else{
        try_remove = Checkins.removeCheckin(location, timeSlot, Users.getUserId(userName));
        if (try_remove === undefined){
            res.status(400).json({ message: 'This time slot is not yours'});
        }
        else{
            res.status(200).json({ message: 'Delete check in success!'})
        }
    }
})

module.exports = router;
