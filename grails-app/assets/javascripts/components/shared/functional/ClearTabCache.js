function ClearTabCache() {

    /*
    example:

    1.this.trigger('clearTopTabsCache');

    2.this.trigger('clearTopTabsCache', {type: 'Group'});

    3.this.trigger('clearTopTabsCache', {type: ['Group', 'Report']});

     */

    this.clearCache = function(e, option) {
        if(_.isEmpty(option) || _.includes(option.type, this.type)) {
            this.$TabElement.data('loaded', false);
        }
    };

    this.initUiTab = function (tab, type) {
        this.$TabElement = $(tab);
        this.type = type;
    };

    this.after('initialize', function () {
        this.initUiTab(this.attr.TabElement, this.attr.type);
        this.on('clearTopTabsCache', this.clearCache);
    });
}

module.exports = ClearTabCache;

