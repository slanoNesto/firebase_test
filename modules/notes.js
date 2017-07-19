(function(APP) {
    window.APP = APP || {};
    const MODULE = 'notes';

    const selectors = {
        notesForm: $('#data-form'),
        titleId: 'title',
        itemClass: 'single-item',
        editFormId: 'edit-form',
        editInputId: 'edit-input',
        editOkId: 'edit-ok'
    };
    const events = {};
    const ref = firebase.database().ref('notes');
    const notes = ref.child('notes');

    APP.router.route('/notes', function() {
        init();
    }, function() {
        events.addSubmit.destroy();
        events.xClick.destroy();
        events.editClick.destroy();
        events.editSubmit.destroy();
        notes.off('value');
    });

    function init() {
        events.addSubmit = APP.events.add('submit', selectors.notesForm, addNoteSubmitHandler, true);
        events.xClick = APP.events.add('click', '.x', xClickHandler, true);
        events.editClick = APP.events.add('click', '.edit', editClickHandler, true);
        events.editSubmit = APP.events.add('submit', '#' + selectors.editFormId, editItemHandler, true);

        notes.on('value', function(data) {
            renderNotes(data.val());
        }, function(error) {
            APP.notifications.displayError(error.code);
        });
    }

    function addNoteSubmitHandler(event) {
        event.preventDefault();
        let inputEl = $('#' + selectors.titleId);
        let text = inputEl.val();
        addItem(text, function() {
            inputEl.val('');
        });
    }

    function xClickHandler(event) {
        let key = $(event.target).closest('.' + selectors.itemClass).data('key');
        removeItem(key);
    }

    function editClickHandler(event) {
        let parent = $(event.target).closest('.' + selectors.itemClass);
        let key = parent.data('key');
        let currentTitle = parent.children('.item-title').text();
        let elementToAppend = parent.append('<span></span>');
        displayEdit(parent.find('.edit-holder'), currentTitle);
    }

    function editItemHandler(event) {
        event.preventDefault();
        let key = $(event.target).closest('.' + selectors.itemClass).data('key');
        let inputValue = $('#' + selectors.editInputId).val();
        editItem(key, inputValue, hideEdit);
    }

    function removeItem(key) {
        APP.dialog.confirm(function() {
            return notes.update({
                [key]: null
            });
        }, 'You will not be able to recover this note.');
    }

    function editItem(key, title, cb) {
        if (!title) return;
        notes.update({
            [key]: {title}
        }).then(() => {
            if (cb) cb();
        });
    }

    function addItem(text, cb) {
        if (!text) return;
        notes.push({title: text}).then(() => {
            if (cb) cb();
        });
    }

    function renderNotes(data) {
        let view = $('#main-view');
        APP.render.component('notes', {
            notes: data,
            className: selectors.itemClass
        }, view);
    }

    function hideEdit(elements) {
        $('.item-title, .controls').show();
        $('#' + selectors.editFormId).remove();
    }

    function displayEdit(element, currentTitle) {
        hideEdit();

        element.siblings('.item-title, .controls').hide();

        APP.render.component('edit-form', {
            currentTitle,
            elementId: selectors.editFormId,
            inputId: selectors.editInputId,
            editOkId: selectors.editOkId
        }, element);

        setTimeout(() => {
            $('#' + selectors.editInputId).focus().setCursorToTextEnd();
        });
    }

})(window.APP);
