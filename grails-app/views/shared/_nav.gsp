<div class="nav">
    <ul id="menu" class="list">
        <li class="nav-li li-first-color">
            <div class="div-calum">Calum Oliphant</div>
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
            <g:link controller="patients">
                <div class="ui-icon icon-patient"></div>

                <div class="patient">PATIENTS</div>
            </g:link>
        </li>
        <li <g:if test="${controllerName == 'accounts'}">class="nav-li active"</g:if> <g:else>class="nav-li"</g:else>>
            <g:link controller="accounts" action="index">
                <div class="ui-icon icon-account"></div>

                <div class="account">ACCOUNTS</div>
            </g:link>
        </li>
    </ul>
</div>
