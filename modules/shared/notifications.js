(function(APP) {
    window.APP = APP || {};
    const MODULE = 'notifications';

    const selectors = {
        errorHolder: $('.error-holder'),
        successHolder: $('.success-holder')
    };

    window.APP[MODULE] = {
        displayError,
        displaySuccess,
        selectors
    };

    function displayError(message) {
        selectors.successHolder.empty();
        selectors.errorHolder.html(wrapMessage(message));
    }

    function displaySuccess(message) {
        selectors.errorHolder.empty();
        selectors.successHolder.html(wrapMessage(message));
    }

    function wrapMessage(message) {
        return '<div class="holder-inner">' + message + '</div>'
    }


})(window.APP);
