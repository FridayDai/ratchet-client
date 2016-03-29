<%@ page import="grails.converters.JSON; com.ratchethealth.client.RatchetConstants" %>
<g:set var="mixedResult" value="${task?.mixedResult ? JSON.parse(task?.mixedResult) : [:]}"/>

<g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_NECK}">
    <g:set var="painToggle" value="20"/>
    <g:set var="level" value="['21', '23', '25']"/>
    <g:set var="percent" value="['17', '18', '19']"/>
    <g:set var="frequency" value="['22', '24', '26']"/>
    <g:set var="areaName" value="['Neck', 'Shoulder', 'Arm']"/>
</g:if>
<g:elseif test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_BACK}">
    <g:set var="painToggle" value="19"/>
    <g:set var="level" value="['20', '22', '24']"/>
    <g:set var="percent" value="['16', '17', '18']"/>
    <g:set var="frequency" value="['21', '23', '25']"/>
    <g:set var="areaName" value="['Back', 'Buttock', 'Leg']"/>
</g:elseif>


<div class="item-column">
    <g:each in="${level}" var="single">
        <span class="sub-item">
            <div class="score-number">
                ${mixedResult[single]}
            </div>
        </span>
    </g:each>
</div>

<div class="item-column">
    <g:each in="${percent}" var="single">
        <span class="sub-item">
            <div class="score-number">
                <g:if test="${mixedResult[painToggle]}">- -</g:if>
                <g:else>${mixedResult[single] ?: '0'}%</g:else>
            </div>
        </span>
    </g:each>
</div>

<div class="item-column">
    <g:each in="${frequency}" var="single">
        <span class="sub-item">
            <div class="score-number">
                ${RatchetConstants.PAIN_FREQUENCY[mixedResult[single]?.toInteger()]}
            </div>
        </span>
    </g:each>
</div>

<div class="item-column column-bottom">
    <g:each in="${areaName}" var="single">
        <span class="sub-item">
            <div class="score-label">
                ${single} Pain
            </div>
        </span>
    </g:each>
</div>



