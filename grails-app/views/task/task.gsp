<g:if test="${archived == 'true'}">
    <g:set var="archivedStatus" value="archived"></g:set>
</g:if>

<div class="content ${archivedStatus}">
    <g:hiddenField name="task-info-hidden" id="task-info-hidden" data-client-id="${clientId}"
                   data-patient-id="${patientId}"
                   data-medical-record-id="${medicalRecordId}"></g:hiddenField>


    <div class="items-title">
        <h4>SENT ITEMS</h4>
    </div>

    <div class="tasks-list list-bottom">
        <div class="task-row ${archivedStatus}" id="task-row-sent">
            <g:if test="${sentTasks == [] || sentTasks == null}">
                <div class="no-item center no-item-sent"><p>No item has been sent yet.</p></div>
            </g:if>
            <g:else>
                <g:each in="${sentTasks}" var="task">
                    <g:render template="taskBox" model="['task': task]"></g:render>
                </g:each>
            </g:else>
        </div>
    </div>

    <div class="items-title">
        <h4>SCHEDULED ITEMS</h4>
    </div>

    <div class="tasks-list">
        <div class="task-row ${archivedStatus}" id="task-row-schedule">
            <g:if test="${scheduleTasks == [] || scheduleTasks == null}">
                <div class="no-item center no-item-schedule"><p>No item has been scheduled yet.</p></div>
            </g:if>
            <g:else>
                <g:each in="${scheduleTasks}" var="task">
                    <g:render template="taskBox" model="['task': task]"></g:render>
                </g:each>
            </g:else>
        </div>
    </div>
</div>




