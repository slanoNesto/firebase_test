(function(APP, $) {
    window.APP = APP || {};
    const MODULE = 'dialog';

    APP[MODULE] = {
        confirm
    };

    function confirm(callback, text) {
        swal({
            title: 'Are you sure?',
            text: text || 'You will not be able to recover this.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: true
        },
        function(){
            callback();
        });
    }

})(window.APP, jQuery);
