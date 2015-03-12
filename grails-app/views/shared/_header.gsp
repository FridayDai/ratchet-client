<div class="sticky-header">
    <g:if test="${announcement.status == 'active'}">
        <div role="banner" class="maintenance ${announcement.background}">
            <span class="attention">Attention:</span> ${announcement.announcement}
            <a href="#" class="btn-close"> </a>
        </div>
    </g:if>

    <div role="banner" class="header <g:if test="${announcement.status == 'active'}"> push-down</g:if>">
        <div class="toolbar">
            <div class="pull-left">
                <a href="/" class="logo">
                    <img src="${assetPath(src: 'ratchet_health_logo.png')}">
                </a>
                <div class="client-logo">
                    CLIENT PORTAL
                </div>
            </div>
        </div>
    </div>
</div>
