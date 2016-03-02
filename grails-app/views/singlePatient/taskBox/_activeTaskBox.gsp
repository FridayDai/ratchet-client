<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <g:render template="/singlePatient/taskBox/shared/boxHeader" model="[taskTime: task?.sendTime]"/>

    <div class="box-item-content">
        <div class="sub-item">
            To be completed
        </div>
    </div>

    <div class="box-item-footer">

        <a href="${task?.patientPortalLink}/${accountId}/tasks/${task?.title}/${task?.invitationCode}"
           class="operation begin-task" target="_blank"></a>

        <div class="tip begin-tip">
            <span>Fill</span>
        </div>

        <span class="operation delete"></span>

        <div class="tip delete-tip">
            <span>Delete</span>
        </div>

    </div>

</div>
