<%@ page import="com.xplusz.ratchet.StatusCodeConstants" %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}" data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <div class="item-header">
        <p>ID: ${task?.id}</p>
    </div>

    <div class="item-title">
        <h4>${task?.title}</h4>
    </div>

    <div class="show-status">
        <g:if test="${task?.isSent == "true"}">
            <div class="item-status ${StatusCodeConstants.TASK_STATUS[task?.status]}">
                <label class="uppercase status-background">${StatusCodeConstants.TASK_STATUS[task?.status]}</label>
            </div>
        </g:if>
    </div>

    <div class="item-datetime">
        <label>DUE: <g:formatDate date="${task?.dueTime}" format="MMM/dd/yyyy, HH:mm aaa"></g:formatDate></label>
    </div>

    <div class="item-context">
        <p>Please read the following information to have an understanding about Total Knee, what are you need? what are you need? what are you need? what are you need?</p>
    </div>

    <div class="item-datetime">
        <label class="small-font sent-time">Send Time: <g:formatDate date="${task?.sendTime}" format="MMM/dd/yyyy, HH:mm aaa"></g:formatDate></label>
    </div>

    <div class="item-notify">
        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">
            <button class="btn task-email disabled" data-task-id="${task?.id}" disabled>Click to notify</button>
        </g:if>
        <button class="btn task-email" data-task-id="${task?.id}">Click to notify</button>
    </div>

</div>
