<div>
    <g:hiddenField name="task-info-hidden" id="task-info-hidden" data-client-id="${clientId}"
                   data-patient-id="${patientId}"
                   data-medical-record-id="${medicalRecordId}"></g:hiddenField>

    <div class="items-title">
        <h4>SENT ITEMS</h4>
    </div>

    <div class="tasks-list list-bottom">
        <div class="task-row" id="task-row-sent">
            <g:each in="${sentTasks}" var="task">
                <g:render template="taskBox" model="['task': task]"></g:render>
            </g:each>
        </div>
    </div>

    <div class="items-title">
        <h4>SCHEDULE ITEMS</h4>
    </div>

    <div class="tasks-list">
        <div class="task-row" id="task-row-schedule">
            <g:each in="${scheduleTasks}" var="task">
                <g:render template="taskBox" model="['task': task]"></g:render>
            </g:each>

        </div>
    </div>
</div>




