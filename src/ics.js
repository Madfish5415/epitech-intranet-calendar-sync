const convertToICS = (event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    return {
        uid: event.codemodule + "-" + event.codeinstance + "-" + event.codeacti + "-" + event.codeevent,
        title: event.acti_title,
        location: event.room?.code.split("/")[3] || "Unknown",
        url: "https://intra.epitech.eu/module/" + event.scolaryear + "/" + event.codemodule + "/" + event.codeinstance + "/" + event.codeacti,
        start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes()],
        end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes()],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
    }
}

module.exports = {
    convertToICS
}
