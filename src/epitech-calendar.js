const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const AUTO_LOGIN = process.env.EPITECH_AUTOLOGIN_LINK;
const EMAILS = process.env.EMAIL_LIST.split(";");

const LOGIN_URL = `${AUTO_LOGIN}/user/?format=json`;
const EPITECH_API_CALENDAR = (start, end) => `${AUTO_LOGIN}/planning/load?format=json&start=${start}&end=${end}`;
const EPITECH_API_ACTIVITY = (year, module, instance, acti) => `${AUTO_LOGIN}/module/${year}/${module}/${instance}/${acti}?format=json`;
const EPITECH_API_USER = `${AUTO_LOGIN}/user/?format=json`;

async function login() {
    console.log("Connecting...");
    try {
        await axios.get(LOGIN_URL);
        console.log("Connected to Epitech Intranet");
    } catch (e) {
        console.error("Error while connecting to Epitech Intranet");
        console.error(e)
        throw e;
    }
}
function retrieveEvents(start, end) {
    console.log(`Getting the activities from ${start} to ${end}...`);
    return axios.get(EPITECH_API_CALENDAR(start, end));
}

function retrieveActivity(year, module, instance, acti) {
    return axios.get(EPITECH_API_ACTIVITY(year, module, instance, acti));
}
async function filter(arr, callback) {
    const fail = Symbol()
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
}
async function getEvents() {
    await login()

    const events = (await retrieveEvents("2023-02-27", "2023-03-03")).data;

    return await filter(events, async (event) => {
        if (event.calendar_type === 'perso')
            return false;
        const acti = (await retrieveActivity(event.scolaryear, event.codemodule, event.codeinstance, event.codeacti)).data;
        for (let e of acti.events) {
            if (e.assistants.some(assistant => EMAILS.includes(assistant.login)) && e.code === event.codeevent) return true;
        }
    });
}

function getEmail() {
    return axios.get(EPITECH_API_USER);
}

module.exports = {
    login,
    getEvents,
    getEmail
}
