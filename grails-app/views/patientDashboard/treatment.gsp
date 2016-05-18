<%@ page import="com.ratchethealth.client.RatchetConstants" %>
<g:if test="${archived == 'true'}">
    <g:set var="archivedStatus" value="archived"/>
</g:if>

<div class="content ${archivedStatus}">
    %{--<div class="treatment-tool-bar">--}%
        <g:hiddenField name="task-info-hidden" class="task-info-hidden" data-client-id="${clientId}"
                       data-patient-id="${patientId}" data-medical-record-id="${medicalRecordId}"
                       data-treatment-id="${treatmentId}"/>
        %{--<div class="treatment-date">--}%
            %{--<g:if test="${surgeryTime}">--}%
                %{--<span>Treatment Date:</span>--}%
                %{--<label class="treatment-time-picker">--}%
                    %{--<g:formatDate date="${surgeryTime}"--}%
                                  %{--timeZone="${TimeZone.getTimeZone('America/Vancouver')}"--}%
                                  %{--format="MMM d, yyyy" />--}%
                %{--</label>--}%
            %{--</g:if>--}%
        %{--</div>--}%
        %{--<g:if test="${archived == 'true'}">--}%
            %{--<div class="archived-treatment-title">ARCHIVED TREATMENT</div>--}%
        %{--</g:if>--}%
        %{--<div class="pull-right right-part">--}%
            %{--<div id="addTasks"--}%
                %{--<g:if test="${archived == 'true'}">--}%
                    %{--class="btn btn-treatment-level btn-add-task disabled" disabled="disabled"--}%
                %{--</g:if>--}%
                %{--<g:else>--}%
                    %{--class="btn btn-treatment-level btn-add-task"--}%
                %{--</g:else>>--}%
                %{--<span class="text-span">Add Task</span>--}%
            %{--</div>--}%
            %{--<div class="more-button">--}%
                %{--<div class="drop-down-toggle">--}%
                    %{--<span class="more-btn">More</span>--}%
                %{--</div>--}%
                %{--<div class="drop-down-lists hidden">--}%
                    %{--<g:if test="${surgeryTime}">--}%
                        %{--<span <g:if test="${archived == 'true'}">--}%
                            %{--class="btn drop-down-list icon-edit surgeryTime-edit inline disabled" disabled="disabled"--}%
                        %{--</g:if>--}%
                            %{--<g:else>--}%
                                %{--class="btn drop-down-list icon-edit surgeryTime-edit inline "--}%
                            %{--</g:else>--}%
                                %{--data-patient-id="${patientId}"--}%
                                %{--data-client-id="${clientId}" data-treatment-id="${treatmentId}"--}%
                                %{--data-medical-record-id="${medicalRecordId}">--}%
                            %{--Edit--}%
                        %{--</span>--}%
                    %{--</g:if>--}%
                    %{--<span <g:if test="${archived == 'true'}">--}%
                        %{--class="btn drop-down-list archived-active inline disabled" disabled="disabled"--}%
                    %{--</g:if>--}%
                        %{--<g:else>--}%
                            %{--class="btn drop-down-list archived-active inline "--}%
                        %{--</g:else>--}%
                            %{--data-patient-id="${patientId}"--}%
                            %{--data-client-id="${clientId}"--}%
                            %{--data-medical-record-id="${medicalRecordId}">--}%
                        %{--Archive--}%
                    %{--</span>--}%
                    %{--<g:if test="${isAdmin.toString() == 'true'}">--}%
                        %{--<span class="btn drop-down-list treatment-delete inline"--}%
                              %{--data-patient-id="${patientId}"--}%
                              %{--data-client-id="${clientId}"--}%
                              %{--data-medical-record-id="${medicalRecordId}">--}%
                            %{--Delete--}%
                        %{--</span>--}%
                    %{--</g:if>--}%
                %{--</div>--}%
            %{--</div>--}%
        %{--</div>--}%
    %{--</div>--}%
    %{--<div class="items-title list-top">--}%
        %{--<h4 class="active-items">ACTIVE ITEMS</h4>--}%
    %{--</div>--}%

    <div class="tasks-list">
        <div class="task-row ${archivedStatus}" id="task-row-active">
            %{--<g:if test="${activeTasks == [] || activeTasks == null}">--}%
                %{--<div class="no-item center no-item-sent no-active-item" id="no-active-item"><p>There are no active items</p></div>--}%
            %{--</g:if>--}%
            %{--<g:else>--}%
                %{--<g:if test="${taskType.activeType?.size() > 1}">--}%
                    %{--<div class="quick-filter">--}%
                        %{--<span class="quick-filter-label">Filter:</span>--}%
                        %{--<g:each in="${taskType.activeType}" var="type">--}%
                            %{--<span class="btn btn-filter quick-filter-button" data-type="${type}">--}%
                                %{--${type}--}%
                            %{--</span>--}%
                        %{--</g:each>--}%
                    %{--</div>--}%
                %{--</g:if>--}%

                <g:each in="${activeTasks}" var="task">
                    <g:render template="/patientDashboard/taskBox/activeTaskBox" model="[
                            'task'     : task,
                            'accountId': accountId
                    ]" />
                </g:each>
            %{--</g:else>--}%
        </div>
    </div>

    %{--<div class="items-title list-top">--}%
        %{--<h4 class="closed-items">CLOSED ITEMS</h4>--}%
    %{--</div>--}%

    <div class="tasks-list">
        <div class="task-row ${archivedStatus}" id="task-row-closed">
            %{--<g:if test="${closedTasks == [] || closedTasks == null}">--}%
                %{--<div class="no-item center no-item-sent"><p>There are no closed items</p></div>--}%
            %{--</g:if>--}%
            %{--<g:else>--}%
                %{--<g:if test="${taskType.closedType?.size() > 1}">--}%
                    %{--<div class="quick-filter">--}%
                        %{--<span class="quick-filter-label">Filter:</span>--}%
                        %{--<g:each in="${taskType.closedType}" var="type">--}%
                            %{--<span class="btn btn-filter quick-filter-button"  data-type="${type}">--}%
                                %{--${type}--}%
                            %{--</span>--}%
                        %{--</g:each>--}%
                    %{--</div>--}%
                %{--</g:if>--}%

                <g:each in="${closedTasks}" var="task">
                    <g:render template="/patientDashboard/taskBox/taskItem" model="[
                            'task': task,
                            'patientId': patientId,
                            'clientId': clientId,
                            'accountId': accountId,
                            'medicalRecordId': medicalRecordId,
                            'taskId': task.id
                    ]" />
                </g:each>
            %{--</g:else>--}%
        </div>
    </div>

    %{--<div class="items-title list-top">--}%
        %{--<h4 class="scheduled_items">SCHEDULED ITEMS</h4>--}%
    %{--</div>--}%

    %{--<div class="tasks-list">--}%
        %{--<div class="task-row ${archivedStatus}" id="task-row-schedule">--}%
            %{--<g:if test="${scheduleTasks == [] || scheduleTasks == null}">--}%
                %{--<div class="no-item center no-item-schedule"><p>No item has been scheduled yet.</p></div>--}%
            %{--</g:if>--}%
            %{--<g:else>--}%
                %{--<g:if test="${taskType.scheduleType?.size() > 1}">--}%
                    %{--<div class="quick-filter">--}%
                        %{--<span class="quick-filter-label">Filter:</span>--}%
                        %{--<g:each in="${taskType.scheduleType}" var="type">--}%
                            %{--<span class="btn btn-filter quick-filter-button"  data-type="${type}">--}%
                                %{--${type}--}%
                            %{--</span>--}%
                        %{--</g:each>--}%
                    %{--</div>--}%
                %{--</g:if>--}%

                %{--<g:each in="${scheduleTasks}" var="task">--}%
                    %{--<g:render template="/patientDashboard/taskBox/schduleTaskBox" model="['task': task]" />--}%
                %{--</g:each>--}%
            %{--</g:else>--}%
        %{--</div>--}%
    %{--</div>--}%
</div>
