(function(APP) {
    window.APP = APP || {};
    const MODULE = 'notes';

    const selectors = {
        notesForm: $('#data-form'),
        titleInput: $('#title'),
        itemClass: 'single-item',
        editFormId: 'edit-form',
        editInputId: 'edit-input',
        editOkId: 'edit-ok'
    };

    const ref = firebase.database().ref('notes');
    const notes = ref.child('notes');

    notes.on('value', function(data) {
        renderNotes(data.val());
    }, function(error) {
        APP.notifications.displayError(error.code);
    });

    selectors.notesForm.on('submit', (event) => {
        event.preventDefault();
        let text = selectors.titleInput.val();
        addItem(text, () => {
            selectors.titleInput.val('');
        });
    });

    $(document).on('click', '.x', (e) => {
        let key = $(event.target).closest('.' + selectors.itemClass).data('key');
        removeItem(key);
    });

    $(document).on('click', '.edit', (e) => {
        let parent = $(event.target).closest('.' + selectors.itemClass);
        let key = parent.data('key');
        let currentTitle = parent.children('.item-title').text();
        let elementToAppend = parent.append('<span></span>');
        displayEdit(parent.find('.edit-holder'), currentTitle);
    });

    $(document).on('submit', '#' + selectors.editFormId, editItemHandler);
    $(document).on('click', '#' + selectors.editOkId, editItemHandler);

    function removeItem(key) {
        notes.update({
            [key]: null
        });
    }

    function editItemHandler(event) {
        event.preventDefault();
        let key = $(event.target).closest('.' + selectors.itemClass).data('key');
        let inputValue = $('#' + selectors.editInputId).val();
        editItem(key, inputValue, hideEdit);
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
        APP.render.component('notes', {
            notes: data,
            className: selectors.itemClass
        });
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
