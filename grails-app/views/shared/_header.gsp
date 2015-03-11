<div class="sticky-header">
    <g:if test="${maintenance == 'true'}">
        <div role="banner" class="maintenance">
            <span class="attention">Attention:</span> Ratchet Health will be performing network maintenace between START-TIME & END-TIME UTC.
            <a href="#" class="btn-close"> </a>
        </div>
    </g:if>

    <div role="banner" class="header">
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
