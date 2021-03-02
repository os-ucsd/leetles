function authClick(event){
    gapi.auth2.getAuthInstance().signIn();
}  

function signOutClick(event){

}

class ApiHandler{
    #API_KEY = '';
    #CLIENT_ID = '';
    #SCOPES = "https://www.googleapis.com/auth/calendar.readonly"; // Include more scopes by separating with spaces
    #DISC_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    constructor(){
        this.#API_KEY = 'AIzaSyAkFGFle654zUyL8YpWswZ705c31xcZQuE';
        this.#CLIENT_ID = '97275177500-t3juh1f0a6sq8gi1ufjjnsr4r931u9ra.apps.googleusercontent.com';
    }

    authClick(event){
        gapi.auth2.getAuthInstance().signIn();
    }

    signOutClick(event){
        gapi.auth2.getAuthInstance().signOut();
    }

    #initClient(){
        gapi.client.init({
            apiKey: this.#API_KEY,
            clientId: this.#CLIENT_ID,
            discoveryDocs: this.#DISC_DOCS,
            scope: this.#SCOPES
        }).then(function(){
            console.log("Done");
        }, function(error){
            console.error(JSON.stringify(error, null, 2));
        });
    }
}