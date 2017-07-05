/*
    templating rules:
    1. handlebars template script element naming: {{module}}-template
    2. dom element for the template to be appended to naming: {{module}}-container
    3. rendering component: APP.render.component('{{module}}', data);
*/

(function(APP) {
    window.APP = APP || {};
    const MODULE = 'render';

    window.APP[MODULE] = {
        component
    };

    function component(component, data, container) {
        let source = $('#' + component + '-template').html();
        let template = Handlebars.compile(source);
        let html = template(data);
        let destination = container || $('.' + component + '-container');
        destination.html(html);
    }

})(window.APP);
