<%@ page import="org.codehaus.groovy.grails.web.json.JSONObject; groovy.json.JsonSlurper; com.xplusz.ratchet.StatusCodeConstants " %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <div class="box-item-header">
        <g:if test="${task?.completeTime}">
            <span class="complete-time pull-right">Complete Time:
                <g:formatDate date="${task?.completeTime}"
                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                              format="MMM dd, yyyy hh:mm aaa"></g:formatDate></span>
        </g:if>
    </div>

    <div class="box-item-content">

        <div class="complete-score">

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
                            <label>${secondSplit[1]}</label>
                        </span>
                    </g:each>
                </g:if>
                <g:else>
                    <span class="score">
                        <label>Total:</label>
                        <label>${task?.score}</label></span>
                </g:else>
            </g:if>

        </div>

        <div class="item-fist middle-font">
            <label>ID:</label>
            <span class="number-font">${task?.id}</span>
        </div>

        <div class="item-title">
            ${task?.title}
        </div>

        <div class="item-datetime relative-sent-time">

            <g:set var="sentTimeDays"
                   value="${(int) ((task?.sendTime - task?.surgeryTime) / (1000 * 60 * 60 * 24)).abs()}"></g:set>
            <g:if test="${sentTimeDays == 0}">
                <label class="numeral">On Surgery Day</label>
            </g:if>
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
            <div class="item-datetime">
                <div class="small-font ">
                    <label>Sent Time:</label>
                    <g:formatDate date="${task?.sendTime}"
                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                  format="MMM dd, yyyy hh:mm aaa"></g:formatDate>
                </div>
            </div>
        </g:if>
        <g:else>
            <div class="item-datetime send-time">
                <div class="small-font">
                    <label>Send Time:</label>
                    <g:formatDate date="${task?.sendTime}"
                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                  format="MMM dd, yyyy hh:mm aaa"></g:formatDate>
                </div>
            </div>
        </g:else>

        <div class="item-notify">
            <g:if test="${task?.isSent}">
                <g:if test="${(StatusCodeConstants.TASK_STATUS[task?.status] == "complete") || archivedStatus}">
                    <button class="btn task-email disabled" data-task-id="${task?.id}" disabled>Click to notify</button>
                </g:if>
                <g:else>
                    <button class="btn task-email" data-task-id="${task?.id}">Click to notify</button>
                </g:else>
            </g:if>
        </div>
    </div>

</div>
