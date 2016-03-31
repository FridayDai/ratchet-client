<g:if test="${grailsApplication.config.Pingdom.real_user_monitor}">
    <script>
        var _prum = [['id', '56e242d9abe53d1416b58509'],
            ['mark', 'firstbyte', (new Date()).getTime()]];
        (function() {
            var s = document.getElementsByTagName('script')[0]
                    , p = document.createElement('script');
            p.async = 'async';
            p.src = '//rum-static.pingdom.net/prum.min.js';
            s.parentNode.insertBefore(p, s);
        })();
    </script>
</g:if>
