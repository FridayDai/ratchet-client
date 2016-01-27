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
                <div class="download"><g:link uri="/task/downloadPDF.pdf" params="[patientId: patientId, medicalRecordId: medicalRecordId, taskId: taskId]">↓Download PDF</g:link></div>
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
                            <% def firstSplit = "" %>
                            <% def secondSplit %>
                            <% if (Task?.nrsScore != null) { %>
                            <% firstSplit = Task?.nrsScore?.split(',') %>
                            <% } %>
                            <g:each in="${firstSplit}" var="num">
                                <% secondSplit = num?.trim().split(':') %>

                                    <g:if test="${secondSplit?.size() == 2}">
                                        <div class="score-wrap">
                                            <div class="score-num">${secondSplit[1]}</div>
                                            <g:if test="${RatchetConstants.TOOL_TYPE[Task.type] == RatchetConstants.TOOL_NAME_KOOS_JR || RatchetConstants.TOOL_TYPE[Task.type] == RatchetConstants.TOOL_NAME_HOOS_JR}">
                                                <div class="score-des">${StatusCodeConstants.TASK_OOS_JR_SCORE_LABEL[secondSplit[0]]}</div>
                                            </g:if>
                                            <g:else test="${RatchetConstants.TOOL_TYPE[Task.type] == RatchetConstants.TOOL_NAME_PROMIS}">
                                                <div class="score-des">${secondSplit[0]}</div>
                                            </g:else>
                                        </div>
                                    </g:if>
                            </g:each>
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
