<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <g:render template="/singlePatient/taskBox/taskBoxContent"/>

    <div class="box-item-footer">

        <span class="task-date">
            <g:formatDate date="${task?.sendTime}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                          format="MMM dd, yyyy"/>
        </span>

        <a href="${task?.patientPortalLink}/${accountId}/tasks/${task?.title}/${task?.invitationCode}"
           class="begin-task" target="_blank"></a>

        <div class="begin-tip">
            <span>Begin</span>
        </div>

        <span class="delete"></span>

        <div class="delete-tip">
            <span>Delete</span>
        </div>

        <div class="footer-bottom"></div>

    </div>

</div>
