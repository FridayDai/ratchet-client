<div class="nav <g:if test="${announcement.status == 'active'}"> push-down</g:if>">
    <ul id="menu" class="list">
        <li <g:if test="${controllerName == 'profile'}">class="login-info nav-li active"</g:if>
            <g:else>class="login-info nav-li"</g:else>>
            <div class="user-photo">
                <img src="${assetPath(src: 'staff_profile.png')}">
            </div>
            <ul class="user-profile">
                <li>Welcome!</li>
                <li><g:link class="" controller="profile"
                            action="getProfile"
                            params="[accountId: request.session.accountId]">${request.session.firstName}  ${request.session.lastName}</g:link></li>
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
                <div class="title">Patients</div>
            </g:link>
        </li>
        <g:if test="${request.session.accountManagement == true}">
            <li <g:if test="${controllerName == 'accounts'}">class="nav-li active"</g:if>
                <g:else>class="nav-li"</g:else>>
                <g:link controller="accounts" action="index" class="icon-account">
                    <div class="title">Accounts</div>
                </g:link>
            </li>
        </g:if>
    </ul>
</div>
