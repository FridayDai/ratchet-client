<div class="content">

    <div id="subTabs" class="sub-tabs">
        <ul class="tab-list">
            %{--<li data-type="Overview">--}%
            %{--<g:link controller="overview" action="index"--}%
            %{--params="[clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId]">Overview</g:link>--}%
            %{--</li>--}%
            <li data-type="Task">
                <g:link uri="/clients/${clientId}/patients/${patientId}/treatments/${treatmentId}/${medicalRecordId}/tasks">TASKS</g:link>
            </li>
            <li data-type="Activity">
                <g:link controller="activity" action="index"
                        params="[clientId: clientId, patientId: patientId, medicalRecordId: medicalRecordId]">ACTIVITIES</g:link>
            </li>
            <li data-type="Team">
                <g:link controller="team" action="showMedicalCares"
                        params="[medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId]">TEAM</g:link>
            </li>
            <li data-type="SurgeryTime" class="surgery-date">
                <g:if test="${surgeryTime}">
                    <span>Surgery Time:</span>
                    <label class="surgery-time-picker">
                        <g:formatDate date="${surgeryTime}"
                                      timeZone="${TimeZone.getTimeZone('America/Vancouver')}"
                                      format="MMM d, yyyy h:mm a"></g:formatDate>
                    </label>
                %{--<input type="hidden" class="datetime-picker" data-patient-id="${patientId}"--}%
                %{--data-client-id="${clientId}"--}%
                %{--data-medical-record-id="${medicalRecordId}"/>--}%
                    <a class="icon-edit surgeryTime-edit inline" data-patient-id="${patientId}"
                       data-client-id="${clientId}" data-treatment-id="${treatmentId}"
                       data-medical-record-id="${medicalRecordId}"></a>
                </g:if>
            </li>
        </ul>

    </div>

</div>

