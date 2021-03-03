const API_KEY = 'AIzaSyAkFGFle654zUyL8YpWswZ705c31xcZQuE';
const CLIENT_ID = '97275177500-t3juh1f0a6sq8gi1ufjjnsr4r931u9ra.apps.googleusercontent.com';
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly"; // Include more scopes by separating with spaces
const DISC_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

class ApiHandler{
    constructor(){
        this.#handleClientLoad();
        document.getElementById('authorize_button').addEventListener('click', this.authClick);
        document.getElementById('signout_button').addEventListener('click', this.signOutClick);
        this.finished("Constructor");
    }

    /**
     * Append a child text node to some node
     * 
     * @param {*} id ID of element to add child to
     * @param {*} text Text for text node
     */
    static appendText(id, text){
        var elem = document.getElementById(id);
        var textNode = document.createTextNode(text);
        elem.appendChild(textNode);
    }

    /**
     * Clear a node of all its content
     * 
     * @param {*} id ID of element to clear
     */
    static clearChildren(id){
        var elem = document.getElementById(id);
        while(elem.hasChildNodes()){
            elem.removeChild(elem.firstChild);
        }
        return 0;
    }

    /**
     * Change display style to 'block'
     * 
     * @param {*} id ID of element to change
     */
    static #changeDisplay(id, disp){
        document.getElementById(id).style.display = disp;
    }

    /**
     * Handle signing the user in
     * 
     * @param {*} event Click
     */
    authClick(event){
        console.log("Authorization");
        gapi.auth2.getAuthInstance().signIn().then(function(){
            document.getElementById('authorize_button').style.display = "none";
            document.getElementById('signout_button').style.display = "block";
            ApiHandler.#changeDisplay('functionality', 'block');
        });
    }

    /**
     * Handle signing the user out
     * 
     * @param {*} event Click
     */
    signOutClick(event){
        console.log("Signed Out");
        gapi.auth2.getAuthInstance().signOut().then(function(){
            document.getElementById('authorize_button').style.display = 'block';
            document.getElementById('signout_button').style.display = 'none';
            ApiHandler.clearChildren('content');
            ApiHandler.#changeDisplay('functionality', 'none');
        });
    }

    /**
     * Initialize Google API
     */
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

    /**
     * Load OAuth 2.0
     */
    #handleClientLoad(){
        gapi.load("client:auth2", this.#initClient);
    }

    finished(name){
        console.log(`Done, ${name}!`);
    }
}