<div class="nav">
    <ul id="menu" class="list">
        <li class="login-info">
            <div class="user-photo">
                <img src="${assetPath(src: 'staff_profile.png')}">
            </div>
            <ul class="user-profile">
                <li>Welcome!</li>
                <li> <g:link class="" controller="Accounts" action="goUserProfile">Sid Feng</g:link></li>
            </ul>
        </li>
        %{--<li <g:if test="${controllerName == 'home'}">class="nav-li active"</g:if>--}%
            %{--<g:else>class="nav-li"</g:else>>--}%
            %{--<g:link controller="home" action="index">--}%
                %{--<div class="ui-icon icon-home"></div>--}%

                %{--<div class="home-title">HOME</div>--}%
            %{--</g:link>--}%
        %{--</li>--}%
        <li <g:if test="${controllerName == 'patients' || controllerName == 'treatment' || controllerName == 'singlePatient'}">class="nav-li active"</g:if>
            <g:else>class="nav-li"</g:else>>
            <g:link controller="patients" class="icon-patient">
                <div class="title">PATIENTS</div>
            </g:link>
        </li>
        <li <g:if test="${controllerName == 'accounts'}">class="nav-li active"</g:if> <g:else>class="nav-li"</g:else>>
            <g:link controller="accounts" action="index" class="icon-account">
                <div class="title">ACCOUNTS</div>
            </g:link>
        </li>
    </ul>
</div>
