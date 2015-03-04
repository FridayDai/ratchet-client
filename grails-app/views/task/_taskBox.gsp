<%@ page import="org.codehaus.groovy.grails.web.json.JSONObject; groovy.json.JsonSlurper; com.xplusz.ratchet.StatusCodeConstants " %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <div class="box-item-header">
        <g:if test="${task?.completeTime}">
            <span class="complete-time pull-right">Complete Time:
                <g:formatDate date="${task?.completeTime}"
                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                              format="MMM dd,yyyy HH:mm aaa"></g:formatDate></span>
        </g:if>
    %{--<span class="complete-time pull-right">Complete Time: Jan 10, 2015 8:00AM</span>--}%
    </div>

    <div class="box-item-content">

        <div class="item-fist middle-font">
            ID: ${task?.id}
        </div>

        <div class="item-title">
            ${task?.title}
        </div>

        %{--<div class="show-status">--}%
        %{--<g:if test="${task?.isSent == true}">--}%
        %{--<div class="item-status inline ${StatusCodeConstants.TASK_STATUS[task?.status]}">--}%
        %{--<label class="uppercase status-background">${StatusCodeConstants.TASK_STATUS[task?.status]}</label>--}%
        %{--</div>--}%
        %{--</g:if>--}%

        %{--<g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">--}%
        %{--<span>Score: ${task?.score}</span>--}%
        %{--</g:if>--}%
        %{--</div>--}%

        <div class="item-datetime due-time-score">

            <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">

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
                            <label class="numeral">${secondSplit[1]}</label>
                        </span>
                    </g:each>
                </g:if>
                <g:else>
                    <span class="score">
                        <label>SCORE:</label>
                        <label class="numeral">${task?.score}</label></span>
                </g:else>
            </g:if>
            <g:else>
                <h5 class="due-time middle-font">DUE:
                    <g:formatDate date="${task?.dueTime}"
                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                  format="MMM dd,yyyy HH:mm aaa"></g:formatDate></h5>
            </g:else>

        </div>

        <div class="item-context">
            <p>${task?.description}</p>
        </div>

        <div class="item-datetime">
            <label class="small-font sent-time">
                <g:if test="${task?.isSent}">
                    <label>Sent Time:</label>
                </g:if>
                <g:else>
                    <label>Send Time:</label>
                </g:else>
                <g:formatDate date="${task?.sendTime}"
                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                              format="MMM dd,yyyy HH:mm aaa"></g:formatDate>
            </label>
        </div>

        <div class="item-notify">
            <g:if test="${task?.isSent}">
                <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">
                    <button class="btn task-email disabled" data-task-id="${task?.id}" disabled>Click to notify</button>
                </g:if>
                <g:else>
                    <button class="btn task-email" data-task-id="${task?.id}">Click to notify</button>
                </g:else>
            </g:if>
        </div>
    </div>

</div>
