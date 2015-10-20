define(

    [
        './lib/advice',
        './lib/component',
        './lib/compose',
        './lib/debug',
        './lib/logger',
        './lib/registry',
        './lib/utils'
    ],

    function(advice, component, compose, debug, logger, registry, utils) {
        'use strict';

        return {
            advice: advice,
            component: component,
            compose: compose,
            debug: debug,
            logger: logger,
            registry: registry,
            utils: utils
        };

    }
);
