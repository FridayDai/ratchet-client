<div class="content">

    <div id="subTabs" class="patient-tab sub-tabs">
        <ul class="tab-list">
            <li data-type="Overview">
                <g:link controller="overview" action="index" params="[patientId: patientId, medicalRecordId: medicalRecordId]">Overview</g:link>
            </li>
            <li data-type="Activity">
                <g:link controller="activity" action="index" params="[patientId: patientId, medicalRecordId: medicalRecordId]">Activity</g:link>
            </li>
            <li data-type="Task">
                <g:link controller="task" action="index">Task</g:link>
            </li>
            <li data-type="Team">
                <g:link controller="team" action="showMedicalCares"
                        params="[medicalRecordId: medicalRecordId, clientId: clientId, patientId: patientId]">Team</g:link>
            </li>
        </ul>

    </div>
</div>

