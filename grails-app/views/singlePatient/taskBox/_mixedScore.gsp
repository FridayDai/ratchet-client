<%@ page import="grails.converters.JSON; com.ratchethealth.client.RatchetConstants" %>
<g:set var="mixedResult" value="${JSON.parse(task?.mixedResult)}"/>

<g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_NECK}">
    <span class="score">
        <div class="score-number">
            <div class="score"><g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['17']}%</g:else></div>
            <div class="score">${mixedResult['21']}</div>
        </div>
        <div class="score-label">
            Neck Pain
        </div>
    </span>

    <span class="score">
        <div class="score-number">
            <div class="score"><g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['18']}%</g:else></div>
            <div class="score">${mixedResult['23']}</div>
        </div>
        <div class="score-label">
            Shoulder Pain
        </div>
    </span>

    <span class="score">
        <div class="score-number">
            <div class="score"><g:if test="${mixedResult['20']}">- -</g:if><g:else>${mixedResult['19']}%</g:else></div>
            <div class="score">${mixedResult['25']}</div>
        </div>
        <div class="score-label">
            Arm Pain
        </div>
    </span>
</g:if>

<g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_BACK}">
    <span class="score">
        <div class="score-number">
            <div class="score"><g:if test="${mixedResult['19']}">- -</g:if><g:else>${mixedResult['16']}%</g:else></div>
            <div class="score">${mixedResult['20']}</div>
        </div>
        <div class="score-label">
            Back Pain
        </div>
    </span>

    <span class="score">
        <div class="score-number">
            <div class="score"><g:if test="${mixedResult['19']}">- -</g:if><g:else>${mixedResult['17']}%</g:else></div>
            <div class="score">${mixedResult['22']}</div>
        </div>
        <div class="score-label">
            Buttock Pain
        </div>
    </span>

    <span class="score">
        <div class="score-number">
            <div class="score"><g:if test="${mixedResult['19']}">- -</g:if><g:else>${mixedResult['18']}%</g:else></div>
            <div class="score">${mixedResult['24']}</div>
        </div>
        <div class="score-label">
            Leg Pain
        </div>
    </span>
</g:if>
