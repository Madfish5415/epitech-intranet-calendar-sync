# Epitech Intranet Calendar Sync

![publish](https://github.com/madfish5415/epitech-intranet-calendar-sync/actions/workflows/publish.yml/badge.svg)


This tool allows you to sync your Epitech Intranet calendar with your Outlook Calendar.
It's mainly targeted at Epitech staff, but it should work for students too.

It uses the Epitech Intranet API to get your calendar events based on the teaching team of an event.

## Installation

You just have to pull the latest image from Docker Hub:

```bash
docker pull madfish5415/epitech-intranet-calendar-sync
```

## Usage

You can run the container with the following command:

```bash
docker run -d \
    --name epitech-intranet-calendar-sync \
    -e EPITECH_AUTOLOGIN_LINK="login_link" \
    -e EMAIL_LIST="john.doe@example.com;john.doe@example.fr"
    -p 3000:3000 \
    madfish5415/epitech-intranet-calendar-sync
```

Where:
- `EPITECH_AUTOLOGIN_LINK` is the link to your Epitech Intranet autologin page
- `EMAIL_LIST` is a list of emails separated by a semicolon (`;`) that will receive the calendar sync report

Then you can access the web interface at `http://localhost:3000`.

You just have to add a new calendar on outlook and set the URL to `http://localhost:3000/feed`

## Credits

- [madfish5415](https://github.com/madfish5415)
