<div class="nav">
    <ul id="menu" class="list">
        <li class="client-name">${request.session.clientName}</li>
        <li <g:if test="${controllerName == 'profile'}">class="login-info nav-li active"</g:if>
            <g:else>class="login-info nav-li"</g:else>>
            %{--<a class="" controller="profile"--}%
            %{--action="getProfile"--}%
            %{--params="[accountId: request.session.accountId]">--}%
            <a href="/profile/${request.session.accountId}">
                <div class="user-photo">
                    <img src="${assetPath(src: 'user.png')}">
                </div>
                <ul class="user-profile">
                    <li>Welcome!</li>
                    <li><span><g:if
                            test="${request.session.isDoctor == true}">Dr. ${request.session.lastName}</g:if><g:else>${request.session.firstName}</g:else></span>
                    </li>
                </ul>
            </a>
        </li>
    %{--<li <g:if test="${controllerName == 'home'}">class="nav-li active"</g:if>--}%
    %{--<g:else>class="nav-li"</g:else>>--}%
    %{--<g:link controller="home" action="index">--}%
    %{--<div class="ui-icon icon-home"></div>--}%

    %{--<div class="home-title">HOME</div>--}%
    %{--</g:link>--}%
    %{--</li>--}%
        <g:if test="${!(request.session.accountManagement == false && request.session.groupSize == 0)}">
            <li <g:if test="${controllerName == 'patients' || controllerName == 'treatment' || controllerName == 'singlePatient'}">class="nav-li active"</g:if>
                <g:else>class="nav-li"</g:else>>
                <g:link controller="patients" class="icon-patient">
                    <div class="title">Patients</div>
                </g:link>
            </li>
        </g:if>

        <g:if test="${request.session.accountManagement == true}">
            <li <g:if test="${controllerName == 'accounts'}">class="nav-li active"</g:if>
                <g:else>class="nav-li"</g:else>>
                <a href="/accounts" class="icon-account">
                    <div class="title">Accounts</div>
                </a>
            </li>
        </g:if>

        <g:if test="${request.session.accountManagement == true}">
            <li <g:if test="${controllerName == 'groups'}">class="nav-li active"</g:if>
                <g:else>class="nav-li"</g:else>>
                <a href="/groups" class="icon-group">
                    <div class="title">Groups</div>
                </a>
            </li>
        </g:if>

        <li class="btn-li">
            <a href="#" id="assist-me" class="btn assist-me">
                <span>Assist Me</span>
            </a>
        </li>

        <li class="btn-bottom">
            <a href="/logout" class="log-out">
                <span class="btn-logout">Logout</span>
            </a>
        </li>

    </ul>
</div>

<form action="/assist-me" method="post" id="assist-form" class="assist-form ui-hidden" name="assist-form" novalidate="novalidate">
    <div class="form-group title">
        <label class="lbl-group">TITLE<span>*</span></label>
        <input id="assist-title" name="title" type="text" class="input-group title"
               placeholder="Please assist me on this" required/>
    </div>

    <div class="form-group">
        <label class="lbl-group">DESCRIPTION<span>*</span></label>
        <textarea id="assist-desc" name="desc" type="text" class="input-group description"
                  placeholder="Description here" required></textarea>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">NAME<span>*</span></label>
        <label class="lbl-input" id="assist-full-name" data-first="${request.session.firstName}"
               data-last="${request.session.lastName}">
            <g:if test="${request.session.isDoctor == true}">Dr.</g:if> ${request.session.firstName} ${request.session.lastName}</label>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">EMAIL<span>*</span></label>
        <label class="lbl-input" id="assist-email">${request.session.email}</label>
    </div>

    <div class="form-group required required-width"><span>*</span>Required field</div>

    <div class="align-center assist-tip">
        </label>We will respond to you as soon as we can!</label>
    </div>
</form>
