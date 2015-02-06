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
                <span>Surgery Time:</span>
                <label class="surgery-time-picker">
                    <g:formatDate date="${surgeryTime}" format="MMM d, yyyy h:mm:ss a"></g:formatDate>
                </label>
                <input type="hidden" class="datetime-picker" data-patient-id="${patientId}" data-client-id="${clientId}"
                       data-medical-record-id="${medicalRecordId}"/>
            </li>
        </ul>

    </div>
</div>

