<g:if test="${archived == 'true'}">
    <g:set var="archivedStatus" value="archived"></g:set>
</g:if>

<div class="content ${archivedStatus}">
    <g:hiddenField name="task-info-hidden" class="task-info-hidden" data-client-id="${clientId}"
                   data-patient-id="${patientId}"
                   data-medical-record-id="${medicalRecordId}"></g:hiddenField>

    <div class="items-title">
        <h4 class="active-items">ACTIVE ITEMS</h4>
    </div>

    <div class="tasks-list list-bottom">
        <div class="task-row ${archivedStatus}" id="task-row-active">
            <g:if test="${activeTasks == [] || activeTasks == null}">
                <div class="no-item center no-item-sent no-active-item" id="no-active-item"><p>There are no active items</p></div>
            </g:if>
            <g:else>
                <g:each in="${activeTasks}" var="task">
                    <g:render template="/singlePatient/taskBox" model="[
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
                <g:each in="${closedTasks}" var="task">
                    <g:render template="/singlePatient/taskBox" model="[
                            'task': task,
                            'patientId': patientId,
                            'clientId': clientId,
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
                <g:each in="${scheduleTasks}" var="task">
                    <g:render template="/singlePatient/taskBox" model="['task': task]" />
                </g:each>
            </g:else>
        </div>
    </div>
</div>




