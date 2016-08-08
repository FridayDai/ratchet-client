<%@ page import="com.ratchethealth.client.StatusCodeConstants; com.ratchethealth.client.RatchetConstants" %>
<%@ page import="com.ratchethealth.client.Utils" %>
<%@ page import="grails.converters.JSON" %>
<div class="sticky-header">
    <div role="banner" class="header">
        <div class="toolbar">
            <div class="pull-left">
                <a href="/" class="logo">
                    <img src="${assetPath(src: 'ratchet_health_logo.png', absolute: true)}">
                </a>
            </div>
        </div>
    </div>

    <div class="info-container">
        <span class="title">${Task.title}</span>

        <span class="sub-info-panel">
            <span class="status">Completed on <span class="complete-time"><g:formatDate date="${new java.util.Date(Task.completeTime)}"
                                                                                            timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                                                                            format="MM/dd/yyyy"/></span></span>&nbsp;by

            <span class="name">${Task.patientFirstName} ${Task.patientLastName}</span>

                <g:if test="${Task?.birthday}">
                    (<span class="id">ID: ${Task.patientId}</span>
                    <span class="birthday"><i class="fa fa-birthday-cake icon" aria-hidden="true"></i>${Utils.formatBirthday(Task?.birthday)}</span>)
                </g:if>
                <g:else>
                    (<span class="id only-id">ID: ${Task.patientId}</span>)
                </g:else>

                <g:if test="${!download}">
                    <span class="download"><g:link uri="/task/downloadPDF.pdf"
                                                   params="[patientId: patientId, lastName: Task.patientLastName, taskId: Task.taskId,
                                                            toolName: Task.title, birthday: Task.birthday,
                                                            generatedPdfKey:Task.pdfKey, medicalRecordId: medicalRecordId]">↓Download PDF</g:link></span>
                </g:if>
        </span>
    </div>

    <div class="result-info">
        <g:if test="${!RatchetConstants.TOOL_TYPE_NO_SCORE.contains(Task.type)}">
            <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(Task.type)}">
                <g:multipleScore in="${Task?.nrsScore}" type="${Task.type}" var="score">
                    <span class="score-wrap">
                        <div class="score-des">${score[0]}:&nbsp;</div>
                        <div class="score-num">${score[1].toLowerCase()}</div>
                    </span>
                </g:multipleScore>
            </g:if>
            <g:elseif test="${RatchetConstants.TOOL_TYPE_MiXED_RESULT.contains(Task.type)}">
                <g:set var="mixedResult" value="${Task?.mixedResult ? JSON.parse(Task?.mixedResult) : [:]}"/>

                <g:if test="${Task?.title == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_NECK}">
                    <g:set var="painToggle" value="20"/>
                    <g:set var="level" value="['21', '23', '25']"/>
                    <g:set var="percent" value="['17', '18', '19']"/>
                    <g:set var="frequency" value="['22', '24', '26']"/>
                    <g:set var="areaName" value="['Neck', 'Shoulder', 'Arm']"/>
                </g:if>
                <g:elseif test="${Task?.title == RatchetConstants.TOOL_NAME_PAIN_CHART_REFERENCE_BACK}">
                    <g:set var="painToggle" value="19"/>
                    <g:set var="level" value="['20', '22', '24']"/>
                    <g:set var="percent" value="['16', '17', '18']"/>
                    <g:set var="frequency" value="['21', '23', '25']"/>
                    <g:set var="areaName" value="['Back', 'Buttock', 'Leg']"/>
                </g:elseif>

                <g:each in="${areaName}" var="single" status="i">
                    <span class="score-wrap">
                        <span class="score-des">${single}:&nbsp;</span>

                        <span class="score-num">${mixedResult[level[i]]},&nbsp;</span>
                        <span class="score-num"><g:if test="${mixedResult[painToggle]}">- -</g:if><g:else>${mixedResult[percent[i]] ?: '0'}%</g:else>,&nbsp;</span>
                        <span class="score-num">${mixedResult[frequency[i]] ? RatchetConstants.PAIN_FREQUENCY[mixedResult[frequency[i]]?.toInteger()] : ''}</span>
                    </span>
                </g:each>
            </g:elseif>
            <g:else>
                <span class="score-wrap">
                    <div class="score-des">Result:&nbsp;</div>
                    <div class="score-num">${Task.score}</div>
                </span>
            </g:else>
        </g:if>
    </div>
</div>
