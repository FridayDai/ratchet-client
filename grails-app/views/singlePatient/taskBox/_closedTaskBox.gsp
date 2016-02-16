<%@ page import="com.ratchethealth.client.RatchetConstants; com.ratchethealth.client.StatusCodeConstants" %>
<div class="box-item ${StatusCodeConstants.TASK_STATUS[task?.status]}"
     data-status="${StatusCodeConstants.TASK_STATUS[task?.status]}">

    <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete" && (System.currentTimeMillis() - task?.completeTime <= 259200000)}">
        <div class="new-flag-ribbon-wrapper">
            <div class="ribbon">NEW</div>
        </div>
    </g:if>

    <g:render template="/singlePatient/taskBox/taskBoxContent"/>

    <div class="box-item-footer">

        <span class="task-date">
            <g:formatDate date="${task?.completeTime}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                          format="MMM dd, yyyy"/>
        </span>

        <g:if test="${StatusCodeConstants.TASK_STATUS[task?.status] == "complete"}">

            <g:if test="${RatchetConstants.TOOL_TYPE_HAS_VIEW_RESULT.contains(task?.testId)}">
                <a href="/patients/${patientId}/treatments/${medicalRecordId}/task/${taskId}/result" target="_blank"
                   class="view-results"><span>View Results</span></a>
            </g:if>

            <div class="footer-bottom">
                <g:if test="${!RatchetConstants.TOOL_TYPE_NO_SCORE.contains(task?.testId)}">

                    <div class="complete-score">
                        <g:if test="${RatchetConstants.TOOL_TYPE_MULTIPLE_SCORE.contains(task?.testId)}">
                            <g:multipleScore in="${task?.otherScore}" type="${task?.testId}" var="score" padding="auto">
                                <span class="score ${auto}">
                                    <div class="score-number">${score[1]}</div>
                                    <div class="score-label">${score[0]}</div>
                                </span>
                            </g:multipleScore>
                        </g:if>
                        <g:else>
                            <span class="score">
                                <label class="score-number">${task?.score}</label><br>
                                <label>Total Result</label>
                            </span>
                        </g:else>
                    </div>

                </g:if>
            </div>
        </g:if>
        <g:else>
            <div class="footer-bottom"></div>
        </g:else>
    </div>

</div>
