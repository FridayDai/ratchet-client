<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div class="treatment-tabs-container clear">

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
                               data-surgery-date="${medicalRecord?.surgeryTime}"/>

                <label class="treatment-indicate">${medicalRecord?.indicator}</label>

                <a class="ui-tabs-anchor" data-id="sub${i}">
                    <g:if test="${medicalRecord?.archived}">
                        <i class="icon-archived"></i>
                    </g:if>
                    <span>${medicalRecord.title} ${medicalRecord.tmpTitle}</span>
                </a>

                <ul class="sub-treatment-tool">
                    <li class="addTasks">
                        <i class="fa fa-plus" aria-hidden="true"></i>

                        <span class="text-span">Task</span>
                    </li>
                    <li class="surgeryTime-edit ${medicalRecord?.surgeryTime ? '' : 'disabled'}">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                        <span>Edit</span>
                    </li>
                    <li class="archived-active">
                        <i class="fa fa-archive" aria-hidden="true"></i>
                        <span>Archive</span>
                    </li>
                    <li class="treatment-delete">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        <span>Delete</span>
                    </li>
                </ul>
            </li>
        </g:each>
    </ul>

    <div class="treatment-panel-container">
        <g:if test="${archived == 'true'}">
            <g:set var="archivedStatus" value="archived"/>
        </g:if>

        <div class="content ${archivedStatus}">

            <div class="tasks-list">
                <g:each in="${combinedTasks}" var="task">
                    <g:if test="${task.itemType == 'today'}">
                        <div>Today:
                        <g:formatDate date="${task?.sendTime}" timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                      format="MMM dd, yyyy"/>
                        </div>
                    </g:if>
                    <g:else>
                        <g:render template="/patientDashboard/taskBox/taskItem" model="[
                                'task'           : task,
                                'patientId'      : patientId,
//                                'clientId'       : clientId,
//                                'accountId'      : accountId,
                                'medicalRecordId': task.treatmentProperty?.id
                        ]"/>
                    </g:else>
                </g:each>
            </div>
        </div>

    </div>

    <div class="no-treatment-container <g:if test="${medicalRecords.totalCount != 0}">hide</g:if>">
        <div class="icon"></div>

        <div class="title">This patient has no treatment</div>

        <div class="description">Assign this patient a treatment using the<br/>button below</div>
        <button class="btn add-treatment btn-add-treatment">Treatment</button>
    </div>
</div>
