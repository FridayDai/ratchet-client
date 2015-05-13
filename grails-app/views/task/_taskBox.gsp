<%@ page import="org.joda.time.LocalDate; org.joda.time.Days; org.joda.time.DateTime; org.joda.time.DateTimeZone; org.codehaus.groovy.grails.web.json.JSONObject; com.ratchethealth.client.StatusCodeConstants " %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <div class="box-item-header">
        <g:if test="${task?.completeTime}">
            <span class="complete-time pull-right">Complete Time:
                <g:formatDate date="${task?.completeTime}"
                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                              format="MMM dd, yyyy h:mm aaa"></g:formatDate></span>
        </g:if>
    </div>

    <div class="box-item-content">

        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">
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
                            <label class="uppercase">${secondSplit[0]}:</label>
                            <label>${secondSplit[1]}</label>
                        </span>
                    </g:each>
                </g:if>
                <g:else>
                    <span class="score">
                        <label>Total:</label>
                        <label>${task?.score}</label></span>
                </g:else>
            </div>
        </g:if>

        <div class="item-fist middle-font">
            <label>ID:</label>
            <span class="number-font">${task?.id}</span>
        </div>

        <div class="item-title">
            ${task?.title}
        </div>

        <div class="item-datetime relative-sent-time">

            <% DateTimeZone Vancouver = DateTimeZone.forID("America/Vancouver") %>
            <% LocalDate start = new LocalDate(task?.sendTime, Vancouver) %>
            <% LocalDate end = new LocalDate(task?.surgeryTime, Vancouver) %>
            <% def sentTimeDays = Days.daysBetween(start, end).getDays().abs() %>
            <g:if test="${task?.isBaseline}">
                <label class="numeral">BASELINE</label>
            </g:if>
            <g:elseif test="${sentTimeDays == 0}">
                <label class="numeral">On Surgery Day</label>
            </g:elseif>
            <g:else>
                <span class="numeral label-space number-font">${sentTimeDays}</span>
                <g:if test="${sentTimeDays == 1}">
                    <label class="label-space">Day</label>
                </g:if>
                <g:else>
                    <label class="label-space">Days</label>
                </g:else>
                <g:if test="${(task?.sendTime - task?.surgeryTime) > 0}">
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


        <g:if test="${task?.isSent}">
            <div class="item-datetime complete-sent-time">
                <div class="small-font ">
                    <label>Sent Time:</label>
                    <g:formatDate date="${task?.sendTime}"
                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                  format="MMM dd, yyyy h:mm aaa"></g:formatDate>
                </div>
            </div>
        </g:if>
        <g:else>
            <div class="item-datetime send-time">
                <div class="small-font">
                    <label>Send Time:</label>
                    <g:formatDate date="${task?.sendTime}"
                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                  format="MMM dd, yyyy h:mm aaa"></g:formatDate>
                </div>
            </div>
        </g:else>


        <g:if test="${task?.isSent}">
            <g:if test="${(StatusCodeConstants.TASK_STATUS[task?.status] != "complete") && !archivedStatus}">
                <div class="item-notify">
                    <button class="btn task-email" data-task-id="${task?.id}">Click to notify</button>
                </div>
            </g:if>
        </g:if>

    </div>

</div>
