<%@ page import="com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.StatusCodeConstants" %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <g:render template="/singlePatient/taskBox/shared/boxHeader" model="[taskTime: task?.sendTime]"/>

    <div class="box-item-content">
        <div class="sub-item">
            To be completed
        </div>
    </div>

    <div class="box-item-footer">

        <g:if test="${RatchetConstants.BASE_TOOL_TYPE[task?.toolType] == "VOICE"}">
            <span class="operation call-task"></span>

            <div class="tip call-tip">
                <span>Call</span>
            </div>
        </g:if>
        <g:else>
            <a href="${task?.patientPortalLink}/${accountId}/tasks/${task?.title}/${task?.invitationCode}"
               class="operation begin-task" target="_blank"></a>

            <div class="tip begin-tip">
                <span>Fill</span>
            </div>
        </g:else>

        <span class="operation delete"></span>

        <div class="tip delete-tip">
            <span>Delete</span>
        </div>

    </div>

</div>
