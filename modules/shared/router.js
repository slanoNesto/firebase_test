(function(APP) {
    APP = APP || {};
    const MODULE = 'router';

    const root = null;
    const useHash = true;
    const navigo = new Navigo(root, useHash);

    window.APP[MODULE] = {
        route,
        navigate
    };

    setTimeout(() => {
        resolveNavigo(navigo);
    });

    function resolveNavigo(navigo) {
        navigo
            .on(function() {

            })
            .notFound(function() {
                console.log('not found');
            })
            .resolve();

            navigo.getLinkPath = function (link) {
                return link.getAttribute('href');
            };
    }

    function route(route, handler, leave) {
        navigo.on(route, handler, {
            before: function(done, params) {
                // doing some async operation
                done();
            },
            after: function(params) {
                // after resolving
            },
            leave: function(params) {
                if (leave) leave(params);
            }
        });
        navigo.updatePageLinks();
    }

    function navigate(route) {
        navigo.navigate(route);
    }

})(window.APP);
