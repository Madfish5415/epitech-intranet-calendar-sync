const {getEvents} = require("./src/epitech-calendar");
const {convertToICS} = require("./src/ics");
const express = require("express");
const generateICS = require("ics-service/generate-ics");
const feedRoute = require("ics-service/feed");
const aboutRoute = require("ics-service/about");
const CronJob = require('cron').CronJob;


const TITLE = 'Epitech Calendar Feed'
const GENERATOR = 'Feed generator for Epitech Calendar'

let EVENTS_LIST = [];

getEvents().then((events) => {
    const e = [];
    for (let event of events) {
        e.push(convertToICS(event));
    }
    EVENTS_LIST = e;
    console.log("Done");
}).catch();

let job = new CronJob(
    '0 0 * * * *',
    function() {
        getEvents().then((events) => {
            const e = [];
            for (let event of events) {
                e.push(convertToICS(event));
            }
            EVENTS_LIST = e;
            console.log("Done");
        }).catch();
    },
    null,
    true,
    'America/Los_Angeles'
);

job.start();



const getIcs = feedUrl => generateICS(TITLE, EVENTS_LIST, feedUrl)


const app = express()
app.use('/feed', feedRoute(getIcs))
app.use('/', aboutRoute(TITLE))

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`)
})
