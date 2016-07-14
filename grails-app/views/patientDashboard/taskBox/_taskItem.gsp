<%@ page import="org.joda.time.DateTime; org.joda.time.DateTimeZone; grails.converters.JSON; com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.StatusCodeConstants" %>
<div id="${task?.id}" class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]} ${archived}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-alert="${task?.alerts ? task?.alerts?.first()?.id : null}"
     data-is-absolute="${itemType == 'absoluteEvent'}"
     medical-record-id="${medicalRecordId}">

    <g:if test="${itemType == 'absoluteEvent'}">
        <span class="item-absolute-date hidden item-absolute-short-event">
            <span class="short-event-title-wrap short-title-wrap-before short-title-wrap-after">
                <span class="short-event-title">
                    ${task?.title.take(3)}
                </span>
            </span>
        </span>
    </g:if>
    <g:elseif test="${task?.treatmentProperty?.absoluteEventTimestamp}">
        <% DateTimeZone vancouver = DateTimeZone.forID('America/Vancouver')%>
        <% DateTime startOfDay = new DateTime(task?.treatmentProperty?.absoluteEventTimestamp, vancouver).withTimeAtStartOfDay() %>
        <g:dateUnit millisecond="${task?.sendTime - startOfDay.getMillis()}" var="date">
            <span class="item-absolute-date hidden">
                <span class="item-absolute-date-wrap">
                    <div>${date?.digit}</div>
                    <div>${date?.unit}</div>
                </span>
            </span>
        </g:dateUnit>
    </g:elseif>

    <div class="box-item-container">

        <g:render template="/patientDashboard/taskBox/shared/boxLeft"/>

        <div class="box-item-content">

            <span class="inline-info">
                <div class="item-title">
                    ${task?.title}
                    <g:if test="${itemType == 'absoluteEvent'}">
                        <span class="lowercase">
                            at <g:formatDate date="${task?.sendTime}"
                                             timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                             format="HH:mma"/>
                        </span>
                    </g:if>
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

                    <g:elseif test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "USER"}">
                        <g:render template="/patientDashboard/taskBox/shared/userScore" model="['task': task]"/>
                    </g:elseif>

                    <g:elseif
                            test="${RatchetConstants.BASE_TOOL_TYPE[task.toolType] == "RAPT" && RatchetConstants.TOOL_TYPE[task?.testId] == RatchetConstants.TOOL_NAME_FOLLOW_UP}">
                        <g:set var="mixedResult" value="${task?.mixedResult ? JSON.parse(task?.mixedResult) : [:]}"/>
                        <g:if test="${mixedResult?.assistance == 'true'}">
                            <span class="sub-item-line">
                                <span>Post-op assistance requested on</span>

                                <span class="bold">
                                    <g:formatDate date="${task?.completeTime}"
                                                  timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                                  format="MMM dd, yyyy"/>
                                </span>
                            </span>
                        </g:if>
                        <g:else>
                            <span class="sub-item-line">
                                <span>No immediate assistance required</span>
                            </span>
                        </g:else>
                    </g:elseif>

                    <g:else>
                        <g:if test="${RatchetConstants.TOOL_TYPE_MiXED_RESULT.contains(task?.testId)}">
                            <g:render template="/patientDashboard/taskBox/shared/mixedScore" model="['task': task]"/>
                        </g:if>

                        <g:elseif
                                test="${!RatchetConstants.TOOL_TYPE_NO_SCORE.contains(task?.testId) && (task.score || task.otherScore)}">

                            <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(task?.testId)}">
                                <g:if test="${task?.testId == 20}">
                                    <g:RAPTScore score="${task?.otherScore}">
                                        <span class="sub-item multiple-item">
                                            <span class="score-label">Score:</span>

                                            <span class="score-number">${score["Score"]}</span><span class="score-rank">${score["Risk"]}</span>
                                        </span>
                                        <span class="sub-item multiple-item">
                                            <span class="score-label">Care Partner:</span>

                                            <span class="score-number">${score["Care Partner"]}</span>
                                        </span>
                                        <span class="sub-item multiple-item">
                                            <span class="score-label">Prefer SNF:</span>

                                            <span class="score-number">${score["Prefer SNF"]}</span>
                                        </span>
                                    </g:RAPTScore>
                                </g:if>
                                <g:else>
                                    <g:multipleScore in="${task?.otherScore}" type="${task?.testId}" var="score">
                                        <span class="sub-item multiple-item">
                                            <span class="score-label">${score[0]}:</span>

                                            <span class="score-number">${score[1]}</span>
                                        </span>
                                    </g:multipleScore>
                                </g:else>
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
                           class="view-results">Results</a>
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
                        <g:elseif test="${RatchetConstants.BASE_TOOL_TYPE[task?.toolType] == "USER"}">
                            <div class="text-link start-task">START</div>
                        </g:elseif>
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

    <g:if test="${task?.alerts?.length()}">

        <div class="alert-bar box-item-attention" data-alert-id="${task?.alerts?.first()?.id}">
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>

            <g:if test="${task?.alerts?.first()?.type == 'RISK_ASSESSMENT_AND_PREDICTION_TOOL'}">
                Patient is indicated high risk by the risk assessment tool.
            </g:if>
            <g:elseif test="${task?.alerts?.first()?.type == 'DISCHARGE_PLAN'}">
                Confirm the discharge plan.
            </g:elseif>
            <g:elseif test="${task?.alerts?.first()?.type == 'SNF'}">
                SNF stay needs follow up.
            </g:elseif>
            <g:elseif test="${task?.alerts?.first()?.type == 'PATIENT_FOLLOW_UP_TOOL'}">
                Patient requires post-op assistance.
            </g:elseif>
            <g:else>
                Follow up requested by the patient. Contact patient to follow up.
            </g:else>
            -
            <span class="alert-datetime">
                <g:formatDate date="${task?.alerts?.first()?.dateCreated}"
                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                              format="MMM dd 'at' hh:mm a"/>
            </span>

            <span class="alert-link resolve-link">Click to resolve</span>

            <span class="alert-link undo-link">
                <g:render template="taskBox/shared/countdown"/>
                <span class="undo-text">Undo</span>
            </span>
        </div>
    </g:if>

</div>
