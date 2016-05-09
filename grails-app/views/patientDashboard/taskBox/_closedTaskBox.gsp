<%@ page import="com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.StatusCodeConstants" %>
<div id="${task?.id}" class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-task-filter-type="${task?.taskFilterType}">

    <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete" && (System.currentTimeMillis() - task?.completeTime <= 259200000)}">
        <div class="new-flag-ribbon-wrapper">
            <div class="ribbon">NEW</div>
        </div>
    </g:if>

    <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete" && task?.isAttentionNeeded}">
        <div class="attention-menu">
            <div class="attention">
                <span class="attention-icon"></span>
                <ul>
                    <li>
                        <div class="attention-tip">
                            <div class="title">ATTENTION!</div>

                            <div class="sub-title">This item needs attention.</div>
                            <button class="btn resolve">Click to Resolve</button>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    </g:if>

    <g:render template="/patientDashboard/taskBox/shared/boxHeader" model="[taskTime: task?.sendTime]"/>

    <div class="box-item-content">

        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">

            <g:if test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "VOICE"}">
                <g:if test="${task?.questions[0].choice.toInteger() == 1}">
                    <span class="sub-item">
                        <div>Follow up requested on</div>
                        <div class="bold">
                            <g:formatDate date="${task?.completeTime}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                          format="MMM dd, yyyy"/>
                        </div>
                    </span>
                </g:if>
                <g:else>
                    <div>Follow up not requested</div>
                </g:else>

            </g:if>

            <g:elseif test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "BASIC"}">
                <div class="sub-item">
                    Completed
                </div>
            </g:elseif>

            <g:else>
                <g:if test="${RatchetConstants.TOOL_TYPE_MiXED_RESULT.contains(task?.testId)}">
                    <g:render template="/patientDashboard/taskBox/shared/mixedScore" model="['task': task]"/>
                </g:if>

                <g:else>
                    <g:if test="${!RatchetConstants.TOOL_TYPE_NO_SCORE.contains(task?.testId)}">

                        <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(task?.testId)}">
                            <g:multipleScore in="${task?.otherScore}" type="${task?.testId}" var="score">
                                <span class="sub-item multiple-item">
                                    <div class="score-number">${score[1]}</div>

                                    <div class="score-label">${score[0]}</div>
                                </span>
                            </g:multipleScore>
                        </g:if>
                        <g:else>
                            <span class="sub-item">
                                <div class="score-number">${task?.score}</div>

                                <div class="score-label">Total Result</div>
                            </span>
                        </g:else>

                    </g:if>

                    <g:else>
                        <div class="sub-item">
                            Completed
                        </div>
                    </g:else>
                </g:else>
            </g:else>

        </g:if>

        <g:else>
            <div class="sub-item">
                To be completed
            </div>
        </g:else>

    </div>


    <div class="box-item-footer">

        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">

            <g:if test="${RatchetConstants.TOOL_TYPE_HAS_VIEW_RESULT.contains(task?.testId)}">
                <a href="/patients/${patientId}/treatments/${medicalRecordId}/task/${taskId}/result" target="_blank"
                   class="icon-button view-results"><span>View Results</span></a>
            </g:if>
        </g:if>
        <g:else>

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

        </g:else>
    </div>

</div>