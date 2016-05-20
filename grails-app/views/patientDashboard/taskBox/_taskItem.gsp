<%@ page import="com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.StatusCodeConstants" %>
<div id="${task?.id}" class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}" medical-record-id = "${medicalRecordId}">

    <g:render template="/patientDashboard/taskBox/shared/boxLeft"/>

    <div class="box-item-content">

        <span class="inline-info">
            <div class="item-title">
                ${task?.title}
            </div>

            <div class="item-info">
                <span class="task-flag">
                    <div class="flag-status"></div>

                    <div class="meter">
                        <span></span>
                    </div>
                </span>

                <span class="info-collapse">
                    <div class="info-detail">
                        ID: <span class="id">${task?.id}</span>
                        <span>${task?.providerName}</span>
                    </div>
                </span>
            </div>
        </span>

        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">
            <div class="content-middle">
                <g:if test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "VOICE"}">
                    <g:if test="${task?.questions[0].choice.toInteger() == 1}">
                        <span class="sub-item">
                            <div>Follow up requested on</div>

                            <div class="bold">
                                <g:formatDate date="${task?.completeTime}"
                                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                              format="MMM dd, yyyy"/>
                            </div>
                        </span>
                    </g:if>
                    <g:else>
                        <div>Follow up not requested</div>
                    </g:else>

                </g:if>

                <g:elseif test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "BASIC"}">

                </g:elseif>

                <g:else>
                    <g:if test="${RatchetConstants.TOOL_TYPE_MiXED_RESULT.contains(task?.testId)}">
                        <g:render template="/patientDashboard/taskBox/shared/mixedScore" model="['task': task]"/>
                    </g:if>

                    <g:elseif test="${!RatchetConstants.TOOL_TYPE_NO_SCORE.contains(task?.testId) && (task.score || task.otherScore)}">

                        <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(task?.testId)}">
                            <g:multipleScore in="${task?.otherScore}" type="${task?.testId}" var="score">
                                <span class="sub-item multiple-item">
                                    <span class="score-label">${score[0]}</span>

                                    <span class="score-number">${score[1]}</span>
                                </span>
                            </g:multipleScore>
                        </g:if>
                        <g:else>
                            <span class="sub-item">
                                <span class="score-label">Total:</span>

                                <span class="score-number">${task?.score}</span>
                            </span>
                        </g:else>

                    </g:elseif>
                </g:else>

            </div>
        </g:if>

    </div>

    <div class="box-item-tool">
        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">

            <g:if test="${RatchetConstants.TOOL_TYPE_HAS_VIEW_RESULT.contains(task?.testId)}">
                <a href="/patients/${patientId}/treatments/${medicalRecordId}/task/${task?.id}/result" target="_blank"
                   class="icon-button view-results"><span>View Results</span></a>
            </g:if>

        </g:if>
        <g:else>

            <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] != "schedule"}">
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
            </g:if>

            <span class="icon-button delete"></span>

            <div class="icon-button-tip delete-tip">
                <span>Delete</span>
            </div>

        </g:else>

        <span>${task.treatmentProperty?.indicator}</span>
    </div>

</div>
