<div class="sticky-header" id="layout-header">
    <div role="banner" class="header">
        <div class="toolbar">
            <div class="menu-block">
                <i class="fa fa-bars menu-icon"></i>
                <ul class="menu-list main-menu-list">
                    <g:if test="${!(request.session.accountManagement == false && request.session.groupSize == 0)}">
                        <li <g:if test="${controllerName == 'patients' || controllerName == 'treatment' || controllerName == 'singlePatient' || controllerName == 'patientDashboard'}">class="nav-li active"</g:if>
                            <g:else>class="nav-li"</g:else>>
                            <g:link controller="patients" class="icon-patient">
                                <i class="fa fa-bed icon patients-icon"></i>
                                <span class="title">Patients</span>
                            </g:link>
                        </li>
                    </g:if>

                    <g:if test="${!(request.session.accountManagement == false && request.session.groupSize == 0)}">
                        <li class="nav-li expendable-nav <g:if test="${controllerName == 'report'}">expended</g:if><g:else>collapsed</g:else>">
                            <a href="#" class="nav-button">
                                <i class="fa fa-bar-chart icon reports-icon"></i>
                                <span class="title">Reports</span>
                                <span class="expend-icon"></span>
                            </a>
                            <ul class="sub-nav-list">
                                <li class="sub-nav-li <g:if test="${controllerName == 'report' && actionName == 'getOutcomePage'}">active</g:if>">
                                    <a href="/reports/outcome">
                                        <span class="title">Outcome</span>
                                    </a>
                                </li>
                                <li class="sub-nav-li <g:if test="${controllerName == 'report' && actionName == 'renderTaskCompletionReport'}">active</g:if>">
                                    <a href="/reports/task-completion">
                                        <span class="title">Task Completion</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </g:if>

                    <g:if test="${request.session.accountManagement == true}">
                        <li <g:if test="${controllerName == 'accounts'}">class="nav-li active"</g:if>
                            <g:else>class="nav-li"</g:else>>
                            <a href="/accounts">
                                <i class="fa fa-users icon accounts-icon"></i>
                                <span class="title">Accounts</span>
                            </a>
                        </li>
                    </g:if>

                    <g:if test="${request.session.accountManagement == true}">
                        <li <g:if test="${controllerName == 'groups'}">class="nav-li active"</g:if>
                            <g:else>class="nav-li"</g:else>>
                            <a href="/groups">
                                <i class="fa fa-th-large icon groups-icon"></i>
                                <span class="title">Groups</span>
                            </a>
                        </li>
                    </g:if>
                    <li class="nav-li more-info-item">
                        <a target="_blank" href="http://www.ratchethealth.com/support/" class="more-info nav-icon-link">
                            <i class="fa fa-info-circle icon more-info-icon"></i>
                            <span class="title">More Info</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="logo-block">
                <a href="/" class="logo">
                    <img src="${assetPath(src: 'ratchet_health_logo.png')}">
                </a>
            </div>

            <div class="alert-block">
                <i class="fa fa-bell fa-lg alert-icon icon-button <g:if test="${!request.session.enableAlert}">hidden</g:if>" aria-hidden="true">
                    <span class="badge"></span>
                </i>
                <div class="icon-button-tip alert-icon-tip">
                    <span>Alerts</span>
                </div>
            </div>

            <div class="profile-block">
                <div class="client-name">
                    <g:if test="${request.session.isTesting}">
                        <span class="test-flag">test</span>
                    </g:if>
                    <span class="client-name">${request.session.clientName}</span>
                </div>
                <div class="username">
                    <span class="username-text">
                        <g:if test="${request.session.isDoctor == true}">
                            Dr. ${request.session.lastName}
                        </g:if>
                        <g:else>
                            ${request.session.firstName}
                        </g:else>
                    </span>
                </div>
                <ul class="menu-list profile-menu-list">
                    <li class="nav-li profile-item <g:if test="${controllerName == 'profile'}">active</g:if>">
                        <a href="/profile/${request.session.accountId}">
                            <i class="fa fa-user icon"></i>
                            <span class="title">Profile</span>
                        </a>
                    </li>
                    <li class="nav-li logout-item">
                        <a href="/logout" class="log-out" data-email="${request.session.email}">
                            <i class="fa fa-sign-out icon"></i>
                            <span class="title">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
