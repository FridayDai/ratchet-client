<div class="nav">
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

        <li class="btn-li">
            <a href="#" id="assist-me" class="btn assist-me">
                <span>Assist Me</span>
            </a>
        </li>
    </ul>
</div>

<g:form class="assist-form ui-hidden" id="assist-form" name="assist-form">

    <div class="form-group">
        <label class="lbl-group">TITLE<span>*</span></label>
        <input id="assist-title" name="title" type="text" class="input-group title" placeholder="Please assist me on this" required/>
    </div>
    
    <div class="form-group">
        <label class="lbl-group">DESCRIPTION<span>*</span></label>
        <textarea id="assist-desc" name="description" type="text" class="input-group description" placeholder="Description here" required></textarea>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">NAME<span>*</span></label>
        <label class="lbl-input" id="assist-name">${request.session.firstName} ${request.session.lastName}</label>
    </div>

    <div class="form-group inline">
        <label class="lbl-group">EMAIL<span>*</span></label>
        <label class="lbl-input" id="assist-email">${request.session.email}</label>
    </div>

    <div class="form-group center">
        </label>A response will be made in 24 hours or less</label>
    </div>

</g:form>
