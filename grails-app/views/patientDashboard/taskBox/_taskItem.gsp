<%@ page import="com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.StatusCodeConstants" %>
<div id="${task?.id}" class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]} ${archived}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-alert="${task?.alerts ? task?.alerts?.first()?.id : null}"
     medical-record-id="${medicalRecordId}">

    <div class="box-item-container">

        <g:render template="/patientDashboard/taskBox/shared/boxLeft"/>

        <div class="box-item-content">

            <span class="inline-info">
                <div class="item-title">
                    ${task?.title}
                </div>

                <div class="item-info">
                    <g:if test="${itemType != 'absoluteEvent'}">
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
                    </g:if>

                </div>
            </span>

            <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">
                <div class="content-middle">
                    <g:if test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "VOICE"}">
                        <g:if test="${task?.questions[0].choice.toInteger() == 1}">
                            <span class="sub-item-line">
                                <span>Follow up requested on</span>

                                <span class="bold">
                                    <g:formatDate date="${task?.completeTime}"
                                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                                  format="MMM dd, yyyy"/>
                                </span>
                            </span>
                        </g:if>
                        <g:else>
                            <span class="sub-item-line">
                                <span>Follow up not requested</span>
                            </span>
                        </g:else>

                    </g:if>

                    <g:elseif test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "BASIC"}">

                    </g:elseif>

                    <g:else>
                        <g:if test="${RatchetConstants.TOOL_TYPE_MiXED_RESULT.contains(task?.testId)}">
                            <g:render template="/patientDashboard/taskBox/shared/mixedScore" model="['task': task]"/>
                        </g:if>

                        <g:elseif
                                test="${!RatchetConstants.TOOL_TYPE_NO_SCORE.contains(task?.testId) && (task.score || task.otherScore)}">

                            <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(task?.testId)}">
                                <g:multipleScore in="${task?.otherScore}" type="${task?.testId}" var="score">
                                    <span class="sub-item multiple-item">
                                        <span class="score-label">${score[0]}:</span>

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

            <g:if test="${itemType != 'absoluteEvent'}">
                <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">

                    <g:if test="${RatchetConstants.TOOL_TYPE_HAS_VIEW_RESULT.contains(task?.testId)}">
                        <a href="/patients/${patientId}/treatments/${medicalRecordId}/task/${task?.id}/result"
                           target="_blank"
                           class="icon-button view-results"><span>View Results</span></a>
                    </g:if>

                </g:if>
                <g:else>

                    <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] != "schedule"}">
                        <g:if test="${RatchetConstants.BASE_TOOL_TYPE[task?.toolType] == "VOICE"}">
                            <span class="icon-button call-task"
                                  data-patient-id="${patientId}"
                                  data-medical-record-id="${medicalRecordId}"></span>

                            <div class="icon-button-tip call-tip">
                                <span>Call</span>
                            </div>
                        </g:if>
                        <g:else>
                            <a href="${task?.patientPortalLink}/${accountId}/tasks/${task?.title}/${task?.invitationCode}"
                               class="icon-button begin-task" target="_blank"></a>

                            <div class="icon-button-tip begin-tip">
                                <span>Begin</span>
                            </div>
                        </g:else>
                    </g:if>

                    <span class="icon-button delete" data-patient-id="${patientId}"
                          data-medical-record-id="${medicalRecordId}"></span>

                    <div class="icon-button-tip delete-tip">
                        <span>Delete</span>
                    </div>

                </g:else>
            </g:if>

            <div class="task-treatment-indicate">
                <label class="indicator">
                    <span>${task.treatmentProperty?.indicator}</span>
                </label>
                <span>${task.treatmentProperty?.title} ${task.treatmentProperty?.tmpTitle}</span>
            </div>

        </div>

    </div>

    <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete" && task?.alerts?.length()}">

        <div class="box-item-attention">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            Follow up requested by the patient. Contact patient to follow up. -

            <span class="alert-datetime">
                <g:formatDate date="${task?.alerts ? task?.alerts?.first()?.dateCreated : null}"
                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                              format="MMM dd 'at' hh:mm a"/>
            </span>

            <span class="resolve-link">Click to resolve</span>

            <span class="undo-link">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px"
                     viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <path fill="#6D6E71"
                          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                          transform="rotate(279.77 25 25)">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25"
                                          to="360 25 25" dur="0.8s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>

                <span class="undo-text">Undo</span>
            </span>
        </div>
    </g:if>

</div>
