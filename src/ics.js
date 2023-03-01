const moment = require('moment-timezone');

const convertToICS = (event) => {
    return {
        uid: event.codemodule + "-" + event.codeinstance + "-" + event.codeacti + "-" + event.codeevent,
        title: event.acti_title,
        location: event.room?.code.split("/")[3] || "Unknown",
        url: "https://intra.epitech.eu/module/" + event.scolaryear + "/" + event.codemodule + "/" + event.codeinstance + "/" + event.codeacti,
        start: moment.tz(event.start, process.env.TZ || "Europe/Paris").format('YYYY-M-D-H-m').split("-").map(val => parseInt(val)),
        end: moment.tz(event.end, process.env.TZ || "Europe/Paris").format('YYYY-M-D-H-m').split("-").map(val => parseInt(val)),
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
    }
}

module.exports = {
    convertToICS
}
