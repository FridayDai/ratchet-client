<%@ page import="com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.StatusCodeConstants" %>
<div id="${task?.id}" class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-tool-type="${RatchetConstants.BASE_TOOL_TYPE[task?.toolType]}"
     data-task-filter-type="${task?.taskFilterType}">

    <g:render template="/patientDashboard/taskBox/shared/boxHeader" model="[taskTime: task?.sendTime]"/>

    <div class="box-item-content">
        <div class="sub-item">
            To be completed
        </div>
    </div>

    <div class="box-item-footer">

        <g:if test="${RatchetConstants.BASE_TOOL_TYPE[task?.toolType] == "VOICE"}">
            <span class="icon-button call-task"></span>

            <div class="icon-button-tip call-tip">
                <span>Call</span>
            </div>
        </g:if>
        <g:else>
            <a href="${task?.patientPortalLink}/${accountId}/tasks/${task?.title}/${task?.invitationCode}"
               class="icon-button begin-task" target="_blank"></a>

            <div class="icon-button-tip begin-tip">
                <span>Fill</span>
            </div>
        </g:else>

        <span class="icon-button delete"></span>

        <div class="icon-button-tip delete-tip">
            <span>Delete</span>
        </div>

    </div>

</div>
