<%@ page import="org.joda.time.LocalDate; org.joda.time.Days; org.joda.time.DateTime; org.joda.time.DateTimeZone; org.codehaus.groovy.grails.web.json.JSONObject; com.ratchethealth.client.StatusCodeConstants " %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <div class="box-item-content">

        <div class="item-fist middle-font">
            <label>ID:</label>
            <span class="number-font">${task?.id}</span>
        </div>

        <div class="item-title">
            ${task?.title}
        </div>

        <div class="item-datetime relative-sent-time">

            %{--<% DateTimeZone Vancouver = DateTimeZone.forID("America/Vancouver") %>--}%
            %{--<% LocalDate start = new LocalDate(task?.sendTime, Vancouver) %>--}%
            %{--<% LocalDate end = new LocalDate(task?.surgeryTime, Vancouver) %>--}%
            %{--<% def sentTimeDays = Days.daysBetween(start, end).getDays().abs() %>--}%

            <% def timeOffset = task?.sendTimeOffset%>
            <% def sentTimeDays = timeOffset/(24*60*60*1000)%>
            <g:if test="${task?.isBaseline}">
                <label class="numeral">BASELINE</label>
            </g:if>
            <g:elseif test="${sentTimeDays == 0}">
                <label class="numeral">On Surgery Day</label>
            </g:elseif>
            <g:else>
                <span class="numeral label-space number-font">${sentTimeDays.abs()}</span>
                <g:if test="${sentTimeDays == 1}">
                    <label class="label-space">Day</label>
                </g:if>
                <g:else>
                    <label class="label-space">Days</label>
                </g:else>
                <g:if test="${sentTimeDays > 0}">
                    <span class="numeral label-space number-font">After</span>
                </g:if>
                <g:else>
                    <span class="numeral label-space number-font">Before</span>
                </g:else>
                <label>Surgery</label>
            </g:else>
        </div>

        <div class="item-context">
            <p>${task?.description}</p>
        </div>

    </div>

    <div class="box-item-footer">

        <span class="task-date">
            <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete" || StatusCodeConstants.TASK_STATUS[task?.status] == "expired"}">
                <g:set var="taskDate" value="${task?.completeTime}"></g:set>
            </g:if>
            <g:else>
                <g:set var="taskDate" value="${task?.sendTime}"></g:set>
            </g:else>
            <g:if test="${taskDate}">
                <g:formatDate date="${taskDate}"
                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                              format="MMM dd, yyyy"></g:formatDate>
            </g:if>

        </span>

        <div class="footer-bottom">
            <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "overdue" || StatusCodeConstants.TASK_STATUS[task?.status] == "pending"}">
                <div class="item-notify">
                    <g:if test="${archivedStatus}">
                        <button class="btn btn-notify task-email disabled" data-task-id="${task?.id}" disabled>Click to notify</button>
                    </g:if>
                    <g:elseif test="${StatusCodeConstants.EMAIL_STATUS[PatientEmailStatus.toInteger() - 1] == "VERIFIED"}">
                        <button class="btn btn-notify task-email" data-task-id="${task?.id}">Click to notify</button>
                    </g:elseif>
                    <g:else>
                        <button class="btn btn-notify task-email div-hidden" data-task-id="${task?.id}">Click to notify</button>
                    </g:else>
                </div>
            </g:if>
            <g:elseif test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">
                <div class="complete-score">
                    <g:if test="${task?.otherScore}">
                        <% def firstSplit = "" %>
                        <% def secondSplit %>
                        <% if (task?.otherScore != null) { %>
                        <% firstSplit = task?.otherScore?.split(',') %>
                        <% } %>
                        <g:each in="${firstSplit}" var="num">
                            <% secondSplit = num?.trim().split(':') %>
                            <span class="score">
                                <g:if test="${secondSplit?.size() == 2}">
                                    <label class="score-number">${secondSplit[1]}</label><br>
                                    <g:if test="${task?.testId == 4 || task?.testId == 5}">
                                        <label class="capitalize">${secondSplit[0]} Result</label>
                                    </g:if>
                                    <g:else>
                                        <label>${StatusCodeConstants.TASK_OOS_SCORE[secondSplit[0]]}</label>
                                    </g:else>
                                </g:if>
                            </span>
                        </g:each>
                    </g:if>
                    <g:else>
                        <span class="score">
                            <label class="score-number">${task?.score}</label><br>
                            <label>Total Result</label>
                        </span>
                    </g:else>

                </div>
            </g:elseif>

        </div>

    </div>

</div>
