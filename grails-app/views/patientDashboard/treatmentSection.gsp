<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div class="treatment-tabs-container">

    <div class="treatment-manage-container">
        <button id="addTab" class="btn btn-add btn-add-treatment">
            <span> Treatment</span>
        </button>
    </div>

    <ul class="tab-list">
        <g:each in="${medicalRecords.items}" var="medicalRecord" status="i">
            <li class="treatment-li <g:if test="${medicalRecord?.archived}">archived-treatment</g:if>"
            >
                <g:hiddenField name="task-info-hidden" class="task-info-hidden" data-client-id="${clientId}"
                               data-patient-id="${patientId}" data-medical-record-id="${medicalRecord?.id}"
                               data-treatment-id="${medicalRecord?.treatmentId}"/>

                <label class="treatment-indicate" data-id="tr${medicalRecord?.id}">&#${i+65};</label>
                <g:link controller="treatment" action="getTreatmentTab" data-id="sub${i}"
                        params="[
                                patientId         : patientId,
                                clientId          : clientId,
                                medicalRecordId   : medicalRecord?.id,
                                treatmentId       : medicalRecord?.treatmentId,
                                surgeryTime       : medicalRecord?.surgeryTime,
                                archived          : medicalRecord?.archived,
                                PatientEmailStatus: patientInfo?.status,
                                _                 : System.currentTimeMillis()
                        ]">
                    <g:if test="${medicalRecord?.archived}">
                        <i class="icon-archived"></i>
                    </g:if>
                    <span>${medicalRecord.title} ${medicalRecord.tmpTitle}</span>
                </g:link>

                <ul class="sub-treatment-tool">
                    <li>
                        <i class="fa fa-plus" aria-hidden="true"></i>

                        <span id="addTasks"
                            <g:if test="${medicalRecord?.archived == 'true'}">
                                class="disabled" disabled="disabled"
                            </g:if>
                            <g:else>
                            </g:else>>
                            <span class="text-span">Task</span>
                        </span>
                    </li>
                    <li>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                        <span>Edit</span>

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
                    </li>
                    <li>
                        <i class="fa fa-archive" aria-hidden="true"></i>
                        <span>Archive</span>
                    </li>
                    <li>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        <span>Delete</span>
                    </li>
                </ul>
            </li>
        </g:each>
    </ul>

    <div class="no-treatment-container <g:if test="${medicalRecords.totalCount != 0}">hide</g:if>">
        <div class="icon"></div>

        <div class="title">This patient has no treatment</div>

        <div class="description">Assign this patient a treatment using the<br/>button below</div>
        <button class="btn add-treatment btn-add-treatment">Treatment</button>
    </div>
</div>
