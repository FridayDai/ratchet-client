<div class="sticky-header" id="layout-header">
    <div role="banner" class="header">
        <div class="toolbar">
            <div class="pull-left">
                <a href="/" class="logo">
                    <img src="${assetPath(src: 'ratchet_health_logo.png')}">
                </a>
            </div>

            <div class="pull-right">
                <i class="fa fa-bell fa-lg alert-icon icon-button <g:if test="${!request.session.enableAlert}">hidden</g:if>" aria-hidden="true">
                    <span class="badge"></span>
                </i>
                <div class="icon-button-tip alert-icon-tip">
                    <span>Alerts</span>
                </div>
            </div>
        </div>
    </div>
</div>
