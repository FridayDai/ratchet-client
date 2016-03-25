<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<div id="${task?.id}" class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-task-type="${task?.testId}">

    <g:render template="/singlePatient/taskBox/shared/boxHeader" model="[taskTime: task?.sendTime]"/>

    <div class="box-item-content">
        <div class="sub-item">
            Scheduled
        </div>
    </div>

    <div class="box-item-footer">

        <span class="operation delete"></span>

        <div class="tip delete-tip">
            <span>Delete</span>
        </div>

    </div>

</div>
