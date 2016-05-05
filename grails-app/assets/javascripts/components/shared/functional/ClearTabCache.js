function ClearTabCache() {

    /*
    example:

    1.this.trigger('clearTopTabsCache');

    2.this.trigger('clearTopTabsCache', {type: 'Group'});

    3.this.trigger('clearTopTabsCache', {type: ['Group', 'Report']});

     */

    this.attributes({
        TabElement: null,
        type: null,
        clearTabEvent: null
    });

    this.clearCache = function(e, option) {
        if(_.isEmpty(option) || _.includes(option.type, this.attr.type)) {
            $(this.attr.TabElement).data('loaded', false);
        }
    };

    this.after('initialize', function () {
        this.on(document, this.attr.clearTabEvent, this.clearCache);
    });
}

module.exports = ClearTabCache;

