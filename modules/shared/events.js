(function(APP) {
    APP = APP || {};
    const MODULE = 'events';

    window.APP[MODULE] = {
        add
    };

    function add(eventName, selector, handler, onDocument) {
        if (onDocument) {
            $(document).on(eventName, selector, handler);
        } else {
            $(selector).on(eventName, handler);
        }

        return {
            destroy: () => {
                $(document).off(eventName, selector);
            }
        }
    }

})(window.APP);
