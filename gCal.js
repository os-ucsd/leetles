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
            console.log(res.result.items[i].summary);
        }
    }, function(error){
        console.error(JSON.stringify(error, null, 2));
    });
}