<%@ page import="com.ratchethealth.client.StatusCodeConstants; com.ratchethealth.client.RatchetConstants" %>
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
        <div class="title">${Task.title} Results</div>

        <div class="sub-info-panel">
            <g:if test="${!download}">
                <div class="download"><g:link uri="/task/downloadPDF.pdf"
                                              params="[patientId: patientId, lastName: Task.patientLastName, taskId: Task.taskId, toolName: Task.title, birthday: Task.birthday, medicalRecordId: medicalRecordId]">↓Download PDF</g:link></div>
            </g:if>
            <div class="patient-info">
                <span class="name">${Task.patientFirstName} ${Task.patientLastName}</span>
                |
                <span class="id">ID: ${Task.patientId}</span>
            </div>

            <div class="questionnaire-info">
                <span class="status">Completed - <g:formatDate date="${new java.util.Date(Task.completeTime)}"
                                                               timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                                               format="MMM d, yyyy"/></span>

                <g:if test="${!RatchetConstants.TOOL_TYPE_NO_SCORE.contains(Task.type)}">
                    <span class="score">
                        <div class="divider"></div>

                        <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(Task.type)}">
                            <g:multipleScore in="${Task?.nrsScore}" type="${Task.type}" var="score">
                                <span class="score-wrap">
                                    <div class="score-num">${score[1]}</div>

                                    <div class="score-des">${score[0]}</div>
                                </span>
                            </g:multipleScore>
                        </g:if>
                        <g:else>
                            <div class="score-num">${Task.score}</div>

                            <div class="score-des">Total Result</div>
                        </g:else>
                    </span>
                </g:if>
            </div>
        </div>
    </div>
</div>
