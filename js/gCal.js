function listUpcomingEvents(numRes = 10){
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': numRes,
        'orderBy': 'startTime'
    }).then(function(res){
        for(let i = 0; i < res.result.items.length; i++){
            ApiHandler.appendText('content', `${res.result.items[i].summary}\n`);
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
    gapi.client.calendar.calendars.insert({
        "resource": {
          "summary": name
        }
    }).then((res) => {ApiHandler.appendText('content', `Created calendar ${name}\n`)});
}

function getEventsFromDay(dayId, monthId, yearId){
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

    // console.log(`DayId: ${dayId}, MonthId: ${monthId}`);
    // console.log(`MIN: ${timeMin} ; MAX: ${timeMax}`);
    ApiHandler.appendText('content', `DayId: ${dayId}, MonthId: ${monthId}, YearId: ${yearId}\n`);
    ApiHandler.appendText('content', `MIN: ${timeMin} ; MAX: ${timeMax}\n`);
    
    gapi.client.calendar.events.list({
        'calendarId':'primary',
        'maxResults':10,
        'timeMin':timeMin.toISOString(),
        'timeMax':timeMax.toISOString()
    }).then((res) => {
        console.log(res);
        for(let i = 0; i < res.result.items.length; i++){
            ApiHandler.appendText('content', `${res.result.items[i].summary}`);
        }
    });
}