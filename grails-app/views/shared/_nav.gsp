<div class="nav">
    <ul id="menu" class="list">
        <li <g:if test="${ controllerName == 'home'}">class="nav-li active"</g:if>
            <g:else>class="nav-li"</g:else>>
            <g:link controller="home" action="index">
                <div class="ui-icon icon-provider"></div>
                <span>HOME</span>
            </g:link>
        </li>
        <li <g:if test="${controllerName == 'patient' || controllerName == 'patientDetail'}">class="nav-li active"</g:if><g:else>class="nav-li"</g:else>>
            <g:link controller="patient" action="index">
                <div class="ui-icon icon-tool"></div>
                <span>PATIENTS</span>
            </g:link>
        </li>
        <li <g:if test="${controllerName == 'accounts'}">class="nav-li active"</g:if> <g:else>class="nav-li"</g:else>>
            <g:link controller="accounts" action="index">
                <div class="ui-icon icon-practice"></div>
                <span>ACCOUNTS</span>
            </g:link>
        </li>
    </ul>
</div>
