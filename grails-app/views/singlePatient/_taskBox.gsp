<%@ page import="com.ratchethealth.client.RatchetConstants; org.joda.time.LocalDate; org.joda.time.Days; org.joda.time.DateTime; org.joda.time.DateTimeZone; org.codehaus.groovy.grails.web.json.JSONObject; com.ratchethealth.client.StatusCodeConstants " %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <div class="box-item-content">

        <div class="item-fist middle-font">
            <label>ID:</label>
            <span class="id number-font">${task?.id}</span>
        </div>

        <div class="item-title">
            ${task?.title}
        </div>

        <g:if test="${task?.sendTimeOffset && task.sendTimeOffset != 'null'}">
        <div class="item-datetime relative-sent-time">
            <% Long timeOffset = Long.valueOf((task?.sendTimeOffset)?: 0)%>
            <% Long sentTimeDays = timeOffset/(24*60*60*1000)%>
            <g:if test="${sentTimeDays == 0}">
                <label class="numeral">On Surgery Day</label>
            </g:if>
            <g:else>
                <span class="numeral label-space number-font">${sentTimeDays.abs()}</span>
                <label class="label-space">${sentTimeDays.abs() == 1? 'Day' : 'Days'}</label>
                <span class="numeral label-space number-font">${sentTimeDays > 0? 'After' : 'Before'}</span>
                <label>Surgery</label>
            </g:else>
        </div>
        </g:if>

        <div class="item-context">
            <p>${task?.description}</p>
        </div>

    </div>

    <div class="box-item-footer">

        <span class="task-date">
            <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete" || StatusCodeConstants.TASK_STATUS[task?.status] == "expired"}">
                <g:set var="taskDate" value="${task?.completeTime}"/>
            </g:if>
            <g:else>
                <g:set var="taskDate" value="${task?.sendTime}"/>
            </g:else>
            <g:if test="${taskDate}">
                <g:formatDate date="${taskDate}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}" format="MMM dd, yyyy"/>
            </g:if>
        </span>
        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">
            <g:if test="${task?.testId == 2 || task?.testId == 3 || task?.testId == 11 || task?.testId == 12 || task?.testId == 13 || task?.testId == 17 || task?.testId == 15 || task?.testId == 1000}">
                <a href="/patients/${patientId}/treatments/${medicalRecordId}/task/${taskId}/result" target="_blank" class="view-results"><span>View Results</span></a>
            </g:if>
        </g:if>
        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] != "complete" && StatusCodeConstants.TASK_STATUS[task?.status] != "expired"}">
            <a href="${task?.patientPortalLink}/${accountId}/tasks/${task?.title}/${task?.invitationCode}" class="begin-task" target="_blank"></a>
        </g:if>
        <div class="begin-tip">
            <span>Begin</span>
        </div>
        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] != "complete" && StatusCodeConstants.TASK_STATUS[task?.status] != "expired"}">
            <span class="delete"></span>
        </g:if>
        <div class="delete-tip">
            <span>Delete</span>
        </div>

        <div class="footer-bottom">
            <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete" && !RatchetConstants.TOOL_TYPE_NO_SCORE.contains(task?.testId)}">
                <div class="complete-score">
                    <g:if test="${task?.otherScore}">
                        <% def firstSplit = "" %>
                        <% def secondSplit %>
                        <% if (task?.otherScore != null) { %>
                        <% firstSplit = task?.otherScore?.split(',') %>
                        <% } %>
                        <g:each in="${firstSplit}" var="num">
                            <% secondSplit = num?.trim().split(':') %>
                            <g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_KOOS || RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_HOOS}">
                                <span class="score">
                                    <g:if test="${secondSplit?.size() == 2}">
                                        <label class="score-number">${secondSplit[1]}</label><br>
                                        <label>${StatusCodeConstants.TASK_OOS_SCORE[secondSplit[0]]}</label>
                                    </g:if>
                                </span>
                            </g:if>
                            <g:else>
                                <span class="score score-2-columns">
                                    <g:if test="${secondSplit?.size() == 2}">
                                        <label class="score-number">${secondSplit[1]}</label><br>
                                        <g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_FAIRLEY_NASAL_SYMPTOM}">
                                            <label>${StatusCodeConstants.TASK_FAIRLEY_NASAL_SCORE_LABEL[secondSplit[0]]}</label>
                                        </g:if>
                                        <g:if test="${RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_KOOS_JR || RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_HOOS_JR}">
                                            <label>${StatusCodeConstants.TASK_OOS_JR_SCORE_LABEL[secondSplit[0]]}</label>
                                        </g:if>
                                        <g:else>
                                            <label class="capitalize">${secondSplit[0]} Result</label>
                                        </g:else>
                                    </g:if>
                                </span>
                            </g:else>
                        </g:each>
                    </g:if>
                    <g:else>
                        <span class="score">
                            <label class="score-number">${task?.score}</label><br>
                            <label>Total Result</label>
                        </span>
                    </g:else>

                </div>
            </g:if>

        </div>

    </div>

</div>
