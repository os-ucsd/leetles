// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAkFGFle654zUyL8YpWswZ705c31xcZQuE",
    authDomain: "leetles.firebaseapp.com",
    projectId: "leetles",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.collection("users").add({
    first: "Leetles",
    last:"Calendar",
    projects: {
        project_name:{
            calId: '111@g.com',
            users:{
                1:'Parsia',
                2:'Anvitaa'
            }
        }
    }
});