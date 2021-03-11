function listUpcomingEvents(calendarId, numRes = 10){
    gapi.client.calendar.events.list({
        'calendarId': calendarId,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': numRes,
        'orderBy': 'startTime'
    }).then(function(res){
        for(let i = 0; i < res.result.items.length; i++){
            console.log(`${res.result.items[i].summary}\n`);
        }
    }, function(error){
        console.error(JSON.stringify(error, null, 2));
    });
}

function getCalendars(){
    gapi.client.calendar.calendarList.list({
    }).then((res) => {
        for(let i = 0; i < res.result.items.length; i++){ // use res.result.whatever for it to work properly
            ApiHandler.appendText('content', `${res.result.items[i].summary}\n`);
        }
    });
}

function insertNewCalendar(name){
    const cal = gapi.client.calendar.calendars.insert({
        "resource": {
          "summary": name
        }
    });
    // .then((res) => res.result.id);

    return cal;
}

function insertNewEvent(calId, summary, start, end){
    gapi.client.calendar.events.insert({
        'calendarId': calId,
        'resource':{
            'summary': summary,
            'end': {
                'dateTime': end
            },
            'start': {
                'dateTime': start
            }
        }
    }).then((res) => {console.log("Event inserted\n"); console.log(res);});
}

function getEventsFromDay(calendarId, dayId, monthId, yearId){
    // probably need to pass in a month and a year in order to make a proper datestring

    // bounds for getting the event from the calendar
    let timeMin = new Date();
    timeMin.setDate(dayId);
    timeMin.setMonth(monthId);
    timeMin.setFullYear(yearId);
    timeMin.setHours(0, 0, 0);

    let timeMax = new Date();
    timeMax.setDate(dayId+1);
    timeMax.setMonth(monthId);
    timeMax.setFullYear(yearId);
    timeMax.setHours(0, 0, 0);

    console.log(ApiHandler.ISODateString(timeMin));
    console.log(ApiHandler.ISODateString(timeMax));

    // console.log(`DayId: ${dayId}, MonthId: ${monthId}`);
    // console.log(`MIN: ${timeMin} ; MAX: ${timeMax}`);
    // ApiHandler.appendText('content', `DayId: ${dayId}, MonthId: ${monthId}, YearId: ${yearId}\n`);
    // ApiHandler.appendText('content', `MIN: ${timeMin} ; MAX: ${timeMax}\n`);
    
    return gapi.client.calendar.events.list({
        'calendarId':calendarId,
        'maxResults':10,
        'timeMin':ApiHandler.ISODateString(timeMin),
        'timeMax':ApiHandler.ISODateString(timeMax)
    });
    // .then((res) => {
    //     console.log(res);
    //     for(let i = 0; i < res.result.items.length; i++){
    //         ApiHandler.appendText('content', `${res.result.items[i].summary}`);
    //     }
    // });
}