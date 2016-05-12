<%@ page import="com.ratchethealth.client.StatusCodeConstants" %>

<div class="treatment-tabs-container">

    <ul class="tab-list">

        <div class="treatment-manage-container">
            <button id="addTab" class="btn btn-add btn-add-treatment">
                <span> Treatment</span>
            </button>
        </div>

        <g:each in="${medicalRecords.items}" var="medicalRecord" status="i">
            <li
                <g:if test="${medicalRecord?.archived}">
                    class="archived-treatment"
                </g:if>>
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
            </li>
        </g:each>
    </ul>

    <div class="no-treatment-container <g:if test="${medicalRecords.totalCount != 0}">hide</g:if>">
        <div class="icon"></div>

        <div class="title">This patient has no treatment</div>

        <div class="description">Assign this patient a treatment using the<br/>button below</div>
        <button class="btn add-treatment btn-add-treatment">Add Treatment</button>
    </div>
</div>
