<%@ page import="grails.converters.JSON; com.ratchethealth.client.RatchetConstants" %>
<g:set var="mixedResult" value="${JSON.parse(task?.mixedResult)}"/>

<g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_NECK}">
    <span class="sub-item">
        <div class="score-number">
           <g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['17']?: '0'}%</g:else>
        </div>
        <div class="score-label">
            Neck Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
           <g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['18']?: '0'}%</g:else>
        </div>
        <div class="score-label">
            Shoulder Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            <g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['19']?: '0'}%</g:else>
        </div>
        <div class="score-label">
            Arm Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            ${mixedResult['21']}
        </div>
        <div class="score-label">
            Neck Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
           ${mixedResult['23']}
        </div>
        <div class="score-label">
            Shoulder Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            ${mixedResult['25']}
        </div>
        <div class="score-label">
            Arm Pain
        </div>
    </span>

</g:if>

<g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_BACK}">
    <span class="sub-item">
        <div class="score-number">
            <g:if test="${mixedResult['19']}">- -</g:if><g:else>${mixedResult['16']?: '0'}%</g:else>
        </div>
        <div class="score-label">
            Back Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            <g:if test="${mixedResult['19']}">- -</g:if><g:else>${mixedResult['17']?: '0'}%</g:else>
        </div>
        <div class="score-label">
            Buttock Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            <g:if test="${mixedResult['19']}">- -</g:if><g:else>${mixedResult['18']?: '0'}%</g:else>
        </div>
        <div class="score-label">
            Leg Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            ${mixedResult['20']}
        </div>
        <div class="score-label">
            Back Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            ${mixedResult['22']}
        </div>
        <div class="score-label">
            Buttock Pain
        </div>
    </span>

    <span class="sub-item">
        <div class="score-number">
            ${mixedResult['24']}
        </div>
        <div class="score-label">
            Leg Pain
        </div>
    </span>
</g:if>
