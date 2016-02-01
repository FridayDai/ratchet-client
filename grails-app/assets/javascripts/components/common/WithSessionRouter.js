var ROUTER_NAME = 'RH_CLIENT_ROUTER';

var Router = null;
var defaultRoute = {
    currentPath: '',
    previousPath: ''
};

function saveRouter() {
    sessionStorage.setItem(ROUTER_NAME, JSON.stringify(Router));
}

function loadRouter() {
    return JSON.parse(sessionStorage.getItem(ROUTER_NAME));
}

(function initRouter() {
    if (!window.sessionStorage) {
        throw 'This browser don\'t support sessionStorage';
    }

    Router = _.defaults(loadRouter() || {}, defaultRoute);
})();

function WithSessionRouter() {
    this.setPath = function (path) {
        Router.currentPath = path;
    };

    this.__onSessionUnload = function () {
        Router.previousPath = Router.currentPath;
        Router.currentPath = '';

        saveRouter();
    };

    this.getLastPath = function () {
        return Router.previousPath;
    };

    this.saveParams2Router = function (page, params) {
        Router[page] = params;
    };

    this.getParamsFromRoute = function (page) {
        return Router[page];
    };

    this.after('initialize', function () {
        $(window).unload(_.bind(this.__onSessionUnload, this));
    });
}

module.exports = WithSessionRouter;
