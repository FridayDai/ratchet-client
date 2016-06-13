<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div class="treatment-tabs-container clear">

    <div class="treatment-nav">
        <div class="treatment-manage-container">
            <button id="addTab" class="btn btn-add btn-add-treatment">
                <span>Treatment</span>
            </button>
        </div>

        <ul class="tab-list">
            <g:each in="${medicalRecords}" var="medicalRecord" status="i">
                <li class="treatment-li ui-state-default <g:if test="${medicalRecord?.archived}">archived-treatment</g:if>"
                    data-id="${medicalRecord?.id}">

                    <g:hiddenField name="task-info-hidden" class="task-info-hidden" data-client-id="${clientId}"
                                   data-patient-id="${patientId}" data-medical-record-id="${medicalRecord?.id}"
                                   data-treatment-id="${medicalRecord?.treatmentId}"
                                   data-surgery-date="${medicalRecord?.absoluteEventTimestamp}"/>

                    <a class="ui-tabs-anchor" data-id="sub${i}">
                        <label class="treatment-indicate">
                            <span>${medicalRecord?.indicator}</span>
                        </label>

                    ${medicalRecord.title} ${medicalRecord.tmpTitle}
                        <g:if test="${medicalRecord?.archived}">
                            <span class="archived-indicator">
                                <i class="fa fa-archive" aria-hidden="true"></i>
                            </span>
                        </g:if>
                    </a>

                    <ul class="sub-treatment-tool">
                        <li class="addTasks">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            <span class="text-span">Task</span>
                        </li>
                        <li class="event-time-edit ${medicalRecord?.absoluteEventTimestamp ? '' : 'not-available'}">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                            <span class="text-span">Edit</span>
                        </li>
                        <li class="archived-active">
                            <i class="fa fa-archive" aria-hidden="true"></i>
                            <span class="text-span">Archive</span>
                        </li>
                        <g:if test="${AccountIsAdmin.toString() == 'true'}">
                        <li class="treatment-delete">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                            <span class="text-span">Delete</span>
                        </li>
                        </g:if>
                    </ul>
                </li>
            </g:each>
        </ul>
    </div>


    <div class="treatment-panel-container">

        <g:if test="${totalCount == 0}">
            <div class="no-treatment-container">
                <div class="icon"></div>

                <div class="title">This patient has no tasks</div>

                <div class="description">Assign this patient a treatment using the<br/>button below</div>
                <button class="btn add-treatment btn-add-treatment">Treatment</button>
            </div>
        </g:if>

        <g:else>
            <div class="filter-area">

                <select id="task-status" class="quick-filter" multiple="multiple">
                    <option class="overdue" value="overdue">overdue</option>
                    <option class="pending" value="pending">pending</option>
                    <option class="expired" value="expired">expired</option>
                    <option class="schedule" value="schedule">schedule</option>
                    <option class="complete" value="complete">complete</option>
                </select>

                <button id="btn-filter-alert" class="btn btn-filter-alert">
                    <i class="fa fa-bell" aria-hidden="true"></i>

                    <span id="filter-alert-text">${alertNumber.toInteger() == 1 ? 'Alert' : 'Alerts'}</span>

                    <g:if test="${alertNumber}">
                        <span id="btn-alert-number" class="btn-alert-number">${alertNumber}</span>
                    </g:if>
                    <g:else>
                        <span id="btn-alert-number" class="btn-alert-number hide"></span>
                    </g:else>
                </button>

                <div id="filter-count" class="filter-count hide">
                    <span class="visible-count">
                        <label id="visible-number">0</label> of
                        <label id="total-number">0</label> tasks visible
                    </span>

                    <a href="#" id="clear-filter" class="clear-filter">clear filters</a>
                </div>

            </div>

            <div class="curtain-top"></div>

            <div id="tasks-list" class="tasks-list">
                <g:each in="${combinedTasks}" var="task">
                    <g:if test="${task.itemType == 'today'}">
                        <div class="today-item">
                            <span>
                                Today:
                                <g:formatDate date="${task?.sendTime}"
                                              timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                              format="MMM dd, yyyy"/>
                            </span>
                        </div>
                    </g:if>
                    <g:else>
                        <g:render template="/patientDashboard/taskBox/taskItem" model="[
                                'task'           : task,
                                'patientId'      : patientId,
                                'medicalRecordId': task.treatmentProperty?.id,
                                'archived'       : task.treatmentProperty?.archived ? 'archived' : null,
                                'itemType'       : task?.itemType,
                                'accountId'      : accountId,
                        ]"/>
                    </g:else>
                </g:each>
            </div>

            <div id="no-tasks" class="no-treatment-container no-tasks hide">
                <div class="icon"></div>

                <div class="title">0 tasks</div>
            </div>

        </g:else>
    </div>
</div>
