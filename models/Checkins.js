// let timeSlots = new Map();
// timeSlots["09:00"] = []
// timeSlots["09:30"] = []
// timeSlots["10:00"] = []
// timeSlots["10:30"] = []
// timeSlots["11:00"] = []
// timeSlots["11:30"] = []
// timeSlots["12:00"] = []
// timeSlots["12:30"] = []
// timeSlots["13:00"] = []
// timeSlots["13:30"] = []
// timeSlots["14:00"] = []
// timeSlots["14:30"] = []
// timeSlots["15:00"] = []
// timeSlots["15:30"] = []
// timeSlots["16:00"] = []
// timeSlots["16:30"] = []

let timeslots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', 
'12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

let locationToTimeslots = new Map();

class Checkins{

    static createTimeSlots(location){
        let timeslotMap = new Map();

        timeslots.forEach((time) => {
            timeslotMap.set(time, []);
        })

        locationToTimeslots.set(location, timeslotMap);
    }

    static addCheckin(location, timeslot, userID){

        if (locationToTimeslots.has(location) && this.slotAvailable(location, timeslot)) {
            let timeslotList = locationToTimeslots.get(location).get(timeslot);
            timeslotList.push(userID);
            locationToTimeslots.get(location).set(timeslot, timeslotList);
            return userID;
        } else if (!locationToTimeslots.has(location)) {
            this.createTimeSlots(location);
            let timeslotList = locationToTimeslots.get(location).get(timeslot);
            timeslotList.push(userID);
            locationToTimeslots.get(location).set(timeslot, timeslotList);
            return userID;
        }

        return undefined;

        // if (this.slotAvailable(timeslot)){
        //     console.log(this.slotAvailable(timeslot));
        //     timeSlots[timeslot].push(userID);
        //     console.log(timeSlots);
        //     return userID;
        // }
        // return undefined;
    }

    static removeCheckin(location, timeslot, userID){
        if (!locationToTimeslots.has(location)) {
            this.createTimeSlots(location);
        }
        users = locationToTimeslots.get(location).get(timeslot);
        if (!users.includes(userID)){
            return undefined;
        }
        users.pop(userID);
        return userID;
    }


    static slotAvailable(location, timeslot){
        console.log(timeslot);
        console.log(locationToTimeslots.get(location).get(timeslot));
        return locationToTimeslots.get(location).get(timeslot).length < 5;
    }

    static getCount(location, timeslot) {
        console.log(timeslot);
        if (!locationToTimeslots.has(location)) {
            this.createTimeSlots(location);
        }
        console.log(locationToTimeslots.get(location).get(timeslot));
        return locationToTimeslots.get(location).get(timeslot).length;
    }

    static getUsers(location, timeslot) {
        return locationToTimeslots.get(location).get(timeslot);
    }

    static resetTimeSlots(location){
        this.createTimeSlots(location);
    }
}

module.exports = Checkins;