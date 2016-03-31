require('velocity');
require('velocity-ui');

$.Velocity
    .RegisterEffect("ratchet.slideDownIn", {
        defaultDuration: 700,
        calls: [
            [ {
                opacity: [ 1, 0 ],
                translateY: [ 0, -80 ],
                translateZ: 0
            } ]
        ]
    }).RegisterEffect("ratchet.slideUpOut", {
    defaultDuration: 700,
    calls: [
        [ {
            opacity: [ 0, 1 ],
            translateY: -80,
            translateZ: 0
        } ]
    ],
    reset: { translateY: 0 }
}).RegisterEffect("ratchet.bounceIn", {
    defaultDuration: 500,
    calls: [
        [ { opacity: [ 1, 0 ], scaleX: [ 1.05, 0.3 ], scaleY: [ 1.05, 0.3 ] }, 0.40 ],
        [ { scaleX: 0.9, scaleY: 0.9, translateZ: 0 }, 0.20 ],
        [ { scaleX: 1, scaleY: 1 }, 0.50 ]
    ]
}).RegisterEffect("ratchet.expandOut", {
    defaultDuration: 500,
    calls: [
        [ {
            opacity: [ 0, 1 ],
            transformOriginX: [ "50%", "50%" ],
            transformOriginY: [ "50%", "50%" ],
            scaleX: 0.5,
            scaleY: 0.5,
            translateZ: 0
        } ]
    ],
    reset: { scaleX: 1, scaleY: 1 }
});
