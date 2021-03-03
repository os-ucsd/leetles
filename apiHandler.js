API_KEY = 'AIzaSyAkFGFle654zUyL8YpWswZ705c31xcZQuE';
CLIENT_ID = '97275177500-t3juh1f0a6sq8gi1ufjjnsr4r931u9ra.apps.googleusercontent.com';
SCOPES = "https://www.googleapis.com/auth/calendar.readonly"; // Include more scopes by separating with spaces
DISC_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

class ApiHandler{
    constructor(){
        this.#handleClientLoad();
        document.getElementById('authorize_button').addEventListener('click', this.authClick);
        document.getElementById('signout_button').addEventListener('click', this.signOutClick);
        this.finished("Constructor");
    }

    static #unlockFunctionality(id){
        document.getElementById(id).style.display = 'block';
    }

    authClick(event){
        console.log("Authorization");
        gapi.auth2.getAuthInstance().signIn().then(function(){
            document.getElementById('authorize_button').style.display = "none";
            document.getElementById('signout_button').style.display = "block";
            ApiHandler.#unlockFunctionality('functionality');
        });
    }

    signOutClick(event){
        console.log("Signed Out");
        gapi.auth2.getAuthInstance().signOut().then(function(){
            document.getElementById('authorize_button').style.display = 'block';
            document.getElementById('signout_button').style.display = 'none';
        });
    }

    #initClient(){
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISC_DOCS,
            scope: SCOPES
        }).then(function(){
            console.log("Init done");
        }, function(error){
            console.error(JSON.stringify(error, null, 2));
        });
    }

    #handleClientLoad(){
        gapi.load("client:auth2", this.#initClient);
    }

    finished(name){
        console.log(`Done, ${name}!`);
    }
}