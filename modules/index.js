(function(APP) {
    window.APP = APP || {};
    const MODULE = 'core';

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBpAkViRPyrinHf48DDPAGo9dPOpvqKJJI",
        authDomain: "notes-276e7.firebaseapp.com",
        databaseURL: "https://notes-276e7.firebaseio.com",
        projectId: "notes-276e7",
        storageBucket: "notes-276e7.appspot.com",
        messagingSenderId: "766349910584"
    };

    firebase.initializeApp(config);

})(window.APP);
