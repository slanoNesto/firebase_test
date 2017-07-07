(function(APP) {
    APP = APP || {};
    const MODULE = 'login';

    const selectors = {
        loginFormId: 'login-form',
        logoutBtnId: 'logout-btn',
        emailInputId: 'email',
        passwordInputId: 'password'
    };

    const events = {};

    APP.router.route('/login', function() {
        init();
    }, function() {
        events.loginSubmit.destroy();
        events.logoutSubmit.destroy();
    });

    function init() {
        renderView();
        events.loginSubmit = APP.events.add('submit', '#' + selectors.loginFormId, loginSubmitHandler);
        events.logoutSubmit = APP.events.add('click', '#' + selectors.logoutBtnId, logoutSubmitHandler);
    }

    function loginSubmitHandler(event) {
        event.preventDefault();
        login();
    }
    function logoutSubmitHandler(event) {
        logout();
    }

    function logout() {
        firebase.auth().signOut();
        APP.notifications.selectors.errorHolder.empty();
        window.APP.notifications.displaySuccess('successfully logged out.');
    }

    function login() {
        let email = $('#' + selectors.emailInputId).val() || 'milos.milutinovic@htecgroup.com';
        let password = $('#' + selectors.passwordInputId).val() || 'passwordtest';
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            displayError(error.message);
        });
    }

    function renderView() {
        let view = $('#main-view');
        APP.render.component('login', {}, view);
    }

})(window.APP);
