const API_KEY = 'AIzaSyAkFGFle654zUyL8YpWswZ705c31xcZQuE';
const CLIENT_ID = '97275177500-t3juh1f0a6sq8gi1ufjjnsr4r931u9ra.apps.googleusercontent.com';
const SCOPES = "https://www.googleapis.com/auth/calendar"; // Include more scopes by separating with spaces
const DISC_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

class ApiHandler{
    auth = null; // GoogleAuth object for authorization processes

    constructor(){
        this.#handleClientLoad();
        document.getElementById('authorize_button').addEventListener('click', this.authClick);
        document.getElementById('signout_button').addEventListener('click', this.signOutClick);
        this.finished("Constructor");
    }

    /**
     * Gets the details of the current logged in user from Google
     * 
     * @param {GoogleAuth} user The GoogleAuth object of the user (this.auth)
     * 
     * @returns The profile of the user or 1 if not signed in
     */
    static getUserDetails(user){
        if(user.isSignedIn.get()){
            let profile = user.currentUser.get().getBasicProfile();
            console.log(`Did it work, ${profile.getName()}`);
            return profile;
        }else{
            return 1;
        }
    }

    /**
     * Append a child text node to some node
     * 
     * @param {*} id ID of element to add child to
     * @param {*} text Text for text node
     */
    static appendText(id, text){
        let elem = document.getElementById(id);
        let textNode = document.createTextNode(text);
        elem.appendChild(textNode);
    }

    /**
     * Clear a node of all its content
     * 
     * @param {*} id ID of element to clear
     */
    static clearChildren(id){
        let elem = document.getElementById(id);
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
        this.auth = gapi.auth2.getAuthInstance();

        this.auth.signIn().then(() => {
            ApiHandler.getUserDetails(this.auth);

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
        console.log("Sign Out");
        this.auth.getAuthInstance().signOut().then(() => {
            document.getElementById('authorize_button').style.display = 'block';
            document.getElementById('signout_button').style.display = 'none';
            ApiHandler.clearChildren('content');
            ApiHandler.#changeDisplay('functionality', 'none');
            this.auth = null;
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
        }).then(() => {
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