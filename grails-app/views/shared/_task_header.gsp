<%@ page import="com.ratchethealth.client.StatusCodeConstants; com.ratchethealth.client.RatchetConstants" %>
<%@ page import="com.ratchethealth.client.Utils" %>
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

        <div class="sub-info-panel">
            <span class="status">Completed on <span class="complete-time"><g:formatDate date="${new java.util.Date(Task.completeTime)}"
                                                                                            timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                                                                            format="MM/dd/yyyy"/></span></span>&nbsp;by

            <span class="name">${Task.patientFirstName} ${Task.patientLastName}</span>
            (<span class="id">ID: ${Task.patientId}</span>
                <g:if test="${Task?.birthday}">
                    <span class="birthday"><i class="fa fa-birthday-cake icon" aria-hidden="true"></i>${Utils.formatBirthday(Task?.birthday)}</span>)
                </g:if>


                <g:if test="${!download}">
                    <span class="download"><g:link uri="/task/downloadPDF.pdf"
                                                   params="[patientId: patientId, lastName: Task.patientLastName, taskId: Task.taskId, toolName: Task.title, birthday: Task.birthday, medicalRecordId: medicalRecordId]">↓Download PDF</g:link></span>
                </g:if>
        </div>
    </div>

    <div class="result-info">
        <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(Task.type)}">
            <g:multipleScore in="${Task?.nrsScore}" type="${Task.type}" var="score">
                <span class="score-wrap">
                    <div class="score-des">${score[0]}:&nbsp;</div>
                    <div class="score-num">${score[1].toLowerCase()}</div>
                </span>
            </g:multipleScore>
        </g:if>
        <g:else>
            <span class="score-wrap">
                <div class="score-des">Total Result:&nbsp;</div>
                <div class="score-num">${Task.score}</div>
            </span>
        </g:else>
    </div>
</div>
