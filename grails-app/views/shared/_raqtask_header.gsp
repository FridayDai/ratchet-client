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

    <div class="raq-info-container">
        <span class="raq-title">${Task.title}</span>

        <div class="raq-sub-info-panel">
            <div class="raq-patient-info">

                <span class="raq-status">Completed on <span class="raq-complete-time"><g:formatDate date="${new java.util.Date(Task.completeTime)}"
                                                                          timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                                                          format="MM/dd/yyyy"/></span></span>&nbsp;by

                <span class="raq-name">${Task.patientFirstName} ${Task.patientLastName}</span>&nbsp;

                (<span class="raq-id">ID: ${Task.patientId}</span>
                <g:if test="${Task?.birthday}">
                    <span class="raq-birthday"><i class="fa fa-birthday-cake"></i>${Utils.formatBirthday(Task?.birthday)}</span>)&nbsp;
                </g:if>


            <g:if test="${!download}">
                <span class="raq-download"><g:link uri="/task/downloadPDF.pdf"
                                              params="[patientId: patientId, lastName: Task.patientLastName, taskId: Task.taskId, toolName: Task.title, birthday: Task.birthday, medicalRecordId: medicalRecordId]">↓Download PDF</g:link></span>
            </g:if>
            </div>
        </div>
    </div>

    <div class="raq-result-info">
        <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(Task.type)}">
            <g:multipleScore in="${Task?.nrsScore}" type="${Task.type}" var="score">
                <span class="raq-score-wrap">
                    <div class="raq-score-des">${score[0]}:&nbsp;</div>
                    <div class="raq-score-num">${score[1].toLowerCase()}</div>
                </span>
            </g:multipleScore>
        </g:if>
    </div>
</div>
