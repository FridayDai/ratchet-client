function CheckArchivedWindowSize() {
    this.attributes({
        contentSelector: '.content'
    });

    this.checkArchivedWindowSize = function () {
        var $content = this.select('contentSelector');
        if ($content.hasClass('archived') && $('#main').outerHeight() < $(window).height()) {
            var topHeight = this.$node.offset().top;
            var contentHeight = $(window).height() - topHeight - $('.footer').height();

            $content.height(contentHeight);
        }
    };

    this.after('initialize', function () {
        this.checkArchivedWindowSize();
    });
}

module.exports = CheckArchivedWindowSize;
