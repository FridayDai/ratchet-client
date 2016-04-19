<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:if test="${archived == 'true'}">
    <g:set var="archivedStatus" value="archived"/>
</g:if>

<div class="content ${archivedStatus}">
    <g:hiddenField name="task-info-hidden" class="task-info-hidden" data-client-id="${clientId}"
                   data-patient-id="${patientId}"
                   data-medical-record-id="${medicalRecordId}"/>

    <div class="items-title">
        <h4 class="active-items">ACTIVE ITEMS</h4>
    </div>

    <div class="tasks-list list-bottom">
        <div class="task-row ${archivedStatus}" id="task-row-active">
            <g:if test="${activeTasks == [] || activeTasks == null}">
                <div class="no-item center no-item-sent no-active-item" id="no-active-item"><p>There are no active items</p></div>
            </g:if>
            <g:else>
                <g:if test="${taskType.activeType?.size() > 1}">
                    <div class="quick-filter">
                        <span class="quick-filter-label">Filter:</span>
                        <g:each in="${taskType.activeType}" var="type">
                            <span class="btn btn-filter quick-filter-button" data-type="${type}">
                                ${type}
                            </span>
                        </g:each>
                    </div>
                </g:if>

                <g:each in="${activeTasks}" var="task">
                    <g:render template="/singlePatient/taskBox/activeTaskBox" model="[
                            'task'     : task,
                            'accountId': accountId
                    ]" />
                </g:each>
            </g:else>
        </div>
    </div>

    <div class="items-title">
        <h4 class="closed-items">CLOSED ITEMS</h4>
    </div>

    <div class="tasks-list list-bottom">
        <div class="task-row ${archivedStatus}" id="task-row-closed">
            <g:if test="${closedTasks == [] || closedTasks == null}">
                <div class="no-item center no-item-sent"><p>There are no closed items</p></div>
            </g:if>
            <g:else>
                <g:if test="${taskType.closedType?.size() > 1}">
                    <div class="quick-filter">
                        <span class="quick-filter-label">Filter:</span>
                        <g:each in="${taskType.closedType}" var="type">
                            <span class="btn btn-filter quick-filter-button"  data-type="${type}">
                                ${type}
                            </span>
                        </g:each>
                    </div>
                </g:if>

                <g:each in="${closedTasks}" var="task">
                    <g:render template="/singlePatient/taskBox/closedTaskBox" model="[
                            'task': task,
                            'patientId': patientId,
                            'clientId': clientId,
                            'accountId': accountId,
                            'medicalRecordId': medicalRecordId,
                            'taskId': task.id
                    ]" />
                </g:each>
            </g:else>
        </div>
    </div>

    <div class="items-title">
        <h4 class="scheduled_items">SCHEDULED ITEMS</h4>
    </div>

    <div class="tasks-list">
        <div class="task-row ${archivedStatus}" id="task-row-schedule">
            <g:if test="${scheduleTasks == [] || scheduleTasks == null}">
                <div class="no-item center no-item-schedule"><p>No item has been scheduled yet.</p></div>
            </g:if>
            <g:else>
                <g:if test="${taskType.scheduleType?.size() > 1}">
                    <div class="quick-filter">
                        <span class="quick-filter-label">Filter:</span>
                        <g:each in="${taskType.scheduleType}" var="type">
                            <span class="btn btn-filter quick-filter-button"  data-type="${type}">
                                ${type}
                            </span>
                        </g:each>
                    </div>
                </g:if>

                <g:each in="${scheduleTasks}" var="task">
                    <g:render template="/singlePatient/taskBox/schduleTaskBox" model="['task': task]" />
                </g:each>
            </g:else>
        </div>
    </div>
</div>




