(function(APP, $) {
    window.APP = APP || {};
    const MODULE = 'util';

    $.fn.setCursorToTextEnd = function() {
        var $initialVal = this.val();
        this.val($initialVal);
    };

})(window.APP, jQuery);
