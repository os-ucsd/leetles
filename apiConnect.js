// Client ID and API key from the Developer Console
var CLIENT_ID = '97275177500-t3juh1f0a6sq8gi1ufjjnsr4r931u9ra.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAkFGFle654zUyL8YpWswZ705c31xcZQuE';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var authorized = false;

function main(){
  listUpcomingEvents();
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorized = true;
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      // listUpcomingEvents();
    } else {
      authorized = false;
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
      clearContent('content');
    }
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.--------------------------------------
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(id, message) {
    var pre = document.getElementById(id);
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Clears all child nodes within a tag, essentially clearing the
 * content.
 * 
 * @param {string} id The ID of the tag to be cleared
 */
function clearContent(id){
  var content = document.getElementById(id);
  while(content.hasChildNodes()){
    content.removeChild(content.firstChild);
  }
}
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  return gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('content', 'Upcoming events:');
  
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre('content', event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('content', 'No upcoming events found.');
    }
  });
}

function newCalendar(name){
  gapi.client.calendar.calendars.insert({
    "resource":{
      "summary":name
    }
  }).then(function(res){
    console.log(res);
  });
}