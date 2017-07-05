(function(APP) {
    APP = APP || {};
    const MODULE = 'login';

    const selectors = {
        loginForm: $('#login-form'),
        logoutBtn: $('#logout-btn'),
        emailInput: $('#email'),
        passwordInput: $('#password')
    };

    firebase.auth().onAuthStateChanged((user) => {
        if (user) window.APP.notifications.displaySuccess('Logged in as: ' + user.email);
    });

    selectors.loginForm.on('submit', (event) => {
        event.preventDefault();
        login();
    });
    selectors.logoutBtn.on('click', () => {
        logout();
    });

    function logout() {
        firebase.auth().signOut();
        APP.notifications.selectors.errorHolder.empty();
        window.APP.notifications.displaySuccess('successfully logged out.');
    }

    function login() {
        let email = selectors.emailInput.val() || 'milos.milutinovic@htecgroup.com';
        let password = selectors.passwordInput.val() || 'passwordtest';
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            displayError(error.message);
        });
    }

})(window.APP);
