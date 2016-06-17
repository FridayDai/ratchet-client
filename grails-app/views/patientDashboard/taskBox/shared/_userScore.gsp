<%@ page import="grails.converters.JSON; com.ratchethealth.client.RatchetConstants" %>
<g:set var="mixedResult" value="${task?.mixedResult ? JSON.parse(task?.mixedResult) : [:]}"/>

<g:if test="${task?.title == 'Discharge Plan'}">
    <g:set var="score" value="['', 'Home', 'Home with support', 'SNF']"/>

    <span class="sub-item">
        <span class="score-label">Discharge plan:</span>

        <span class="score-number">${score[mixedResult['question1'].toInteger()]}</span>
    </span>
</g:if>

<g:elseif test="${task?.title == 'SNF'}">
    <g:set var="report" value="['', 'Yes', 'No']"/>
    <span class="sub-item">
        <span class="score-label">Report received:</span>

        <span class="score-number">${report[mixedResult['question1'].toInteger()]}</span>
    </span>
    <span class="sub-item">
        <span class="score-label">LOS:</span>

        <span class="score-number">${mixedResult['question2']}</span>
    </span>
</g:elseif>
