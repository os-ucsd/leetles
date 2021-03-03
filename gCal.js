function listUpcomingEvents(){
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(res){
        for(var i = 0; i < res.result.items.length; i++){
            ApiHandler.appendText('content', `${res.result.items[i].summary}\n`);
        }
    }, function(error){
        console.error(JSON.stringify(error, null, 2));
    });
}